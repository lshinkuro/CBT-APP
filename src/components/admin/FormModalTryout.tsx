/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { FormModalTryoutProps } from "../../types/tryout";
import { toast } from "react-hot-toast";
import useProgramStore from "../../stores/programStore";
import SelectProgram from "./SelectProgram";

const FormModalTryout: React.FC<FormModalTryoutProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
}) => {
    const { selectedProgramId } = useProgramStore();
    const [startDate, setStartDate] = useState<string>(initialValues?.startDate ?? "");
    const [endDate, setEndDate] = useState<string>(initialValues?.endDate ?? "");
    const [code, setCode] = useState<string>(initialValues?.code ?? "");
    const [titleTryout, setTitleTryout] = useState<string>(initialValues?.title ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [instruction, setInstruction] = useState<string>(initialValues?.instruction ?? "");
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);
    const [duration, setDuration] = useState<string>(initialValues?.duration ?? "");

    useEffect(() => {
        setStartDate(initialValues?.startDate ?? "");
        setEndDate(initialValues?.endDate ?? "");
        setCode(initialValues?.code ?? "");
        setTitleTryout(initialValues?.title ?? "");
        setDescription(initialValues?.description ?? "");
        setInstruction(initialValues?.instruction ?? "");
        setIsActive(initialValues?.isActive ?? true);
        setDuration(initialValues?.duration ?? "");
    }, [initialValues]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitleTryout(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!titleTryout || !startDate || !instruction || !endDate || !code || selectedProgramId === "" || Number(duration) <= 0) {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({
                startDate,
                endDate,
                code,
                title: titleTryout,
                description,
                isActive,
                programId: selectedProgramId,
                instruction,
                duration,
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

    const handleBlur = () => {
        if (duration === "") {
            setDuration("0");
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
                <SelectProgram />
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
                    <label htmlFor="duration" className="block mb-1 text-xs font-medium text-gray-600">
                        Durasi per Sesi (minutes) *
                    </label>
                    <input
                        id="duration"
                        type="number"
                        onBlur={handleBlur}
                        value={duration}
                        onChange={handleDurationChange}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <SectionInstruction instruction={instruction} setInstruction={setInstruction} />
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

interface SectionInstructionProps {
    instruction: string;
    setInstruction: (value: string) => void;
}

const SectionInstruction: React.FC<SectionInstructionProps> = ({ instruction, setInstruction }) => {
    const [quill, setQuill] = useState<any>(null);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
        script.onload = () => {
            const Quill = (window as any).Quill;
            const quillInstance = new Quill("#instruction-editor", {
                theme: "snow",
            });
            setQuill(quillInstance);
            const quillToolbar = document.querySelectorAll(".ql-toolbar");
            if (quillToolbar.length > 1) {
                Array.from(quillToolbar)
                    .slice(0, -1)
                    .forEach((el) => el.remove());
            }
            const imageButton = document.querySelector(".ql-image");
            const videoButton = document.querySelector(".ql-video");
            if (imageButton) {
                imageButton.remove();
            }
            if (videoButton) {
                videoButton.remove();
            }
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(instruction);
            quill.on("text-change", () => {
                setInstruction(quill.root.innerHTML);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill]);

    return (
        <div className="mb-4">
            <label htmlFor="instruction" className="block mb-1 text-xs font-medium text-gray-600">
                Instruction *
            </label>
            <div id="instruction-editor" className="w-full" />
        </div>
    );
};

export default FormModalTryout;
