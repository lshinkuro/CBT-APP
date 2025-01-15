import { useEffect, useRef } from "react";
import useExamStore from "../../stores/examStore";
import { ExamComplete } from "../../components/exam/ExamComplete";
import NormalExam from "./running-exams/NormalExam";
import AccuracySymbolExam from "./running-exams/AccuracySymbolExam";
import ErrorPage from "../../components/error/ErrorPage";
import PauliExam from "./running-exams/PauliExam";

export const ExamRunning = () => {
    const { currentExam, getCurrentExamByStudentId, isExamComplete, mode, error } = useExamStore();
    const hasFetchedExam = useRef(false);

    useEffect(() => {
        if (!hasFetchedExam.current) {
            getCurrentExamByStudentId();
            hasFetchedExam.current = true;
        }
    }, [currentExam, getCurrentExamByStudentId]);

    if (error) return <ErrorPage error={error} />;

    if (isExamComplete) return <ExamComplete />;

    if (mode === "normal")
        return (
            <div className="min-h-screen bg-yellow-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <NormalExam currentExam={currentExam} />
                </div>
            </div>
        );
    else if (mode === "accuracy_symbol") {
        return (
            <div className="min-h-screen bg-yellow-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <AccuracySymbolExam currentExam={currentExam} />
                </div>
            </div>
        );
    } else if (mode === "arithmetic_pauli") {
        return (
            <div className="min-h-screen bg-yellow-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <PauliExam currentExam={currentExam} />
                </div>
            </div>
        );
    }
};
