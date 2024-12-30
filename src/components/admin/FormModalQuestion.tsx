/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FormModalQuestionProps } from "../../types/question";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import SelectTryout from "./SelectTryout";
import SelectTryoutSection from "./SelectTryoutSection";
import QuestionOption from "./QuestionOption";
import { MockData } from "../../mocks/Option";
import useTryoutStore from "../../stores/tryoutStore";

const FormModalQuestion: React.FC<FormModalQuestionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { availableTryoutSections } = useTryoutSectionStore();
    const { selectedTryoutId } = useTryoutStore();
    const { selectedTryoutSectionId } = useTryoutSectionStore();
    const [content, setContent] = useState<string>(initialValues?.content ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [image, setImage] = useState<string | null>(initialValues?.image ?? null);
    const [data, setData] = useState<any>(initialValues?.data ?? MockData);
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setContent(initialValues?.content ?? "");
        setType(initialValues?.type ?? "");
        setImage(initialValues?.image ?? null);
        setData(initialValues?.data ?? MockData);
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content || !type || selectedTryoutId === "" || selectedTryoutSectionId === "") {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ content, type, image, data, isActive, tryoutSectionId: selectedTryoutSectionId });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            maxWidth="max-w-4xl"
        >
            <form onSubmit={handleSubmit}>
                <SelectTryout />
                {availableTryoutSections.length > 0 && <SelectTryoutSection />}
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
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="essay">Essay</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-1 text-xs font-medium text-gray-600">
                        Image
                    </label>
                    {image && (
                        <div className="flex items-center justify-center mb-2">
                            <img src={image} alt="Selected" className="max-w-[50%] h-auto rounded-md" />
                        </div>
                    )}
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
                    <QuestionOption setData={setData} data={data} />
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
