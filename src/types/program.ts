/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Program {
    id: string;
    title: string;
    code: string;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export interface AvailablePrograms {
    id: string;
    title: string;
    code: string;
    description: string;
}

export interface ProgramState {
    availablePrograms: AvailablePrograms[];
    selectedProgramId: string;
    programs: Program[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllAvailablePrograms: () => Promise<void>;
    getAllPrograms: () => Promise<void>;
    createProgram: (data: ProgramDto) => Promise<void>;
    updateProgram: (id: string, data: ProgramDto) => Promise<void>;
    deleteProgram: (id: string) => Promise<void>;
}

export interface FormModalProgramProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: ProgramDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: ProgramDto;
}

export type ProgramDto = Omit<Program, "id" | "createdAt">;
