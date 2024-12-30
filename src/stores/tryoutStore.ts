/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { TryoutDto, TryoutState } from "../types/tryout";

const useTryoutStore = create<TryoutState>((set) => ({
    selectedTryoutId: "",
    availableTryouts: [],
    instruction: null,
    tryouts: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getInstructionByCode: async (code: string) => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/tryouts/instruction/${code}`);
            if (response.message === "Success") {
                set({
                    instruction: response.data,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get tryout instruction" });
            set({ instruction: null });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllAvailableTryoutsByProgramId: async (programId: string | null) => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/tryouts/available/${programId}`);
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
    getAllAvailableTryouts: async () => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/tryouts/all/available`);
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
                    totalRows: response.data.count,
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
    updateTryout: async (id: string, data: TryoutDto) => {
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
