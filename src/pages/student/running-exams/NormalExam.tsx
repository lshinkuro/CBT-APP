/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExamHeader } from "../../../components/exam/ExamHeader";
import { QuestionView } from "../../../components/exam/QuestionView";

export default function NormalExam({ currentExam }: any) {
    return (
        <>
            <ExamHeader title={currentExam?.title} examId={currentExam?.id} />
            <div className="mt-6">
                <div className="mt-6">
                    <QuestionView />
                </div>
            </div>
        </>
    );
}
