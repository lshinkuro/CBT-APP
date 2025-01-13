/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { get, post, put, del } from "../service/api/ApiConfig";
import { AccuracyTest, AccuracyTestDto } from "../types/accuracyTest";
import useTryoutStore from "./tryoutStore";
import useTryoutSectionStore from "./tryoutSectionStore";

interface AccuracyTestState {
    accuracyTests: AccuracyTest[];
    message: string | null;
    isLoading: boolean;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllAccuracyTests: () => Promise<void>;
    createAccuracyTest: (data: AccuracyTestDto) => Promise<void>;
    updateAccuracyTest: (id: string, data: AccuracyTestDto) => Promise<void>;
    deleteAccuracyTest: (id: string) => Promise<void>;
}

const useAccuracyTestStore = create<AccuracyTestState>((set) => {
    return {
        accuracyTests: [],
        isLoading: false,
        error: null,
        message: null,
        limit: 10,
        offset: 0,
        search: "",
        totalRows: 0,
        getAllAccuracyTests: async () => {
            set({ isLoading: true });
            try {
                const { selectedTryoutId } = useTryoutStore.getState();
                const { selectedTryoutSectionId } = useTryoutSectionStore.getState();
                const { limit, offset, search } = useAccuracyTestStore.getState();
                const params: Record<string, any> = { limit, offset };
                if (search) {
                    params.search = search;
                }
                params.selectedTryoutId = selectedTryoutId;
                params.selectedTryoutSectionId = selectedTryoutSectionId;
                const response = await get(`/api/admin/accuracy-tests`, params);
                if (response.message === "Success") {
                    set({
                        accuracyTests: response.data.accuracyTests,
                        totalRows: response.data.count,
                    });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to get accuracy tests" });
            } finally {
                set({ isLoading: false });
            }
        },
        createAccuracyTest: async (data: AccuracyTestDto) => {
            set({ isLoading: true });
            try {
                const response = await post("/api/admin/accuracy-tests", data);
                if (response.message === "Success") {
                    await useAccuracyTestStore.getState().getAllAccuracyTests();
                    set({ message: "Accuracy test created successfully" });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to create accuracy test" });
            } finally {
                set({ isLoading: false });
            }
        },
        updateAccuracyTest: async (id: string, data: AccuracyTestDto) => {
            set({ isLoading: true });
            try {
                const response = await put(`/api/admin/accuracy-tests/${id}`, data);
                if (response.message === "Success") {
                    await useAccuracyTestStore.getState().getAllAccuracyTests();
                    set({ message: "Accuracy test updated successfully" });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to update accuracy test" });
            } finally {
                set({ isLoading: false });
            }
        },
        deleteAccuracyTest: async (id: string) => {
            set({ isLoading: true });
            try {
                const response = await del(`/api/admin/accuracy-tests/${id}`);
                if (response.message === "Success") {
                    set((state) => ({
                        accuracyTests: state.accuracyTests?.filter((accuracyTest) => accuracyTest.id !== id),
                        message: "Accuracy test deleted successfully",
                    }));
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to delete accuracy test" });
            } finally {
                set({ isLoading: false });
            }
        },
    };
});

export default useAccuracyTestStore;