/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExamType = "CPNS" | "IKATAN_DINAS" | "TNI_POLRI";

export type SubType = "SKD" | "SKB" | "AKADEMIK" | "PSIKOTES" | "KECERMATAN";

export type SubSubType = "TIU" | "TKP" | "TWK" | "MTK" | "WK" | "BI" | "PU" | "IQ" | "EQ" | "KECERMATAN";

export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    options: {
        id: string;
        text: string;
        imageUrl?: string;
        isCorrect?: boolean;
        weight: number;
    }[];
    subSubType: SubSubType;
    duration: number;
}

export interface Exam {
    tryout: any;
    id: string;
    code: string;
    type: string;
    data: any;
    title: string;
    createdAt: string;
    studentName: string;
}

export interface ExamResult {
    id: string;
    userId: string;
    examId: string;
    score: {
        [key in SubSubType]?: number;
    };
    totalScore: number;
    completedAt: Date;
}

export interface ExamDto {
    code: string;
    mode: string;
}

export interface AnswerDto {
    questionId: string | undefined;
    answers: string[];
}

export interface FormModalExamProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: () => void;
    isLoading?: boolean;
    initialValues?: Exam;
}
