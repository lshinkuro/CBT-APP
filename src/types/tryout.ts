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

export interface TryoutState {
    tryouts: Tryout[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllTryouts: () => Promise<void>;
    createTryout: (data: {
        title: string;
        type: string;
        description: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }) => Promise<void>;
    updateTryout: (id: string, data: {
        title: string;
        type: string;
        description: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }) => Promise<void>;
    deleteTryout: (id: string) => Promise<void>;
}

export interface FormModalTryoutProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: {
        title: string;
        type: string;
        description: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }) => Promise<void>;
    isLoading?: boolean;
    initialValues?: Tryout;
}
