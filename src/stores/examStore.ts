/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Question, SubType, SubSubType, ExamDto } from "../types/exam";
import { post } from "../service/api/ApiConfig";

interface ExamState {
    isLoading: boolean;
    isReadIstruction: boolean;
    isProgressExam: boolean;
    message: string;
    error: string | null;
    createExam: (data: ExamDto) => Promise<void>;
    currentQuestion: number;
    questions: Question[];
    answers: Record<string, string>;
    scores: Record<SubSubType, number>;
    isExamComplete: boolean;
    setAnswer: (questionId: string, answerId: string) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    calculateScore: () => {
        TIU: number;
        TKP: number;
        TWK: number;
        total: number;
    };
    resetExam: () => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
    isLoading: false,
    isReadIstruction: false,
    isProgressExam: false,
    message: "",
    createExam: async (data: ExamDto) => {
        set({ isLoading: true });
        try {
            const response = await post("/api/exams", data);
            if (response.message === "Success") {
                set({ message: "Tryout started!" });
            }
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to start Tryout" });
        } finally {
            set({ isLoading: false });
        }
    },
    currentQuestion: 0,
    questions: [
        {
            id: "1",
            text: "Dalam sebuah barisan aritmatika, suku pertama adalah 3 dan suku ketiga adalah 9. Berapakah suku kelima dari barisan tersebut?",
            options: [
                { id: "a", text: "12", weight: 0 },
                { id: "b", text: "15", weight: 5 },
                { id: "c", text: "18", weight: 0 },
                { id: "d", text: "21", weight: 0 },
            ],
            subSubType: "TIU",
            explanation:
                "Beda = (suku ketiga - suku pertama) / 2 = (9-3)/2 = 3. Suku kelima = suku pertama + 4(beda) = 3 + 4(3) = 15",
        },
        {
            id: "2",
            text: "Jika 2x + 3y = 12 dan 3x - 2y = 4, maka nilai x adalah...",
            options: [
                { id: "a", text: "2", weight: 0 },
                { id: "b", text: "3", weight: 5 },
                { id: "c", text: "4", weight: 0 },
                { id: "d", text: "5", weight: 0 },
            ],
            subSubType: "TIU",
            explanation:
                "Menggunakan metode eliminasi: \n2x + 3y = 12 | ×3 | 6x + 9y = 36\n3x - 2y = 4  | ×2 | 6x - 4y = 8\nKurangkan persamaan: 13y = 28\ny = 2.15\nSubstitusi ke persamaan pertama:\n2x + 3(2.15) = 12\n2x + 6.45 = 12\n2x = 5.55\nx = 3",
        },

        // TWK Questions
        {
            id: "3",
            text: "Pancasila sila ke-3 berbunyi...",
            options: [
                { id: "a", text: "Kemanusiaan yang adil dan beradab", weight: 0 },
                { id: "b", text: "Persatuan Indonesia", weight: 5 },
                { id: "c", text: "Keadilan sosial bagi seluruh rakyat Indonesia", weight: 0 },
                { id: "d", text: "Ketuhanan Yang Maha Esa", weight: 0 },
            ],
            subSubType: "TWK",
            explanation:
                "Sila-sila Pancasila:\n1. Ketuhanan Yang Maha Esa\n2. Kemanusiaan yang adil dan beradab\n3. Persatuan Indonesia\n4. Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan\n5. Keadilan sosial bagi seluruh rakyat Indonesia",
        },

        // TKP Questions
        {
            id: "4",
            text: "Ketika Anda mendapati rekan kerja melakukan kesalahan dalam pekerjaan, apa yang akan Anda lakukan?",
            options: [
                { id: "a", text: "Membiarkannya karena bukan urusan saya", weight: 1 },
                { id: "b", text: "Melaporkan langsung ke atasan", weight: 3 },
                { id: "c", text: "Menegur dan membantu memperbaiki kesalahannya", weight: 5 },
                { id: "d", text: "Menyebarkan kesalahannya ke rekan kerja lain", weight: 2 },
            ],
            subSubType: "TKP",
            explanation:
                "Jawaban terbaik adalah menegur dan membantu memperbaiki kesalahan karena menunjukkan sikap kooperatif dan profesional dalam bekerja",
        },
    ],
    answers: {},
    scores: {
        TIU: 0,
        TKP: 0,
        TWK: 0,
        MTK: 0,
        WK: 0,
        BI: 0,
        PU: 0,
        IQ: 0,
        EQ: 0,
        KECERMATAN: 0,
    },
    isExamComplete: false,

    setAnswer: (questionId, answerId) =>
        set((state) => ({
            answers: { ...state.answers, [questionId]: answerId },
        })),

    nextQuestion: () => {
        const state = get();
        const nextIndex = state.currentQuestion + 1;

        if (nextIndex >= state.questions.length) {
            set({ isExamComplete: true });
        } else {
            set({ currentQuestion: nextIndex });
        }
    },

    previousQuestion: () => {
        const state = get();
        const prevIndex = state.currentQuestion - 1;

        if (prevIndex >= 0) {
            set({ currentQuestion: prevIndex });
        }
    },

    goToQuestion: (index) => {
        if (index >= 0 && index < get().questions.length) {
            set({ currentQuestion: index });
        }
    },

    calculateScore: () => {
        const state = get();
        let scores = {
            TIU: 0,
            TKP: 0,
            TWK: 0,
            total: 0,
        };

        state.questions.forEach((question) => {
            const answer = state.answers[question.id];
            if (answer) {
                const option = question.options.find((opt) => opt.id === answer);
                if (option) {
                    scores[question.subSubType as keyof typeof scores] += option.weight;
                }
            }
        });

        scores.total = scores.TIU + scores.TKP + scores.TWK;
        return scores;
    },

    resetExam: () => {
        set({
            currentQuestion: 0,
            answers: {},
            scores: {
                TIU: 0,
                TKP: 0,
                TWK: 0,
                MTK: 0,
                WK: 0,
                BI: 0,
                PU: 0,
                IQ: 0,
                EQ: 0,
                KECERMATAN: 0,
            },
            isExamComplete: false,
        });
    },
}));
