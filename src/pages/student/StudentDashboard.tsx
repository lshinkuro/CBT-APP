import { useEffect, useRef, useState } from "react";
import { ExamSearch } from "../../components/dashboard/ExamSearch";
import { ExamCard } from "../../components/ExamCard";
import useProgramStore from "../../stores/programStore";
import EmptyResource from "./EmptyResource";
import Loading from "../../components/loading/Loading";
import useExamStore from "../../stores/examStore";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Exam {
    title: string;
    description: string;
    to: string;
}

export const StudentDashboard = () => {
    const { getAllAvailablePrograms, availablePrograms, isLoading } = useProgramStore();
    const { checkCurrentProgressExam, isProgressExam } = useExamStore();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const hasGeneratePrograms = useRef(false);

    useEffect(() => {
        if (!hasGeneratePrograms.current) {
            checkCurrentProgressExam();
            getAllAvailablePrograms();
            hasGeneratePrograms.current = true;
        }
    }, [checkCurrentProgressExam, getAllAvailablePrograms]);

    const exams: Exam[] = availablePrograms.map((program) => ({
        title: program.title,
        description: program.description,
        to: `/tryout/${program.id}`,
    }));

    const filteredExams = exams.filter(
        (exam) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white py-8 px-6">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Pilih Program</h1>
            <ExamSearch onSearch={setSearchQuery} />
            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {isProgressExam && (
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                                Ada ujian yang sedang berlangsung
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Anda memiliki ujian yang sedang berlangsung.
                            </p>
                            <Link
                                to="/exam/running"
                                className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-emerald-600 transition"
                            >
                                Lanjutkan <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    )}
                    {filteredExams.map((exam, index) => (
                        <ExamCard
                            key={exam.title}
                            {...exam}
                            delay={index * 0.1}
                            textButton="Select Program"
                        />
                    ))}
                </div>
            ) : (
                <EmptyResource />
            )}
        </div>
    );
};
