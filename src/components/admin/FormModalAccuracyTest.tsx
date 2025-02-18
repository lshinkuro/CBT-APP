/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FormModalAccuracyTestProps } from "../../types/accuracyTest";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import useTryoutStore from "../../stores/tryoutStore";
import SelectTryout from "./SelectTryout";
import SelectTryoutSection from "./SelectTryoutSection";
import InputSymbolPerSession from "./InputSymbolPerSession";

const FormModalAccuracyTest: React.FC<FormModalAccuracyTestProps> = ({
    isOpen,
    onClose,
    title: modalTitle,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { selectedTryoutId } = useTryoutStore();
    const { selectedTryoutSectionId, availableTryoutSections } = useTryoutSectionStore();
    const [code, setCode] = useState<string>(initialValues?.code ?? "");
    const [title, setTitle] = useState<string>(initialValues?.title ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [numberOfSessions, setNumberOfSessions] = useState<string>(initialValues?.numberOfSessions ?? "");
    const [duration, setDuration] = useState<string>(initialValues?.duration ?? "");
    const [data, setData] = useState<any>(initialValues?.data ?? { symbols: [] });
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);
    const [order, setOrder] = useState<number>(initialValues?.order ?? 0);

    useEffect(() => {
        setCode(initialValues?.code ?? "");
        setTitle(initialValues?.title ?? "");
        setType(initialValues?.type ?? "");
        setNumberOfSessions(initialValues?.numberOfSessions ?? "");
        setDuration(initialValues?.duration ?? "");
        setIsActive(initialValues?.isActive ?? true);
        setOrder(initialValues?.order ?? 0);
        setData(initialValues?.data ?? { symbols: [] });
    }, [initialValues]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const checkEmptySymbols = data.symbols.every((symbol: string) => symbol !== "");
        if (
            !code ||
            !title ||
            !type ||
            Number(numberOfSessions) <= 0 ||
            selectedTryoutId === "" ||
            selectedTryoutSectionId === "" ||
            Number(duration) <= 0 ||
            order < 1 ||
            (type === "accuracy_symbol" && (!checkEmptySymbols || data.symbols.length < 1))
        ) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({
                title,
                code,
                type,
                numberOfSessions,
                duration,
                tryoutSectionId: selectedTryoutSectionId,
                isActive,
                data,
                order,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDurationChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (regex.test(inputValue)) {
            setDuration(inputValue);
        }
    };

    const handleBlurDuration = () => {
        if (duration === "") {
            setDuration("0");
        }
    };

    const handleNumberOfSessionsChange = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (regex.test(inputValue)) {
            const newNumber = String(inputValue);
            setNumberOfSessions(newNumber);
            setData((prev: any) => ({
                ...prev,
                symbols:
                    newNumber > prev.symbols.length
                        ? [...prev.symbols, ...Array(Number(newNumber) - prev.symbols.length).fill("")]
                        : prev.symbols.slice(0, newNumber),
            }));
        }
    };

    const handleBlurNumberOfSessions = () => {
        if (duration === "") {
            setNumberOfSessions("0");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} isLoading={isLoading} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
                <SelectTryout />
                {availableTryoutSections.length > 0 && <SelectTryoutSection />}
                <div className="mb-4">
                    <label htmlFor="code" className="block mb-1 text-xs font-medium text-gray-600">
                        Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
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
                        <option value="">Select Type</option>
                        <option value="arithmetic_pauli">Arithmetic Pauli</option>
                        <option value="accuracy_symbol">Accuracy Symbol</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="numberOfSessions" className="block mb-1 text-xs font-medium text-gray-600">
                        Number of Sessions *
                    </label>
                    <input
                        id="numberOfSessions"
                        type="number"
                        onBlur={handleBlurNumberOfSessions}
                        value={numberOfSessions}
                        onChange={handleNumberOfSessionsChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block mb-1 text-xs font-medium text-gray-600">
                        Durasi per Sesi (minutes) *
                    </label>
                    <input
                        id="duration"
                        type="number"
                        onBlur={handleBlurDuration}
                        value={duration}
                        onChange={handleDurationChange}
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
                        onChange={handleIsActiveChange}
                        className="w-full px-4 py-1 border text-xs rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                {type === "accuracy_symbol" && (
                    <InputSymbolPerSession numberOfSessions={Number(numberOfSessions)} data={data} setData={setData} />
                )}
            </form>
        </Modal>
    );
};

export default FormModalAccuracyTest;
