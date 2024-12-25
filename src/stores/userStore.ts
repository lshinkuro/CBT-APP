/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get } from "../service/api/ApiConfig";
import { UserRole } from "./authStore";

interface User {
    id: string;
    username: string;
    displayName: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    getAllUsers: () => Promise<void>;
    createUser: (data: {
        username: string;
        displayName: string;
        email: string;
        role: UserRole;
        phoneNumber: string;
    }) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    getAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await get("/api/admin/users", { withCredentials: true });
            if (response.message === "Success") {
                set({ users: response.data.users });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch users" });
        } finally {
            set({ isLoading: false });
        }
    },
    createUser: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await post("/api/admin/users", data);
            console.log(response);
            if (response.message === "Success") {
                set((state) => ({ users: [...state.users, response.data.user] }));
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create user" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useUserStore;
