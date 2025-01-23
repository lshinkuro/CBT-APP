/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TryoutSection {
    tryout: {
        id: string;
        title: string;
    };
    id: string;
    tryoutId: string;
    title: string;
    code: string;
    description: string;
    type: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export interface AvailableTryoutSections {
    id: string;
    title: string;
    type: string;
    code: string;
    description: string;
    tryout: {
        id: string;
        title: string;
    };
}
export interface TryoutSectionState {
    selectedTryoutSectionId: string;
    availableTryoutSections: AvailableTryoutSections[];
    tryoutSections: TryoutSection[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllAvailableTryoutSectionsByTryoutId: (tryoutId: string | null) => Promise<void>;
    getAllTryoutSections: () => Promise<void>;
    createTryoutSection: (data: TryoutSectionDto) => Promise<void>;
    updateTryoutSection: (id: string, data: TryoutSectionDto) => Promise<void>;
    deleteTryoutSection: (id: string) => Promise<void>;
}

export interface FormModalTryoutSectionProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: TryoutSectionDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: TryoutSection;
}

export type TryoutSectionDto = Omit<TryoutSection, "id" | "createdAt" | "tryout">;
