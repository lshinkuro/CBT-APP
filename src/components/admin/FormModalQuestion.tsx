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
import { Trash } from "lucide-react";
import useQuestionStore from "../../stores/questionStore";

const FormModalQuestion: React.FC<FormModalQuestionProps> = ({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading,
    initialValues,
    mode,
}) => {
    const { selectedTryoutId } = useTryoutStore();
    const { selectedTryoutSectionId, availableTryoutSections } = useTryoutSectionStore();
    const [content, setContent] = useState<string>(initialValues?.content ?? "");
    const [type, setType] = useState<string>(initialValues?.type ?? "");
    const [image, setImage] = useState<string | null>(initialValues?.image ?? null);
    const [imageObject, setImageObject] = useState<File | null>(null);
    const [data, setData] = useState<any>(initialValues?.data ?? MockData);
    const [isActive, setIsActive] = useState<boolean>(initialValues?.isActive ?? true);
    const [showImage, setShowImage] = useState<string | null>(initialValues?.image ?? null);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<string>(
        initialValues?.data?.numberOfCorrectAnswers ?? "1"
    );

    useEffect(() => {
        setContent(initialValues?.content ?? "");
        setType(initialValues?.type ?? "");
        setImage(initialValues?.image ?? null);
        setShowImage(initialValues?.image ?? null);
        setImageObject(null);
        setData(initialValues?.data ?? MockData);
        setIsActive(initialValues?.isActive ?? true);
        setNumberOfCorrectAnswers(initialValues?.data?.numberOfCorrectAnswers ?? "1");
        useQuestionStore.setState({ hasChangeImage: false });
        useQuestionStore.setState({
            hasChangeImageOptions: {
                a: false,
                b: false,
                c: false,
                d: false,
                e: false,
            },
        });
    }, [initialValues]);

    useEffect(() => {
        const hasChangeImage = useQuestionStore.getState().hasChangeImage;
        if (mode === "create") {
            setShowImage(image);
        } else if (mode === "update" && hasChangeImage) {
            setShowImage(image);
        } else {
            setShowImage(image ? import.meta.env.VITE_APP_API_BASE_URL + image : null);
        }
    }, [image, mode]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const file = inputElement.files?.[0];
        if (file) {
            if (file.size <= 5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageObject(file);
                    setImage(event.target?.result as string);
                    useQuestionStore.setState({ hasChangeImage: true });
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("File size must be less than 5MB");
                if (inputElement) {
                    inputElement.value = "";
                }
            }
        }
    };
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIsActive(e.target.value === "true");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content || !type || selectedTryoutId === "" || selectedTryoutSectionId === "") {
            toast.error("Missing required fields");
            return;
        }
        try {
            await onSubmit({
                content,
                type,
                image,
                imageObject,
                data,
                isActive,
                tryoutSectionId: selectedTryoutSectionId,
            });
            setShowImage(null);
            setImage(null);
            setImageObject(null);
            setData(MockData);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeNumberOfCorrectAnswers = (e: { target: { value: any } }) => {
        const inputValue = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (regex.test(inputValue)) {
            setData((prevState: any) => ({ ...prevState, numberOfCorrectAnswers: inputValue }));
        }
    };

    const handleBlur = () => {
        if (numberOfCorrectAnswers === "") {
            setNumberOfCorrectAnswers("0");
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
                    <div className="flex items-center justify-center mb-2">
                        {showImage ? (
                            <img src={showImage} alt="Selected" className="max-w-[50%] h-auto rounded-md" />
                        ) : (
                            <div className="bg-gray-200 rounded-md h-[100px] w-full flex items-center justify-center">
                                <p className="text-gray-500 text-xs">No image selected</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setImage(null);
                                setShowImage(null);
                                setImageObject(null);
                                useQuestionStore.setState({ hasChangeImage: true });
                                const inputElement = document.getElementById("image") as HTMLInputElement;
                                if (inputElement) {
                                    inputElement.value = "";
                                }
                            }}
                            className="text-red-500 hover:text-red-700 text-sm font-semibold ml-2"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="numberOfCorrectAnswer" className="block mb-1 text-xs font-medium text-gray-600">
                        Number of Correct Answer *
                    </label>
                    <input
                        id="numberOfCorrectAnswer"
                        type="number"
                        value={data?.numberOfCorrectAnswers ?? ""}
                        onBlur={handleBlur}
                        onChange={handleChangeNumberOfCorrectAnswers}
                        className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="data" className="block mb-1 text-xs font-medium text-gray-600">
                        Data
                    </label>
                    <QuestionOption setData={setData} data={data} mode={mode} />
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
