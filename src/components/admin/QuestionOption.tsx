/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionProps } from "../../types/question";

const QuestionOption: React.FC<OptionProps> = ({ data, setData }) => {
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

    const handleImageChange = (key: string, value: string | null) => {
        const updatedOptions = data.options.map((option) =>
            option.key === key ? { ...option, image: value } : option
        );
        setData({ ...data, options: updatedOptions });
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
                    {option.image && (
                        <div className="w-full flex justify-center mb-4">
                            <img src={option.image} alt="option" className="max-h-40" />
                        </div>
                    )}
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
                            <label className="block text-xs font-medium text-gray-600 w-full md:w-auto">
                                Image URL:{" "}
                                <input
                                    type="text"
                                    value={option.image ?? ""}
                                    onChange={(e) => handleImageChange(option.key, e.target.value)}
                                    className="mt-1 sm:mt-0 ml-2 px-2 py-1 border rounded-md text-xs md:w-auto w-full"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionOption;
