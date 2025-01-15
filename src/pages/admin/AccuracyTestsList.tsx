import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useAccuracyTestStore from "../../stores/accuracyTestStore";
import FormModalAccuracyTest from "../../components/admin/FormModalAccuracyTest";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { AccuracyTest, AccuracyTestDto } from "../../types/accuracyTest";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { MockAccuracyTest } from "../../mocks/AccuracyTest";
import useTryoutStore from "../../stores/tryoutStore";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import SelectTryout from "../../components/admin/SelectTryout";
import SelectTryoutSection from "../../components/admin/SelectTryoutSection";
import { customStylesTable } from "../style/customStylesTable";

const AccuracyTestsList = () => {
    const {
        accuracyTests,
        isLoading,
        getAllAccuracyTests,
        createAccuracyTest,
        updateAccuracyTest,
        totalRows,
        deleteAccuracyTest,
        error,
        message,
    } = useAccuracyTestStore();
    const { selectedTryoutId } = useTryoutStore();
    const { getAllAvailableTryoutSectionsByTryoutId, availableTryoutSections, selectedTryoutSectionId } =
        useTryoutSectionStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [selectedAccuracyTest, setSelectedAccuracyTest] = useState<AccuracyTest>(MockAccuracyTest);
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
        useLoading: true,
        isLoading: isLoading,
    });

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const columns: IDataTableProps<AccuracyTest>["columns"] = [
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
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Tryout",
            selector: (row) => row.tryoutSection.tryout.title,
            sortable: true,
        },
        {
            name: "Tryout Section",
            selector: (row) => row.tryoutSection.type,
            sortable: true,
        },
        {
            name: "Number of Sessions",
            selector: (row) => row.numberOfSessions,
            sortable: true,
        },
        {
            name: "Duration",
            selector: (row) => row.duration,
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
                        onClick={() => handleDeleteAccuracyTest(props.id, props.code)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllAccuracyTests();
    }, [getAllAccuracyTests, selectedTryoutId, selectedTryoutSectionId]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useAccuracyTestStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useAccuracyTestStore.setState({ message: null });
    }, [message]);

    useEffect(() => {
        if (selectedTryoutId !== "") {
            getAllAvailableTryoutSectionsByTryoutId(selectedTryoutId);
        } else {
            useTryoutSectionStore.setState({ availableTryoutSections: [] });
        }
    }, [getAllAvailableTryoutSectionsByTryoutId, selectedTryoutId]);

    const handleClickCreateAccuracyTest = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedAccuracyTest(MockAccuracyTest);
    };

    const handleClickEdit = (accuracyTest: AccuracyTest) => {
        setSelectedAccuracyTest(accuracyTest);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteAccuracyTest = (id: string, code: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete accuracy test ${code}?`,
            onConfirm: async () => {
                await deleteAccuracyTest(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: AccuracyTestDto) => {
        if (mode === "update") {
            await updateAccuracyTest(selectedAccuracyTest.id, data);
        } else {
            await createAccuracyTest(data);
        }
        setIsOpenModal(false);
        setSelectedAccuracyTest(MockAccuracyTest);
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useAccuracyTestStore.setState({ offset: (page - 1) * limit });
        getAllAccuracyTests();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useAccuracyTestStore.setState({ limit, offset: 0 });
        getAllAccuracyTests();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useAccuracyTestStore.setState({ search: e.target.value, offset: 0 });
        getAllAccuracyTests();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />
            <main
                className={`flex-1 p-8 transition-all duration-300 ${isMinimized ? "ml-2 md:ml-20" : "ml-2 md:ml-64"}`}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Accuracy Tests</h1>
                <SelectTryout />
                {availableTryoutSections.length > 0 && <SelectTryoutSection />}
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateAccuracyTest}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Accuracy Test
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
                    data={accuracyTests}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                    customStyles={customStylesTable}
                />
                <FormModalAccuracyTest
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Accuracy Test" : "Create New Accuracy Test"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedAccuracyTest}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default AccuracyTestsList;
