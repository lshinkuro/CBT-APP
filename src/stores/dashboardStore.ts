/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { get } from "../service/api/ApiConfig";

interface DashboardState {
    isLoading: boolean;
    error: string | null;
    message: string | null;
    stats: any;
    getDashboardStats: () => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set) => {
    return {
        isLoading: false,
        error: null,
        message: null,
        stats: {},
        getDashboardStats: async () => {
            set({ isLoading: true, error: null });
            try {
                const response = await get("/api/admin/dashboard/stats");
                set({ stats: response.data });
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Login failed" });
            } finally {
                set({ isLoading: false });
            }
        },
    };
});

export default useDashboardStore;
