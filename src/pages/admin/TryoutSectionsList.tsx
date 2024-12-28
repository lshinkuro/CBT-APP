import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import FormModalTryoutSection from "../../components/admin/FormModalTryoutSection";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { TryoutSection, TryoutSectionDto } from "../../types/tryoutSection";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import useTryoutStore from "../../stores/tryoutStore";

const TryoutSectionsList = () => {
    const {
        totalRows,
        tryoutSections,
        isLoading,
        getAllTryoutSections,
        createTryoutSection,
        updateTryoutSection,
        deleteTryoutSection,
        error,
        message,
    } = useTryoutSectionStore();
    const { getAllAvailableTryouts, availableTryouts } = useTryoutStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [limit, setLimit] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedTryoutSection, setSelectedTryoutSection] = useState<TryoutSection>({
        id: "",
        tryout: {
            id: "",
            title: "",
        },
        tryoutId: "",
        title: "",
        type: "",
        subType: null,
        duration: 0,
        order: 0,
        createdAt: "",
        isActive: true,
    });
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
    });

    const columns: IDataTableProps<TryoutSection>["columns"] = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            grow: 2,
        },
        {
            name: "Tryout",
            selector: (row) => row.tryout.title,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Sub Type",
            selector: (row) => row.subType ?? "-",
            sortable: true,
        },
        {
            name: "Duration (minutes)",
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Order",
            selector: (row) => row.order,
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
                        onClick={() => handleDeleteTryoutSection(props.id, props.title)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllTryoutSections();
        getAllAvailableTryouts();
    }, [getAllTryoutSections, getAllAvailableTryouts]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useTryoutSectionStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useTryoutSectionStore.setState({ message: null });
    }, [message]);

    const handleClickCreateTryoutSection = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedTryoutSection({
            id: "",
            tryoutId: availableTryouts[0]?.id ?? "",
            tryout: {
                id: "",
                title: "",
            },
            title: "",
            type: "",
            subType: null,
            duration: 0,
            order: 0,
            createdAt: "",
            isActive: true,
        });
    };

    const handleClickEdit = (tryoutSection: TryoutSection) => {
        setSelectedTryoutSection(tryoutSection);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteTryoutSection = (id: string, title: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete tryout section ${title}?`,
            onConfirm: async () => {
                await deleteTryoutSection(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: TryoutSectionDto) => {
        if (mode === "update") {
            await updateTryoutSection(selectedTryoutSection.id, data);
        } else {
            await createTryoutSection(data);
        }
        setIsOpenModal(false);
        setSelectedTryoutSection({
            id: "",
            tryoutId: "",
            tryout: {
                id: "",
                title: "",
            },
            title: "",
            type: "",
            subType: null,
            duration: 0,
            order: 0,
            createdAt: "",
            isActive: true,
        });
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useTryoutSectionStore.setState({ offset: (page - 1) * limit });
        getAllTryoutSections();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useTryoutSectionStore.setState({ limit, offset: 0 });
        getAllTryoutSections();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useTryoutSectionStore.setState({ search: e.target.value, offset: 0 });
        getAllTryoutSections();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Tryout Sections</h1>
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateTryoutSection}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Tryout Section
                    </button>
                    <div className="w-1/3">
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Title, Type, Sub Type"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={tryoutSections}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                />
                <FormModalTryoutSection
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Try Out Section" : "Create New Try Out Section"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedTryoutSection}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default TryoutSectionsList;
