/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Cookies from "js-cookie";
import { login, get } from "../service/api/ApiConfig";

export type UserRole = "admin" | "student";
interface User {
    id: string;
    username: string;
    displayName: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
    return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        checkAuth: async () => {
            set({ isLoading: true, error: null });
            try {
                const response = await get("/api/auth/user-login", { withCredentials: true });
                if (response.message === "Success") {
                    set({ isAuthenticated: true });
                    set({ user: response.data });
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: any) {
                set({ isAuthenticated: false });
                set({ error: null});
            } finally {
                set({ isLoading: false });
            }
        },
        login: async (email, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await login("/api/auth/login", email, password);
                set({ user: response.data.user, isAuthenticated: true });
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Login failed" });
            } finally {
                set({ isLoading: false });
            }
        },
        logout: () => {
            set({ user: null, isAuthenticated: false });
            Cookies.remove(import.meta.env.VITE_APP_COOKIE_KEY);
        },
    };
});

export default useAuthStore;
