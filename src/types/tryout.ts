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
    instruction: string;
    duration: number;
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
    instruction: string | null;
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

export type TryoutDto = Omit<Tryout, "id" | "createdAt" | "program">;
