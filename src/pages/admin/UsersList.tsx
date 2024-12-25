import { AdminSidebar } from "../../components/admin/AdminSidebar";
import DataTable, { IDataTableProps } from "react-data-table-component";
import { useEffect } from "react";
import useUserStore from "../../stores/userStore";

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
];

export const UsersList = () => {
    const { users, isLoading, getAllUsers } = useUserStore();

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">List Users</h1>
                <DataTable columns={columns} data={users} pagination highlightOnHover progressPending={isLoading} />
            </main>
        </div>
    );
};
