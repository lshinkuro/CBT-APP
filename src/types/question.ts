/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Question {
    tryoutSection: {
        id: string;
        title: string;
        code: string;
        type: string;
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
    data: { numberOfCorrectAnswers?: string; options: Option[] };
    isActive: boolean;
    createdAt: string;
}

export interface QuestionState {
    examQuestions: { id: string; answers: string[]; numberOfCorrectAnswers: number }[];
    excelQuestions: [];
    pathExcelQuestions: string;
    currentQuestion: number;
    currentQuestionData: Question | null;
    hasChangeImageOptions: { [key: string]: boolean };
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
    getQuestionById: (id: string) => Promise<void>;
    createQuestion: (data: QuestionDto) => Promise<void>;
    updateQuestion: (id: string, data: QuestionDto) => Promise<void>;
    deleteQuestion: (id: string) => Promise<void>;
    handleExportToExcel: (data: any) => Promise<void>;
    readQuestionFromExcel: (data: any) => Promise<void>;
    confirmAddOrUpdateQuestionFromExcel: (data: { path: string }) => Promise<void>;
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

export interface FormModalPreviewExcelQuestionProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: { path: string }) => Promise<void>;
    isLoading?: boolean;
}

export interface Option {
    key: string;
    content: string;
    score: number;
    image: string | null;
    imageObject?: File | null;
    correct: boolean;
}

export interface OptionProps {
    setData: (data: { options: Option[] }) => void;
    data: { options: Option[] };
    mode?: "create" | "update";
}

export interface PreviewQuestionProps {
    id: string;
    "Tryout Section Code": string;
    Content: string;
    Type: string;
    "Image Url": { hyperlink: string; text: string };
    "Number Of Correct Answers": string;
    "Option a Image": { hyperlink: string; text: string };
    "Option a Score": string;
    "Option a Content": string;
    "Option a Correct": string;
    "Option b Image": { hyperlink: string; text: string };
    "Option b Score": string;
    "Option b Content": string;
    "Option b Correct": string;
    "Option c Image": { hyperlink: string; text: string };
    "Option c Score": string;
    "Option c Content": string;
    "Option c Correct": string;
    "Option d Image": { hyperlink: string; text: string };
    "Option d Score": string;
    "Option d Content": string;
    "Option d Correct": string;
    "Option e Image": { hyperlink: string; text: string };
    "Option e Score": string;
    "Option e Content": string;
    "Option e Correct": string;
}

export type QuestionDto = Omit<Question, "id" | "createdAt" | "tryoutSection">;
