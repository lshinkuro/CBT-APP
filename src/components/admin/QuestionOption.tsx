/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { OptionProps } from "../../types/question";
import toast from "react-hot-toast";
import useQuestionStore from "../../stores/questionStore";
import { Trash } from "lucide-react";

const QuestionOption: React.FC<OptionProps> = ({ data, setData, mode }) => {
    const [showImageOptions, setShowImageOptions] = useState<Record<string, string | null>>(
        data?.options?.reduce(
            (acc, option) => ({
                ...acc,
                [option.key]: option.image ?? null,
            }),
            {}
        )
    );
    useEffect(() => {
        const hasChangeImageOptions = useQuestionStore.getState().hasChangeImageOptions;
        const newShowImageOptions = {} as Record<string, string | null>;
        for (const key in hasChangeImageOptions) {
            if (mode === "create" || (mode === "update" && hasChangeImageOptions[key])) {
                newShowImageOptions[key] = data?.options?.find((option) => option.key === key)?.image ?? null;
            } else {
                newShowImageOptions[key] = data?.options?.find((option) => option.key === key)?.image
                    ? import.meta.env.VITE_APP_API_BASE_URL + data?.options?.find((option) => option.key === key)?.image
                    : null;
            }
        }
        setShowImageOptions(newShowImageOptions);
    }, [data?.options, mode]);
    
    const handleScoreChange = (key: string, value: number) => {
        const updatedOptions = data.options.map((option) =>
            option.key === key ? { ...option, score: value } : option
        );
        setData({ ...data, options: updatedOptions });
    };

    const handleCorrectChange = (key: string, value: boolean) => {
        const updatedOptions = data.options.map((option) =>
            option.key === key ? { ...option, correct: value } : option
        );
        setData({ ...data, options: updatedOptions });
    };

    const handleImageChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const file = inputElement.files?.[0];
        if (file) {
            if (file.size <= 5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const updatedOptions = data.options.map((option) =>
                        option.key === key
                            ? { ...option, image: event.target?.result as string, imageObject: file }
                            : option
                    );
                    setData({ ...data, options: updatedOptions });
                    useQuestionStore.setState((prevState) => ({
                        hasChangeImageOptions: {
                            ...prevState.hasChangeImageOptions,
                            [key]: true,
                        },
                    }));
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

    const handleContentChange = (key: string, value: string) => {
        const updatedOptions = data.options.map((option) =>
            option.key === key ? { ...option, content: value } : option
        );
        setData({ ...data, options: updatedOptions });
    };

    return (
        <div className="space-y-4">
            {data.options.map((option) => (
                <div className="border p-4 rounded-md shadow-sm" key={option.key}>
                    <div className="flex items-center justify-center mb-2">
                        {showImageOptions[option.key] ? (
                            <img
                                src={showImageOptions[option.key] as string}
                                alt="Selected"
                                className="max-w-[50%] h-auto rounded-md"
                            />
                        ) : (
                            <div className="bg-gray-200 rounded-md h-[100px] w-full flex items-center justify-center">
                                <p className="text-gray-500 text-xs">No image selected</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                            <label className="block text-xs font-medium text-gray-600 w-full md:w-auto">
                                Key:{" "}
                                <input
                                    type="text"
                                    value={option.key}
                                    className="mt-1 sm:mt-0 ml-2 px-2 py-1 border rounded-md text-xs sm:w-24 w-full"
                                    required
                                    disabled
                                />
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                            <label className="block text-xs font-medium text-gray-600 w-full md:w-auto">
                                Content:{" "}
                                <input
                                    type="text"
                                    value={option.content}
                                    onChange={(e) => handleContentChange(option.key, e.target.value)}
                                    className="mt-1 sm:mt-0 ml-2 px-2 py-1 border rounded-md text-xs sm:w-40 w-full"
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                            <label className="block text-xs font-medium text-gray-600 w-full md:w-auto">
                                Score:{" "}
                                <input
                                    type="number"
                                    value={option.score}
                                    onChange={(e) => handleScoreChange(option.key, Number(e.target.value))}
                                    className="mt-1 sm:mt-0 ml-2 px-2 py-1 border rounded-md text-xs sm:w-16 w-full"
                                    min={0}
                                />
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                            <label className="block text-xs font-medium text-gray-600 w-full md:w-auto">
                                Correct:{" "}
                                <select
                                    value={option.correct ? "true" : "false"}
                                    onChange={(e) => handleCorrectChange(option.key, e.target.value === "true")}
                                    className="mt-1 sm:mt-0 ml-2 px-2 py-1 border rounded-md text-xs md:w-auto w-full"
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                            <label
                                htmlFor={"image-" + option.key}
                                className="block text-xs font-medium text-gray-600 w-full md:w-auto"
                            >
                                Image URL:
                            </label>
                            <input
                                id={"image-" + option.key}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(option.key, e)}
                                className="w-full px-4 py-1 text-xs border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowImageOptions((prev) => ({ ...prev, [option.key]: null }));
                                    setData({
                                        ...data,
                                        options: data.options.map((o) =>
                                            o.key === option.key ? { ...o, image: null, imageObject: null } : o
                                        ),
                                    });
                                    useQuestionStore.setState((prevState) => ({
                                        hasChangeImageOptions: {
                                            ...prevState.hasChangeImageOptions,
                                            [option.key]: true,
                                        },
                                    }));
                                    const inputElement = document.getElementById(
                                        "image-" + option.key
                                    ) as HTMLInputElement;
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
                </div>
            ))}
        </div>
    );
};

export default QuestionOption;
