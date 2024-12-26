export type UserRole = "admin" | "student";

export interface User {
    id: string;
    username: string;
    phoneNumber: string;
    displayName: string;
    email: string;
    isActive: boolean;
    role: "admin" | "student";
    createdAt: string;
}

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    message: string | null;
    getAllUsers: () => Promise<void>;
    createUser: (data: {
        username: string;
        displayName: string;
        email: string;
        role: UserRole;
        phoneNumber: string;
    }) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    updateUser: (
        id: string,
        data: {
            username?: string;
            displayName?: string;
            email?: string;
            role?: UserRole;
            phoneNumber?: string;
        }
    ) => Promise<void>;
}

export interface FormModalUserProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: {
        username: string;
        displayName: string;
        email: string;
        phoneNumber: string;
        role: "admin" | "student";
        isActive: boolean;
    }) => Promise<void>;
    isLoading?: boolean;
    initialValues?: User;
}
