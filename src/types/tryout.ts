/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Tryout {
    id: string;
    title: string;
    code: string;
    description: string;
    programId: string;
    program: {
        id: string;
        title: string;
    };
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
}

export interface AvailableTryouts {
    id: string;
    title: string;
    code: string;
    description: string;
}

export interface TryoutState {
    selectedTryoutId: string;
    availableTryouts: AvailableTryouts[];
    instruction: Instruction | null;
    tryouts: Tryout[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getInstructionByCode: (code: string) => Promise<void>;
    getAllAvailableTryouts: () => Promise<void>;
    getAllAvailableTryoutsByProgramId: (programId: string | null) => Promise<void>;
    getAllTryouts: () => Promise<void>;
    createTryout: (data: TryoutDto) => Promise<void>;
    updateTryout: (id: string, data: TryoutDto) => Promise<void>;
    deleteTryout: (id: string) => Promise<void>;
}

export interface FormModalTryoutProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: TryoutDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: Tryout;
}

export type InstructionSection = {
    id: string;
    title: string;
    content?: string;
    list?: { id: string; text: string }[];
    subsections?: {
        id: string;
        title: string;
        list: { id: string; text: string }[];
    }[];
    steps?: {
        id: string;
        title: string;
        content: string;
    }[];
    note?: string;
};

export type Instruction = {
    title: string;
    sections: InstructionSection[];
};

export type TryoutDto = Omit<Tryout, "id" | "createdAt" | "program">;
