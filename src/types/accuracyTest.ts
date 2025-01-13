export interface AccuracyTest {
    id: string;
    code: string;
    title: string;
    type: string;
    tryoutSectionId: string;
    numberOfSessions: string;
    tryoutSection: {
        id: string;
        title: string;
        code: string;
        type: string;
        subType: string | null;
        tryout: {
            id: string;
            title: string;
            type: string;
        };
    };
    duration: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export interface FormModalAccuracyTestProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (data: AccuracyTestDto) => Promise<void>;
    isLoading?: boolean;
    initialValues?: AccuracyTestDto;
}

export type AccuracyTestDto = Omit<AccuracyTest, "id" | "createdAt" | "tryoutSection">;
