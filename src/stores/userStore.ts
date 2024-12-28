/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { UserDto, UserState } from "../types/user";

const useUserStore = create<UserState>((set) => ({
    users: [],
    selectedUserProfile: null,
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getSelectedUserProfile: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await get(`/api/admin/users/profile/${userId}`);
            if (response.message === "Success") {
                set({ selectedUserProfile: response.data });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch user profile" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const { limit, offset, search } = useUserStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get("/api/admin/users", params);
            if (response.message === "Success") {
                set({ users: response.data.users, totalRows: response.data.count });
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
            if (response.message === "Success") {
                await useUserStore.getState().getAllUsers();
                set({ message: "User registered successfully, email verification was sent" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create user" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateUser: async (id: string, data: UserDto) => {
        set({ isLoading: true, error: null });
        try {
            const response = await put(`/api/admin/users/${id}`, data);
            if (response.message === "Success") {
                await useUserStore.getState().getAllUsers();
                set({ message: "User updated successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update user" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteUser: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await del(`/api/admin/users/${id}`);
            if (response.message === "Success") {
                set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
                set({ message: "User deleted successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to delete user" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useUserStore;
