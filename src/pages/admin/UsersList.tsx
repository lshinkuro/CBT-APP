/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import DataTable, { IDataTableProps } from "react-data-table-component";
import { useEffect, useState } from "react";
import { Pencil, Trash, Plus, UserRound } from "lucide-react";
import useUserStore from "../../stores/userStore";
import FormModalUser from "../../components/admin/FormModalUser";
import toast from "react-hot-toast";
import ConfirmationBox, { ConfirmationBoxProps } from "../../components/layout/ConfirmationBox";
import { User, UserDto } from "../../types/user";
import { ModalProfile } from "../../components/admin/ModalProfile";

export const UsersList = () => {
    const {
        users,
        isLoading,
        getAllUsers,
        createUser,
        error,
        deleteUser,
        totalRows,
        updateUser,
        message,
        selectedUserProfile,
        getSelectedUserProfile,
    } = useUserStore();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
    const [limit, setLimit] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [confirmationBox, setConfirmationBox] = useState<ConfirmationBoxProps>({
        isOpen: false,
        message: "",
        onConfirm: async () => await Promise.resolve(),
        onClose: () => {},
    });
    const [mode, setMode] = useState<"create" | "update">("create");
    const [selectedUser, setSelectedUser] = useState<User>({
        id: "",
        username: "",
        phoneNumber: "",
        displayName: "",
        email: "",
        role: "student",
        createdAt: "",
        isActive: true,
    });

    const columns: IDataTableProps<{
        id: string;
        username: string;
        displayName: string;
        email: string;
        role: "admin" | "student";
        phoneNumber: string;
        createdAt: string;
        isActive: boolean;
    }>["columns"] = [
        {
            name: "Name",
            selector: (row) => row.username,
            sortable: true,
            grow: 0.2,
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
            grow: 0.2,
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
            grow: 1.5,
            sortFunction: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
            name: "Action",
            cell: (props) => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => {
                            getSelectedUserProfile(props.id);
                            setIsOpenModalProfile(true);
                        }}
                    >
                        <UserRound className="w-4 h-4" />
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleClickEdit(props)}
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 w-8 h-8 text-sm text-white font-semibold rounded-full flex items-center justify-center"
                        onClick={() => handleDeleteUser(props.id, props.username)}
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useUserStore.setState({ error: null });
    }, [error]);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useUserStore.setState({ message: null });
    }, [message]);

    const handleClickRegister = () => {
        setMode("create");
        setSelectedUser({
            id: "",
            username: "",
            displayName: "",
            email: "",
            phoneNumber: "",
            role: "student",
            createdAt: "",
            isActive: true,
        });
        setIsOpenModal(true);
    };

    const handleClickEdit = (user: User) => {
        setMode("update");
        setSelectedUser(user);
        setIsOpenModal(true);
    };

    const handleSubmit = async (data: UserDto) => {
        if (mode === "update") {
            await updateUser(selectedUser.id, data);
        } else {
            await createUser(data);
        }
        setIsOpenModal(false);
        setSelectedUser({
            id: "",
            username: "",
            displayName: "",
            email: "",
            phoneNumber: "",
            role: "student",
            createdAt: "",
            isActive: true,
        });
        setMode("create");
    };

    const handleDeleteUser = async (id: string, username: string) => {
        setConfirmationBox({
            isOpen: true,
            message: `Are you sure you want to delete ${username}?`,
            onConfirm: async () => {
                await deleteUser(id);
                setConfirmationBox({ ...confirmationBox, isOpen: false });
            },
            onClose: () => setConfirmationBox({ ...confirmationBox, isOpen: false }),
        });
    };

    const handlePageChange = (page: number) => {
        useUserStore.setState({ offset: (page - 1) * limit });
        getAllUsers();
    };

    const handleLimitChange = (limit: number) => {
        setLimit(limit);
        useUserStore.setState({ limit, offset: 0 });
        getAllUsers();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        useUserStore.setState({ search: e.target.value, offset: 0 });
        getAllUsers();
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    highlightOnHover
                    progressPending={isLoading}
                    responsive={true}
                />
            </main>
            <FormModalUser
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                title={mode === "update" ? "Edit User" : "Register New User"}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialValues={selectedUser}
            />
            <ModalProfile
                isOpen={isOpenModalProfile}
                onClose={() => setIsOpenModalProfile(false)}
                title={"User Profile"}
                onSubmit={() => {}}
                isLoading={isLoading}
                initialValues={selectedUserProfile}
            />
            <ConfirmationBox {...confirmationBox} />
        </div>
    );
};
