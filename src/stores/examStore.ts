/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ExamDto, AnswerDto } from "../types/exam";
import { get, post, put } from "../service/api/ApiConfig";
import useQuestionStore from "./questionStore";

interface ExamState {
    exams: any;
    isLoading: boolean;
    isReadIstruction: boolean;
    isProgressExam: boolean;
    message: string | null;
    currentExam: any;
    currentSection: string | null;
    error: string | null;
    getAllExamsByStudentId: ({
        limit,
        offset,
        search,
    }: {
        limit: number;
        offset: number;
        search: string | null;
    }) => Promise<void>;
    createExam: (data: ExamDto) => Promise<void>;
    getCurrentExamByStudentId: () => Promise<void>;
    isExamComplete: boolean;
    setAnswer: (data: AnswerDto) => Promise<void>;
    nextQuestion: () => Promise<void>;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    checkCurrentProgressExam: () => Promise<void>;
    limit: number;
    offset: number;
    search: string | null;
    totalRows: number;
    mode: string;
    isContinueExam: boolean;
    continueExam: (data: ExamDto) => Promise<void>;
    timeUp: boolean;
    getAllExams: () => Promise<void>;
}

const useExamStore = create<ExamState>((set) => ({
    timeUp: false,
    exams: [],
    isContinueExam: false,
    isLoading: false,
    isReadIstruction: false,
    isProgressExam: false,
    message: null,
    currentExam: null,
    currentSection: null,
    error: null,
    isExamComplete: false,
    mode: "normal",
    limit: 10,
    offset: 0,
    search: "",
    totalRows: 0,
    continueExam: async (data: ExamDto) => {
        set({ isLoading: true });
        try {
            const response = await post(`/api/student/exams/continue`, data);
            if (response.message === "Success") {
                set({ message: "Tryout started!", currentExam: response.data });
                const questions = response?.data?.data?.questions;
                useQuestionStore.setState({ examQuestions: questions });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get exams" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllExams: async () => {
        set({ isLoading: true });
        try {
            const { limit, offset, search } = useExamStore.getState();
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get("/api/admin/exams", params);
            if (response.message === "Success") {
                set({ message: "Tryout list!", exams: response.data.exams, totalRows: response.data.count });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get exams" });
        } finally {
            set({ isLoading: false });
        }
    },
    getAllExamsByStudentId: async ({
        limit,
        offset,
        search,
    }: { limit?: number; offset?: number; search?: string | null } = {}) => {
        set({ isLoading: true });
        try {
            const params: Record<string, any> = { limit, offset };
            if (search) {
                params.search = search;
            }
            const response = await get("/api/exams", params);
            if (response.message === "Success") {
                set({ message: "Tryout list!", exams: response.data.exams, totalRows: response.data.count });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to get exams" });
        } finally {
            set({ isLoading: false });
        }
    },
    checkCurrentProgressExam: async () => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/student/exams/check?mode=${useExamStore.getState().mode}`);
            if (response.message === "Success") {
                set({ message: "Tryout progress!", isProgressExam: response.data });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to check exam" });
        } finally {
            set({ isLoading: false });
        }
    },
    createExam: async (data: ExamDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/exams", data);
            if (response.message === "Success") {
                set({ message: "Tryout started!", currentExam: response.data });
                const questions = response?.data?.data?.questions;
                useQuestionStore.setState({ examQuestions: questions });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to start Tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
    getCurrentExamByStudentId: async () => {
        set({ isLoading: true });
        try {
            const response = await get(`/api/student/exams`);
            if (response.message === "Success") {
                set({ message: "Tryout progress!", currentExam: response.data });
                set({ mode: response?.data?.data?.mode });
                const mode = useExamStore.getState().mode;
                if (
                    (response?.data?.data.normalTestsStatus === "progress" && mode === "normal") ||
                    (response?.data?.data.symbolTestsStatus === "progress" && mode === "accuracy_symbol") ||
                    (response?.data?.data.pauliTestsStatus === "progress" && mode === "arithmetic_pauli")
                ) {
                    set({ isProgressExam: true, isExamComplete: false });
                } else if (
                    (response?.data?.data.normalTestsStatus === "completed" && mode === "normal") ||
                    (response?.data?.data.symbolTestsStatus === "completed" && mode === "accuracy_symbol") ||
                    (response?.data?.data.pauliTestsStatus === "completed" && mode === "arithmetic_pauli")
                ) {
                    set({ isProgressExam: false, isExamComplete: true });
                }
                const questions = response?.data?.data?.questions;
                useQuestionStore.setState({ examQuestions: questions, currentQuestion: 0 });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to start Tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
    setAnswer: async (data: AnswerDto) => {
        set({ isLoading: true });
        try {
            const { currentExam } = useExamStore.getState();
            const response = await put(`/api/student/exams/${currentExam?.id}`, data);
            if (response.message === "Success") {
                set({ message: "Tryout progress!", currentExam: response.data });
                const questions = response?.data?.data?.questions;
                useQuestionStore.setState({ examQuestions: questions });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to set answer" });
        } finally {
            set({ isLoading: false });
        }
    },
    nextQuestion: async () => {
        set({ isLoading: true });
        try {
            const nextIndex = useQuestionStore.getState().currentQuestion + 1;
            if (nextIndex >= useQuestionStore.getState().examQuestions.length) {
                const response = await get(`/api/student/exams/${useExamStore.getState().currentExam?.id}/complete`);
                set({ message: "Tryout completed!", currentExam: response.data });
                set({ isExamComplete: true, isProgressExam: false });
            } else {
                useQuestionStore.setState({ currentQuestion: nextIndex });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to go next question" });
        } finally {
            set({ isLoading: false });
        }
    },
    previousQuestion: () => {
        const prevIndex = useQuestionStore.getState().currentQuestion - 1;
        if (prevIndex >= 0) {
            useQuestionStore.setState({ currentQuestion: prevIndex });
        }
    },
    goToQuestion: (index) => {
        if (index >= 0 && index < useQuestionStore.getState().examQuestions.length) {
            useQuestionStore.setState({ currentQuestion: index });
        }
    },
    currentQuestion: 0,
}));

export default useExamStore;
