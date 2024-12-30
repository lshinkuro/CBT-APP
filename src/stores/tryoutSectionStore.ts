/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { TryoutSectionDto, TryoutSectionState } from "../types/tryoutSection";

const useTryoutSectionStore = create<TryoutSectionState>((set) => ({
    selectedTryoutSectionId: "",
    availableTryoutSections: [],
    tryoutSections: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getAllAvailableTryoutSectionsByTryoutId: async (tryoutId: string | null) => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/tryout-sections/available/${tryoutId}`);
            if (response.message === "Success") {
                set({ availableTryoutSections: response.data });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get available tryout sections" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllTryoutSections: async () => {
        set({ isLoading: true });
        try {
            const { limit, offset, search } = useTryoutSectionStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get(`/api/admin/tryout-sections`, params);
            if (response.message === "Success") {
                set({
                    tryoutSections: response.data.tryoutSections,
                    totalRows: response.data.count,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get tryout sections" });
        } finally {
            set({ isLoading: false });
        }
    },
    createTryoutSection: async (data: TryoutSectionDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/tryout-sections", data);
            if (response.message === "Success") {
                await useTryoutSectionStore.getState().getAllTryoutSections();
                set({ message: "Tryout section created successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create tryout section" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateTryoutSection: async (
        id: string,
        data: TryoutSectionDto
    ) => {
        set({ isLoading: true });
        try {
            const response = await put(`/api/admin/tryout-sections/${id}`, data);
            if (response.message === "Success") {
                await useTryoutSectionStore.getState().getAllTryoutSections();
                set({ message: "Tryout section updated successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update tryout section" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteTryoutSection: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await del(`/api/admin/tryout-sections/${id}`);
            if (response.message === "Success") {
                set((state) => ({
                    tryoutSections: state.tryoutSections.filter((tryoutSection) => tryoutSection.id !== id),
                    message: "Tryout section deleted successfully",
                }));
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to delete tryout section" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useTryoutSectionStore;
