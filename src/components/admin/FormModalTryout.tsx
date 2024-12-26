import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalTryoutProps } from "../../types/tryout";

const FormModalTryout: React.FC<FormModalTryoutProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const [startDate, setStartDate] = useState<string>(initialValues?.startDate ?? "");
    const [endDate, setEndDate] = useState<string>(initialValues?.endDate ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [titleTryout, setTitleTryout] = useState<string>(initialValues?.title ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);

    useEffect(() => {
        setStartDate(initialValues?.startDate ?? "");
        setEndDate(initialValues?.endDate ?? "");
        setType(initialValues?.type ?? "");
        setTitleTryout(initialValues?.title ?? "");
        setDescription(initialValues?.description ?? "");
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleTryout(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await onSubmit({ startDate, endDate, type, title: titleTryout, description, isActive });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={titleTryout}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-600">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-600">
                        Type
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={handleTypeChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="isActive" className="block mb-2 text-sm font-medium text-gray-600">
                        Active
                    </label>
                    <select
                        id="isActive"
                        value={isActive ? "true" : "false"}
                        onChange={handleIsActiveChange}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default FormModalTryout;
