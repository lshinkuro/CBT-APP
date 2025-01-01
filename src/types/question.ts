export interface Question {
    tryoutSection: {
        id: string;
        title: string;
        type: string;
        subType: string | null;
        tryout: {
            id: string;
            title: string;
            type: string;
        };
    };
    tryoutSectionId: string | null;
    id: string;
    content: string;
    type: string;
    image?: string | null;
    imageObject?: File | null;
    data: Record<string, unknown>;
    isActive: boolean;
    createdAt: string;
}

export interface QuestionState {
    hasChangeImage: boolean;
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
    mode?: "create" | "update";
}

export interface Option {
    key: string;
    content: string;
    score: number;
    image: string | null;
    correct: boolean;
}

export interface OptionProps {
    setData: (data: { options: Option[] }) => void;
    data: { options: Option[] };
}

export type QuestionDto = Omit<Question, "id" | "createdAt" | "tryoutSection">;
