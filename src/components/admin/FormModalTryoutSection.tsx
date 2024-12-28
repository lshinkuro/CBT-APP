import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalTryoutSectionProps } from "../../types/tryoutSection";
import { toast } from "react-hot-toast";
import useTryoutStore from "../../stores/tryoutStore";

const FormModalTryoutSection: React.FC<FormModalTryoutSectionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { availableTryouts } = useTryoutStore();
    const [tryoutId, setTryoutId] = useState<string>(initialValues?.tryoutId ?? "");
    const [titleSection, setTitleSection] = useState<string>(initialValues?.title ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [subType, setSubType] = useState<string | null>(initialValues?.subType ?? null);
    const [duration, setDuration] = useState<number>(initialValues?.duration ?? 0);
    const [order, setOrder] = useState<number>(initialValues?.order ?? 0);
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setTryoutId(initialValues?.tryoutId ?? "");
        setTitleSection(initialValues?.title ?? "");
        setType(initialValues?.type ?? "");
        setSubType(initialValues?.subType ?? null);
        setDuration(initialValues?.duration ?? 0);
        setOrder(initialValues?.order ?? 0);
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues, availableTryouts]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleSection(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);
    const handleSubTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setSubType(e.target.value || null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(tryoutId, titleSection, type, subType, duration, order, isActive);
        if (!tryoutId || !titleSection || !type || duration <= 0 || order <= 0) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ tryoutId, title: titleSection, type, subType, duration, order, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="titleSection" className="block mb-1 text-xs font-medium text-gray-600">
                        Title *
                    </label>
                    <input
                        id="titleSection"
                        type="text"
                        value={titleSection}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tryoutId" className="block mb-1 text-xs font-medium text-gray-600">
                        Select Tryout *
                    </label>
                    <select
                        id="tryoutId"
                        value={tryoutId}
                        onChange={(e) => setTryoutId(e.target.value)}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        {availableTryouts.map((tryout) => (
                            <option key={tryout.id} value={tryout.id}>
                                {tryout.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block mb-1 text-xs font-medium text-gray-600">
                        Type *
                    </label>
                    <input
                        id="type"
                        type="text"
                        value={type}
                        onChange={handleTypeChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subType" className="block mb-1 text-xs font-medium text-gray-600">
                        Sub Type
                    </label>
                    <input
                        id="subType"
                        type="text"
                        value={subType ?? ""}
                        onChange={handleSubTypeChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block mb-1 text-xs font-medium text-gray-600">
                        Duration (minutes) *
                    </label>
                    <input
                        id="duration"
                        type="number"
                        value={duration === 0 ? "" : duration}
                        onChange={(e) => setDuration(e.target.value === "" ? 0 : Number(e.target.value))}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="order" className="block mb-1 text-xs font-medium text-gray-600">
                        Order *
                    </label>
                    <input
                        id="order"
                        type="number"
                        value={order === 0 ? "" : order}
                        onChange={(e) => setOrder(e.target.value === "" ? 0 : Number(e.target.value))}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block mb-1 text-xs font-medium text-gray-600">
                        Active Status *
                    </label>
                    <select
                        id="isActive"
                        value={isActive ? "true" : "false"}
                        onChange={(e) => setIsActive(e.target.value === "true")}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalTryoutSection;
