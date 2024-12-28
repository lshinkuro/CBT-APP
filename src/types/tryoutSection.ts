/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TryoutSection {
    tryout: {
        id: string;
        title: string;
    };
    id: string;
    tryoutId: string;
    title: string;
    type: string;
    subType: string | null;
    duration: number;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export interface AvailableTryoutSections {
    id: string;
    title: string;
    type: string;
    subType: string;
}
export interface TryoutSectionState {
    availableTryoutSections: AvailableTryoutSections[];
    tryoutSections: TryoutSection[];
    isLoading: boolean;
    message: string | null;
    error: string | null;
    limit: number;
    offset: number;
    search: string;
    totalRows: number;
    getAllAvailableTryoutSectionsByTryoutId: (tryoutId: string) => Promise<void>;
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

export interface SelectTryoutSectionProps {
    setTryoutSectionId: React.Dispatch<React.SetStateAction<string>>;
    tryoutSectionId: string;
    availableTryoutSections: AvailableTryoutSections[];
}

export type TryoutSectionDto = Omit<TryoutSection, "id" | "createdAt" | "tryout">;
