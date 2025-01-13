import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useSymbolStore from "../../stores/symbolStore";
import FormModalSymbol from "../../components/admin/FormModalSymbol";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Symbol, SymbolDto } from "../../types/symbol";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { MockSymbol } from "../../mocks/Symbol";

const SymbolsList = () => {
    const { symbols, isLoading, getAllSymbols, createSymbol, updateSymbol, totalRows, deleteSymbol, error, message } =
        useSymbolStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [selectedSymbol, setSelectedSymbol] = useState<Symbol>(MockSymbol);
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

    const usr =
        sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") &&
        JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") ?? "");

    const columns: IDataTableProps<Symbol>["columns"] = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Code",
            selector: (row) => row.code,
            sortable: true,
        },
        {
            name: "Characters",
            selector: (row) => row.characters,
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
                            onClick={() => handleDeleteSymbol(props.id, props.name)}
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
        getAllSymbols();
    }, [getAllSymbols]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useSymbolStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useSymbolStore.setState({ message: null });
    }, [message]);

    const handleClickCreateSymbol = () => {
        setIsOpenModal(true);
        setMode("create");
        setSelectedSymbol(MockSymbol);
    };

    const handleClickEdit = (symbol: Symbol) => {
        setSelectedSymbol(symbol);
        setIsOpenModal(true);
        setMode("update");
    };

    const handleDeleteSymbol = (id: string, name: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure to delete symbol ${name}?`,
            onConfirm: async () => {
                await deleteSymbol(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handleSubmit = async (data: SymbolDto) => {
        if (mode === "update") {
            await updateSymbol(selectedSymbol.id, data);
        } else {
            await createSymbol(data);
        }
        setIsOpenModal(false);
        setSelectedSymbol(MockSymbol);
        setMode("create");
    };

    const handlePageChange = (page: number) => {
        useSymbolStore.setState({ offset: (page - 1) * limit });
        getAllSymbols();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useSymbolStore.setState({ limit, offset: 0 });
        getAllSymbols();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useSymbolStore.setState({ search: e.target.value, offset: 0 });
        getAllSymbols();
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main
                className={`flex-1 p-8 transition-all duration-300 ${isMinimized ? "ml-2 md:ml-20" : "ml-2 md:ml-64"}`}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Symbols</h1>
                <div className="flex items-center justify-between mb-4">
                    {usr.role === "sysadmin" && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                            type="button"
                            onClick={handleClickCreateSymbol}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Create Symbol
                        </button>
                    )}
                    <div className="w-1/3">
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Symbol, Name, Code"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={symbols}
                    progressPending={isLoading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    responsive={true}
                />
                <FormModalSymbol
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={mode === "update" ? "Edit Symbol" : "Create New Symbol"}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    initialValues={selectedSymbol}
                />
                <ConfirmationBox {...confirmationBox} />
            </main>
        </div>
    );
};

export default SymbolsList;
