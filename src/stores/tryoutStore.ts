/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { TryoutDto, TryoutState } from "../types/tryout";

const useTryoutStore = create<TryoutState>((set) => ({
    availableTryouts: [],
    tryouts: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getAllAvailableTryouts: async () => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/admin/tryouts/available`);
            if (response.message === "Success") {
                set({
                    availableTryouts: response.data,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get available tryouts" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllTryouts: async () => {
        set({ isLoading: true });
        try {
            const { limit, offset, search } = useTryoutStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get(`/api/admin/tryouts`, params);
            if (response.message === "Success") {
                set({
                    tryouts: response.data.tryouts,
                    totalRows: response.totalRows,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get tryouts" });
        } finally {
            set({ isLoading: false });
        }
    },
    createTryout: async (data: TryoutDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/tryouts", data);
            if (response.message === "Success") {
                await useTryoutStore.getState().getAllTryouts();
                set({ message: "Tryout created successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateTryout: async (
        id: string,
        data: {
            title: string;
            type: string;
            description: string;
            startDate: string;
            endDate: string;
            isActive: boolean;
        }
    ) => {
        set({ isLoading: true });
        try {
            const response = await put(`/api/admin/tryouts/${id}`, data);
            if (response.message === "Success") {
                await useTryoutStore.getState().getAllTryouts();
                set({ message: "Tryout updated successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteTryout: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await del(`/api/admin/tryouts/${id}`);
            if (response.message === "Success") {
                set((state) => ({
                    tryouts: state.tryouts.filter((tryout) => tryout.id !== id),
                    message: "Tryout deleted successfully",
                }));
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to delete tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useTryoutStore;
