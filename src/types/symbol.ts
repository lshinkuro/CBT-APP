export interface Symbol {
    id: string;
    name: string;
    code: string;
    characters: string;
    isActive: boolean;
    createdAt: string;
}

export interface FormModalSymbolProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: SymbolDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: SymbolDto;
}

export type SymbolDto = Omit<Symbol, "id" | "createdAt">;
