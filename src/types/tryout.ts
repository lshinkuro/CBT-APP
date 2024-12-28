export interface Tryout {
    id: string;
    title: string;
    type: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
}

export interface AvailableTryouts {
    id: string;
    title: string;
    type: string;
}

export interface TryoutState {
    availableTryouts: AvailableTryouts[];
    tryouts: Tryout[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllAvailableTryouts: () => Promise<void>;
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

export type TryoutDto = Omit<Tryout, "id" | "createdAt">;
