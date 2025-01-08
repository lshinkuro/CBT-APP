/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { login, get, logout, post } from "../service/api/ApiConfig";

export type UserRole = "admin" | "student" | "sysadmin";
interface User {
    username: string;
    email: string;
    role: UserRole;
    createdAt: string;
}

interface AuthState {
    user: User | null;
    message: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (data: { email: string }) => Promise<void>;
    resetPassword: (data: { password: string; token: string }) => Promise<void>;
    isSuccessResetPassword: boolean;
}

const useAuthStore = create<AuthState>((set) => {
    return {
        user: sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr")
            ? JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") ?? "")
            : null,
        isAuthenticated: !!sessionStorage.getItem("isAuthenticated"),
        isLoading: false,
        error: null,
        message: null,
        isSuccessResetPassword: false,
        forgotPassword: async (data: { email: string }) => {
            set({ isLoading: true, error: null });
            try {
                const response = await post("/api/auth/forgot-password", data);
                set({ message: response.message });
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Forgot Password failed" });
            } finally {
                set({ isLoading: false });
            }
        },
        resetPassword: async (data: { password: string; token: string }) => {
            set({ isLoading: true, error: null });
            try {
                const response = await post("/api/auth/reset-password?token=" + data.token, {
                    password: data.password,
                });
                set({ message: response.message, isSuccessResetPassword: true });
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Reset Password failed" });
            } finally {
                set({ isLoading: false });
            }
        },
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
                set({ error: null });
            } finally {
                set({ isLoading: false });
            }
        },
        login: async (email, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await login("/api/auth/login", email, password);
                set({ user: response.data.user, isAuthenticated: true });
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr", JSON.stringify(response.data));
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Login failed" });
            } finally {
                set({ isLoading: false });
            }
        },
        logout: async () => {
            set({ user: null, isAuthenticated: false });
            sessionStorage.clear();
            try {
                await logout("/api/auth/logout");
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Login failed" });
            } finally {
                set({ isLoading: false });
            }
        },
    };
});

export default useAuthStore;
