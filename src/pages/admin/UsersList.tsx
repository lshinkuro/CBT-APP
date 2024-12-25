/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import DataTable, { IDataTableProps } from "react-data-table-component";
import { useEffect, useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import useUserStore from "../../stores/userStore";
import FormModalUser from "../../components/admin/FormModalUser";
import toast from "react-hot-toast";

const columns: IDataTableProps<{ username: string; email: string; role: string }>["columns"] = [
    {
        name: "Name",
        selector: (row) => row.username,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
    },
    {
        name: "Action",
        cell: () => (
            <div className="flex items-center justify-center space-x-2">
                <button className="bg-blue-500 hover:bg-blue-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center">
                    <Pencil className="w-4 h-4" />
                </button>
                <button className="bg-red-500 hover:bg-red-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center">
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        ),
    },
];

export const UsersList = () => {
    const { users, isLoading, getAllUsers, createUser, error } = useUserStore();
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleClickRegister = () => {
        setIsOpenModal(true);
    };

    const handleSubmit = async (data: {
        username: string;
        displayName: string;
        email: string;
        phoneNumber: string;
        role: "admin" | "student";
    }) => {
        console.log(data);
        await createUser(data);
        setIsOpenModal(false);
    };

    return (
        <div className="flex flex-col w-full">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 rounded">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Users</h1>
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-sm text-white font-semibold rounded flex items-center"
                        type="button"
                        onClick={handleClickRegister}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Register New User
                    </button>
                    <div className="w-1/3">
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="search"
                            placeholder="Username, Display Name, Email, Phone Number"
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    highlightOnHover
                    progressPending={isLoading}
                    responsive
                />
            </main>
            <FormModalUser
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                title="Register New User"
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};
