import { useEffect, useRef } from "react";
import { ExamHeader } from "../../components/exam/ExamHeader";
import { QuestionView } from "../../components/exam/QuestionView";
import { useExamStore } from "../../stores/examStore";
import { ExamComplete } from "../../components/exam/ExamComplete";

export const ExamRunning = () => {
    const { currentExam, getCurrentExamByStudentId, isExamComplete } = useExamStore();
    const hasFetchedExam = useRef(false);

    useEffect(() => {
        if (!hasFetchedExam.current) {
            getCurrentExamByStudentId();
            hasFetchedExam.current = true;
        }
    }, [currentExam, getCurrentExamByStudentId]);

    if (isExamComplete) return <ExamComplete />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <ExamHeader title={currentExam?.title} examId={currentExam?.id} />
                <div className="mt-6">
                    <div className="mt-6">
                        <QuestionView />
                    </div>
                </div>
            </div>
        </div>
    );
};
