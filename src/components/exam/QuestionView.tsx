import { motion } from "framer-motion";
import { useExamStore } from "../../stores/examStore";
import { QuestionGrid } from "./QuestionGrid";
import useQuestionStore from "../../stores/questionStore";
import { useEffect } from "react";
import Loading from "../loading/Loading";

export const QuestionView = () => {
    const { setAnswer, nextQuestion, goToQuestion, currentExam, isExamComplete } = useExamStore();
    const { currentQuestion, currentQuestionData, examQuestions, getQuestionById } = useQuestionStore();

    useEffect(() => {
        if (
            examQuestions &&
            examQuestions.length > 0 &&
            currentQuestion >= 0 &&
            currentQuestion < examQuestions.length
        ) {
            getQuestionById(examQuestions[currentQuestion].id);
        }
    }, [currentQuestion, examQuestions, getQuestionById]);

    const handleOptionSelect = (optionKey: string) => {
        let answers = currentExam?.data?.questions[currentQuestion]["answers"];
        if (currentExam?.data?.questions[currentQuestion]["answers"].includes(optionKey)) {
            answers = currentExam?.data?.questions[currentQuestion]["answers"].filter(
                (option: string) => option !== optionKey
            );
        } else {
            if (answers.length >= Number(currentQuestionData?.data?.numberOfCorrectAnswers)) return;
            answers.push(optionKey);
        }
        setAnswer({
            questionId: currentQuestionData?.id,
            answers,
        });
    };

    if (
        !currentQuestionData ||
        !currentExam ||
        examQuestions.length === 0 ||
        currentQuestion >= examQuestions.length ||
        isExamComplete
    )
        return <Loading />;

    return (
        <div className="space-y-6">
            <motion.div
                key={currentQuestionData?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
            >
                <div className="mb-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        Soal {currentQuestion + 1}/{examQuestions.length} | {currentQuestionData?.tryoutSection?.title}
                    </span>
                </div>

                <div className="space-y-6">
                    <div className="text-gray-800 text-lg">{currentQuestionData?.content}</div>

                    {currentQuestionData?.image && (
                        <img
                            src={currentQuestionData.image}
                            alt="Question illustration"
                            className="max-w-full rounded-lg"
                        />
                    )}

                    <div className="space-y-3">
                        {currentQuestionData?.data?.options.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => handleOptionSelect(option.key)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    currentExam?.data?.questions[currentQuestion]["answers"].includes(option.key)
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current text-sm font-medium">
                                        {option.key.toUpperCase()}
                                    </span>
                                    <span>{option.content}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between pt-6">
                        <button
                            onClick={() => goToQuestion(currentQuestion - 1)}
                            disabled={currentQuestion === 0}
                            className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={() => nextQuestion()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {currentQuestion === examQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
                        </button>
                    </div>
                </div>
            </motion.div>

            <QuestionGrid />
        </div>
    );
};
