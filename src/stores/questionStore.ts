/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { post, get, put, del } from "../service/api/ApiConfig";
import { QuestionDto, QuestionState } from "../types/question";
import useTryoutStore from "./tryoutStore";
import useTryoutSectionStore from "./tryoutSectionStore";

const useQuestionStore = create<QuestionState>((set) => ({
    examQuestions: [],
    excelQuestions: [],
    pathExcelQuestions: "",
    currentQuestionData: null,
    currentQuestion: 0,
    hasChangeImageOptions: {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
    },
    hasChangeImage: false,
    questions: [],
    isLoading: false,
    message: null,
    error: null,
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    confirmAddOrUpdateQuestionFromExcel: async (data: any) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/questions/add-or-update-question-from-excel", data);
            if (response.message === "Success") {
                set({ message: "Mass process store execute successfully" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to mass process" });
        } finally {
            set({ isLoading: false });
        }
    },
    readQuestionFromExcel: async (data: any) => {
        set({ isLoading: true });
        try {
            const formData = new FormData();
            formData.append("key", "upload-excel-question");
            formData.append("excel", data.excelData ?? "");
            const response = await post("/api/admin/questions/read-question-from-excel", formData);
            if (response.message === "Success") {
                set({
                    message: "Mass process read execute successfully",
                    excelQuestions: response.data.data,
                    pathExcelQuestions: response.data.path,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to mass process" });
        } finally {
            set({ isLoading: false });
        }
    },
    handleExportToExcel: async (data: any) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/admin/questions/generate-excel", data);
            if (response.message === "Success") {
                set({ message: "Exporting Excel Files, please check your email" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to download questions" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllQuestions: async () => {
        set({ isLoading: true });
        try {
            const { selectedTryoutId } = useTryoutStore.getState();
            const { selectedTryoutSectionId } = useTryoutSectionStore.getState();
            const { limit, offset, search } = useQuestionStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            params.selectedTryoutId = selectedTryoutId;
            params.selectedTryoutSectionId = selectedTryoutSectionId;
            const response = await get(`/api/admin/questions`, params);
            if (response.message === "Success") {
                set({
                    questions: response.data.questions,
                    totalRows: response.data.count,
                });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get questions" });
        } finally {
            set({ isLoading: false });
        }
    },
    getQuestionById: async (id: string) => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/questions/${id}`);
            if (response.message === "Success") {
                set({ currentQuestionData: response.data });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get question" });
        } finally {
            set({ isLoading: false });
        }
    },
    createQuestion: async (data: QuestionDto) => {
        set({ isLoading: true });
        try {
            data.tryoutSectionId = useTryoutSectionStore.getState().selectedTryoutSectionId;
            const formData = new FormData();
            data.data.options.forEach((option) => {
                option.image = "";
            });
            formData.append("content", data.content);
            formData.append("type", data.type);
            formData.append("image", "");
            formData.append("data", JSON.stringify(data.data) ?? "");
            formData.append("isActive", String(data.isActive));
            formData.append("tryoutSectionId", String(data.tryoutSectionId));
            formData.append("key", "create-question");
            formData.append("imageObject", data.imageObject ?? "");
            data.data.options.forEach((option) => {
                if (option.imageObject) {
                    formData.append("imageObject-" + option.key, option.imageObject ?? "");
                }
            });
            const response = await post("/api/admin/questions", formData);
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
            const formData = new FormData();
            const hasChangeImageOptions = useQuestionStore.getState().hasChangeImageOptions;
            for (const key in hasChangeImageOptions) {
                if (hasChangeImageOptions[key]) {
                    data.data.options.forEach((option) => {
                        if (option.key === key) {
                            option.image = "";
                        }
                    });
                }
            }
            formData.append("content", data.content);
            formData.append("type", data.type);
            formData.append("image", useQuestionStore.getState().hasChangeImage ? "" : data.image ?? "");
            formData.append("data", JSON.stringify(data.data) ?? "");
            formData.append("isActive", String(data.isActive));
            formData.append("tryoutSectionId", String(data.tryoutSectionId));
            formData.append("key", "update-question");
            formData.append("imageObject", data.imageObject ?? "");
            data.data.options.forEach((option) => {
                if (option.imageObject) {
                    formData.append("imageObject-" + option.key, option.imageObject ?? "");
                }
            });
            const response = await put(`/api/admin/questions/${id}`, formData);
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
