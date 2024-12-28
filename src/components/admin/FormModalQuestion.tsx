/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FormModalQuestionProps } from "../../types/question";

const FormModalQuestion: React.FC<FormModalQuestionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const [content, setContent] = useState<string>(initialValues?.content ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [image, setImage] = useState<string | null>(initialValues?.image ?? null);
    const [data, setData] = useState<Record<string, unknown>>(initialValues?.data ?? {});
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setContent(initialValues?.content ?? "");
        setType(initialValues?.type ?? "");
        setImage(initialValues?.image ?? null);
        setData(initialValues?.data ?? {});
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value);
    const handleDataChange = (key: string, value: any) => setData((prevData) => ({ ...prevData, [key]: value }));
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content || !type) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ content, type, image, data, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-1 text-xs font-medium text-gray-600">
                        Content *
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block mb-1 text-xs font-medium text-gray-600">
                        Type *
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={handleTypeChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-1 text-xs font-medium text-gray-600">
                        Image
                    </label>
                    <input
                        id="image"
                        type="text"
                        value={image ?? ""}
                        onChange={handleImageChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="data" className="block mb-1 text-xs font-medium text-gray-600">
                        Data
                    </label>
                    <textarea
                        id="data"
                        value={JSON.stringify(data)}
                        onChange={(e) => handleDataChange("data", JSON.parse(e.target.value))}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block mb-1 text-xs font-medium text-gray-600">
                        Active Status *
                    </label>
                    <select
                        id="isActive"
                        value={isActive ? "true" : "false"}
                        onChange={handleIsActiveChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalQuestion;
