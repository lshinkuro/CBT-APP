import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalProgramProps } from "../../types/program";
import { toast } from "react-hot-toast";

const FormModalProgram: React.FC<FormModalProgramProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const [code, setCode] = useState<string>(initialValues?.code ?? "");
    const [titleProgram, setTitleProgram] = useState<string>(initialValues?.title ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setCode(initialValues?.code ?? "");
        setTitleProgram(initialValues?.title ?? "");
        setDescription(initialValues?.description ?? "");
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleProgram(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!titleProgram || !code) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({ code, title: titleProgram, description, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-1 text-xs font-medium text-gray-600">
                        Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={titleProgram}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 text-xs font-medium text-gray-600">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block mb-1 text-xs font-medium text-gray-600">
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

export default FormModalProgram;
