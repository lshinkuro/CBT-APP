import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useProgramStore from "../../stores/programStore";
import FormModalProgram from "../../components/admin/FormModalProgram";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Program, ProgramDto } from "../../types/program";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { MockProgram } from "../../mocks/Program";

const ProgramsList = () => {
    const {
        programs,
        isLoading,
        getAllPrograms,
        createProgram,
        updateProgram,
        totalRows,
        deleteProgram,
        error,
        message,
    } = useProgramStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [selectedProgram, setSelectedProgram] = useState<Program>(MockProgram);
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
    });

    const columns: IDataTableProps<Program>["columns"] = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Code",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) =>
                new Date(row.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            sortable: true,
        },
        {
            name: "Active",
            cell: (props) =>
                props.isActive ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white rounded-full bg-green-500 items-center justify-center">
                        Active
                    </span>
                ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold leading-none text-white rounded-full bg-red-500 items-center justify-center">
                        Inactive
                    </span>
                ),
            sortable: true,
            grow: 0.2,
        },
        {
            name: "Actions",
            cell: (props) => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleClickEdit(props)}
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleDeleteProgram(props.id, props.title)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllPrograms();
    }, [getAllPrograms]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useProgramStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useProgramStore.setState({ message: null });
    }, [message]);

    const handleClickCreateProgram = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedProgram(MockProgram);
    };

    const handleClickEdit = (program: Program) => {
        setSelectedProgram(program);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteProgram = (id: string, title: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete program ${title}?`,
            onConfirm: async () => {
                await deleteProgram(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: ProgramDto) => {
        if (mode === "update") {
            await updateProgram(selectedProgram.id, data);
        } else {
            await createProgram(data);
        }
        setIsOpenModal(false);
        setSelectedProgram(MockProgram);
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useProgramStore.setState({ offset: (page - 1) * limit });
        getAllPrograms();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useProgramStore.setState({ limit, offset: 0 });
        getAllPrograms();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useProgramStore.setState({ search: e.target.value, offset: 0 });
        getAllPrograms();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Programs</h1>
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateProgram}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Program
                    </button>
                    <div className="w-1/3">
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Title, Description"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={programs}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                />
                <FormModalProgram
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Program" : "Create New Program"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedProgram}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default ProgramsList;
