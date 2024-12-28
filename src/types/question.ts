export interface Question {
    id: string;
    content: string;
    type: string;
    image?: string | null;
    data: Record<string, unknown>;
    isActive: boolean;
    createdAt: string;
}

export interface QuestionState {
    questions: Question[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllQuestions: () => Promise<void>;
    createQuestion: (data: QuestionDto) => Promise<void>;
    updateQuestion: (id: string, data: QuestionDto) => Promise<void>;
    deleteQuestion: (id: string) => Promise<void>;
}

export interface FormModalQuestionProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: QuestionDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: Question;
}

export type QuestionDto = Omit<Question, "id" | "createdAt">;