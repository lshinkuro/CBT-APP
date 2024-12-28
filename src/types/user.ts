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

export interface Profile {
    id: string;
    userId: string;
    bio: string;
    gender: string;
    profilePhoto: string;
    isActive: boolean;
    createdAt: string;
    user: User;
}

export interface UserState {
    users: User[];
    selectedUserProfile: Profile | null;
    isLoading: boolean;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    message: string | null;
    getSelectedUserProfile: (userId: string) => Promise<void>;
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

export interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    isLoading?: boolean;
    initialValues?: Profile | null;
}

export type UserDto = Omit<User, "id" | "createdAt">;
