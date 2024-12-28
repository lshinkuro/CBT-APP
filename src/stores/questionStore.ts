/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { QuestionDto, QuestionState } from "../types/question";

const useQuestionStore = create<QuestionState>((set) => ({
    questions: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    getAllQuestions: async () => {
        set({ isLoading: true });
        try {
            const { limit, offset, search } = useQuestionStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get(`/api/admin/questions`, params);
            if (response.message === "Success") {
                set({
                    questions: response.data.questions,
                    totalRows: response.totalRows,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get questions" });
        } finally {
            set({ isLoading: false });
        }
    },
    createQuestion: async (data: QuestionDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/questions", data);
            if (response.message === "Success") {
                await useQuestionStore.getState().getAllQuestions();
                set({ message: "Question created successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to create question" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateQuestion: async (id: string, data: QuestionDto) => {
        set({ isLoading: true });
        try {
            const response = await put(`/api/admin/questions/${id}`, data);
            if (response.message === "Success") {
                await useQuestionStore.getState().getAllQuestions();
                set({ message: "Question updated successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to update question" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteQuestion: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await del(`/api/admin/questions/${id}`);
            if (response.message === "Success") {
                set((state) => ({
                    questions: state.questions.filter((question) => question.id !== id),
                    message: "Question deleted successfully",
                }));
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to delete question" });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useQuestionStore;
