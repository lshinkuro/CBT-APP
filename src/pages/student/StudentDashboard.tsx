import { useEffect, useState } from "react";
import { ExamSearch } from "../../components/dashboard/ExamSearch";
import { ExamCard } from "../../components/ExamCard";
import useProgramStore from "../../stores/programStore";
import EmptyResource from "./EmptyResource";

export interface Exam {
    title: string;
    description: string;
    to: string;
}

export const StudentDashboard = () => {
    const { getAllAvailablePrograms, availablePrograms } = useProgramStore();
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (availablePrograms.length < 1) getAllAvailablePrograms();
    }, [availablePrograms, getAllAvailablePrograms]);

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

    return (
        <div className="min-h-screen p-8 bg-gray-100 mt-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pilih Program</h1>
            <ExamSearch onSearch={setSearchQuery} />
            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
