import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useTryoutStore from "../../stores/tryoutStore";
import FormModalTryout from "../../components/admin/FormModalTryout";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Tryout, TryoutDto } from "../../types/tryout";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { MockTryout } from "../../mocks/Tryout";
import useProgramStore from "../../stores/programStore";

const TryoutsList = () => {
    const { tryouts, isLoading, getAllTryouts, createTryout, updateTryout, totalRows, deleteTryout, error, message } =
        useTryoutStore();
    const { getAllAvailablePrograms } = useProgramStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [selectedTryout, setSelectedTryout] = useState<Tryout>(MockTryout);
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
        useLoading: true,
        isLoading: isLoading,
    });

    const usr =
        sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") &&
        JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") ?? "");

    const columns: IDataTableProps<Tryout>["columns"] = [
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
                    {usr.role === "sysadmin" && (
                        <button
                            className="bg-red-500 hover:bg-red-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                            onClick={() => handleDeleteTryout(props.id, props.title)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllTryouts();
        getAllAvailablePrograms();
    }, [getAllTryouts, getAllAvailablePrograms]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useTryoutStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useTryoutStore.setState({ message: null });
    }, [message]);

    const handleClickCreateTryout = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedTryout(MockTryout);
    };

    const handleClickEdit = (tryout: Tryout) => {
        useProgramStore.setState({ selectedProgramId: tryout.programId });
        setSelectedTryout(tryout);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteTryout = (id: string, title: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete tryout ${title}?`,
            onConfirm: async () => {
                await deleteTryout(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: TryoutDto) => {
        if (mode === "update") {
            await updateTryout(selectedTryout.id, data);
        } else {
            await createTryout(data);
        }
        setIsOpenModal(false);
        setSelectedTryout(MockTryout);
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useTryoutStore.setState({ offset: (page - 1) * limit });
        getAllTryouts();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useTryoutStore.setState({ limit, offset: 0 });
        getAllTryouts();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useTryoutStore.setState({ search: e.target.value, offset: 0 });
        getAllTryouts();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Tryouts</h1>
                <div className="flex items-center justify-between mb-4">
                    {usr.role === "sysadmin" && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                            type="button"
                            onClick={handleClickCreateTryout}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Create Tryout
                        </button>
                    )}
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
                    data={tryouts}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                />
                <FormModalTryout
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Try Out" : "Create New Try Out"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedTryout}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default TryoutsList;
