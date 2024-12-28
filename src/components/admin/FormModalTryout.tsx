import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalTryoutProps } from "../../types/tryout";
import { toast } from "react-hot-toast";

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
        setType(initialValues?.type ?? "CPNS");
        setTitleTryout(initialValues?.title ?? "");
        setDescription(initialValues?.description ?? "");
        setIsActive(initialValues?.isActive ?? true);
    }, [initialValues]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleTryout(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!titleTryout || !startDate || !endDate || !type) {
            toast.error("Missing required fields");
            return;
        }
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
                    <label htmlFor="title" className="block mb-1 text-xs font-medium text-gray-600">
                        Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={titleTryout}
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
                    <label htmlFor="startDate" className="block mb-1 text-xs font-medium text-gray-600">
                        Start Date *
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate ? new Date(startDate).toISOString().slice(0, 10) : ""}
                        onChange={handleStartDateChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block mb-1 text-xs font-medium text-gray-600">
                        End Date *
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate ? new Date(endDate).toISOString().slice(0, 10) : ""}
                        onChange={handleEndDateChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
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
                        <option value="CPNS">CPNS</option>
                        <option value="IKATAN_DINAS">Ikatan Dinas</option>
                        <option value="TNI_POLRI">TNI/Polri</option>
                    </select>
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

export default FormModalTryout;
