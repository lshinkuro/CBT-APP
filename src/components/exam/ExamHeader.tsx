import { motion } from "framer-motion";
import { ExamTimer } from "./ExamTimer";
import { useExamStore } from "../../stores/examStore";
import Loading from "../loading/Loading";
import useQuestionStore from "../../stores/questionStore";

interface ExamHeaderProps {
    title: string;
    examId: string;
}

export const ExamHeader = ({ title, examId }: ExamHeaderProps) => {
    const { currentExam, nextQuestion } = useExamStore();
    const { examQuestions } = useQuestionStore();

    const endDate = currentExam?.endDate;
    let duration = 0;

    if (endDate) {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        duration = Math.max(0, Math.floor((end - now) / 1000));
    }

    if (!currentExam) return <Loading />;
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <p className="text-gray-600">Code Try Out: {examId}</p>
                </div>
                <ExamTimer
                    key={duration}
                    duration={duration}
                    onTimeUp={() => {
                        useQuestionStore.setState({ currentQuestion: examQuestions.length });
                        nextQuestion();
                        location.reload();
                    }}
                />
            </div>
        </motion.div>
    );
};
