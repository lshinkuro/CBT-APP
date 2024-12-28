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
    createUser: (data: UserDto) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    updateUser: (id: string, data: UserDto) => Promise<void>;
}

export interface FormModalUserProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: UserDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: User;
}

export type UserDto = Omit<User, "id" | "createdAt">;
