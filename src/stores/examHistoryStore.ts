import { create } from "zustand";

interface ExamHistory {
    id: string;
    title: string;
    type: string;
    completedAt: string;
    score: {
        total: number;
        sections: Record<string, number>;
    };
}

interface ExamHistoryState {
    history: ExamHistory[];
}

export const useExamHistory = create<ExamHistoryState>(() => ({
    history: [
        {
            id: "1",
            title: "Tes CPNS",
            type: "SKD",
            completedAt: "2024-03-15",
            score: {
                total: 255,
                sections: {
                    TIU: 80,
                    TKP: 85,
                    TWK: 90,
                },
            },
        },
    ],
}));
