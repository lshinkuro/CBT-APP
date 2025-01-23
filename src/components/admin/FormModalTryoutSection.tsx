import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalTryoutSectionProps } from "../../types/tryoutSection";
import { toast } from "react-hot-toast";
import useTryoutStore from "../../stores/tryoutStore";
import SelectTryout from "./SelectTryout";

const FormModalTryoutSection: React.FC<FormModalTryoutSectionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { availableTryouts, selectedTryoutId } = useTryoutStore();
    const [titleSection, setTitleSection] = useState<string>(initialValues?.title ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [code, setCode] = useState<string>(initialValues?.code ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [order, setOrder] = useState<number>(initialValues?.order ?? 0);
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setTitleSection(initialValues?.title ?? "");
        setType(initialValues?.type ?? "");
        setCode(initialValues?.code ?? "");
        setDescription(initialValues?.description ?? "");
        setOrder(initialValues?.order ?? 0);
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues, availableTryouts]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleSection(e.target.value);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedTryoutId === "" || !titleSection || !type || order <= 0 || !code) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({
                tryoutId: selectedTryoutId,
                title: titleSection,
                type,
                order,
                isActive,
                code,
                description,
            });
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
                <SelectTryout />
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
                    <label htmlFor="type" className="block mb-1 text-xs font-medium text-gray-600">
                        Code *
                    </label>
                    <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 text-xs font-medium text-gray-600">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="order" className="block mb-1 text-xs font-medium text-gray-600">
                        Urutan Tampil dalam Sesi Ujian *
                    </label>
                    <input
                        id="order"
                        type="number"
                        value={order === 0 ? "" : order}
                        onChange={(e) => setOrder(Math.max(0, e.target.value === "" ? 0 : Number(e.target.value)))}
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
