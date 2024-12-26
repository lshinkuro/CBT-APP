import { useState, useEffect } from "react";
import DataTable, { IDataTableProps } from "react-data-table-component";
import useTryoutStore from "../../stores/tryoutStore";
import FormModalTryout from "../../components/admin/FormModalTryout";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { Pencil, Trash, Plus } from "lucide-react";
import { Tryout } from "../../types/tryout";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

const TryoutsList = () => {
    const { tryouts, isLoading, getAllTryouts, createTryout, updateTryout, deleteTryout, error, message } =
        useTryoutStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mode, setMode] = useState<"create" | "update">("create");
    const [selectedTryout, setSelectedTryout] = useState<Tryout>({
        id: "",
        title: "",
        type: "",
        description: "",
        startDate: "",
        endDate: "",
        isActive: false,
        createdAt: "",
    });
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
    });

    const columns: IDataTableProps<Tryout>["columns"] = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
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
                        onClick={() => handleDeleteTryout(props.id, props.title)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    useEffect(() => {
        getAllTryouts();
    }, [getAllTryouts]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
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
    };

    const handleClickEdit = (tryout: Tryout) => {
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

    const handleSubmit = async (data: {
        title: string;
        type: string;
        description: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }) => {
        if (mode === "update") {
            await updateTryout(selectedTryout.id, data);
        } else {
            await createTryout(data);
        }
        setIsOpenModal(false);
        setSelectedTryout({
            id: "",
            title: "",
            type: "",
            description: "",
            startDate: "",
            endDate: "",
            isActive: false,
            createdAt: "",
        });
        setMode("create");
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Tryouts</h1>
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickCreateTryout}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Tryout
                    </button>
                </div>
                <DataTable columns={columns} data={tryouts} progressPending={isLoading} />
                <FormModalTryout
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    title={selectedTryout ? "Edit User" : "Register New User"}
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
