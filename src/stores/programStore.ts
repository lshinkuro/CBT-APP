/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { ProgramDto, ProgramState } from "../types/program";

const useProgramStore = create<ProgramState>((set) => ({
    availablePrograms: [],
    selectedProgramId: "",
    programs: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getAllAvailablePrograms: async () => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/programs/available`);
            if (response.message === "Success") {
                set({
                    availablePrograms: response.data,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get available programs" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllPrograms: async () => {
        set({ isLoading: true });
        try {
            const { limit, offset, search } = useProgramStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get(`/api/admin/programs`, params);
            if (response.message === "Success") {
                set({
                    programs: response.data.programs,
                    totalRows: response.data.count,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get programs" });
        } finally {
            set({ isLoading: false });
        }
    },
    createProgram: async (data: ProgramDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/programs", data);
            if (response.message === "Success") {
                await useProgramStore.getState().getAllPrograms();
                set({ message: "Program created successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create program" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateProgram: async (id: string, data: ProgramDto) => {
        set({ isLoading: true });
        try {
            const response = await put(`/api/admin/programs/${id}`, data);
            if (response.message === "Success") {
                await useProgramStore.getState().getAllPrograms();
                set({ message: "Program updated successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update program" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteProgram: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await del(`/api/admin/programs/${id}`);
            if (response.message === "Success") {
                set((state) => ({
                    programs: state.programs.filter((program) => program.id !== id),
                    message: "Program deleted successfully",
                }));
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to delete program" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useProgramStore;
