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
        <div className="min-h-screen p-8 bg-gray-50 mt-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pilih Program</h1>
            <ExamSearch onSearch={setSearchQuery} />
            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {isProgressExam && (
                        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ada ujian yang sedang berlangsung</h3>
                            <p className="text-gray-600 mb-4">Anda memiliki ujian yang sedang berlangsung.</p>
                            <Link to="/exam/running" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Lanjutkan <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    )}
                    {filteredExams.map((exam, index) => (
                        <ExamCard key={exam.title} {...exam} delay={index * 0.1} textButton="Select Program" />
                    ))}
                </div>
            ) : (
                <EmptyResource />
            )}
        </div>
    );
};
