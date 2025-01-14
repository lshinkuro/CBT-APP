/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { get, post, put, del } from "../service/api/ApiConfig";
import { Symbol, SymbolDto } from "../types/symbol";

interface SymbolState {
    currentSymbol: Symbol | null;
    symbols: Symbol[];
    message: string | null;
    isLoading: boolean;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllSymbols: () => Promise<void>;
    createSymbol: (data: SymbolDto) => Promise<void>;
    updateSymbol: (id: string, data: SymbolDto) => Promise<void>;
    deleteSymbol: (id: string) => Promise<void>;
}

const useSymbolStore = create<SymbolState>((set) => {
    return {
        currentSymbol: null,
        symbols: [],
        isLoading: false,
        error: null,
        message: null,
        limit: 10,
        offset: 0,
        search: "",
        totalRows: 0,
        getAllSymbols: async () => {
            set({ isLoading: true });
            try {
                const { limit, offset, search } = useSymbolStore.getState();
                const params: Record<string, any> = { limit, offset };
                if (search) {
                    params.search = search;
                }
                const response = await get(`/api/admin/symbols`, params);
                if (response.message === "Success") {
                    set({
                        symbols: response.data.symbols,
                        totalRows: response.data.count,
                    });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to get symbols" });
            } finally {
                set({ isLoading: false });
            }
        },
        createSymbol: async (data: SymbolDto) => {
            set({ isLoading: true });
            try {
                const response = await post("/api/admin/symbols", data);
                if (response.message === "Success") {
                    await useSymbolStore.getState().getAllSymbols();
                    set({ message: "Symbol created successfully" });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to create symbol" });
            } finally {
                set({ isLoading: false });
            }
        },
        updateSymbol: async (id: string, data: SymbolDto) => {
            set({ isLoading: true });
            try {
                const response = await put(`/api/admin/symbols/${id}`, data);
                if (response.message === "Success") {
                    await useSymbolStore.getState().getAllSymbols();
                    set({ message: "Symbol updated successfully" });
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to update symbol" });
            } finally {
                set({ isLoading: false });
            }
        },
        deleteSymbol: async (id: string) => {
            set({ isLoading: true });
            try {
                const response = await del(`/api/admin/symbols/${id}`);
                if (response.message === "Success") {
                    set((state) => ({
                        symbols: state.symbols?.filter((symbol) => symbol.id !== id),
                        message: "Symbol deleted successfully",
                    }));
                }
            } catch (error: any) {
                set({ error: error.response?.data?.message || "Failed to delete symbol" });
            } finally {
                set({ isLoading: false });
            }
        },
    };
});

export default useSymbolStore;
