import { useEffect, useState } from "react";
import { ExamSearch } from "../../components/dashboard/ExamSearch";
import { ExamCard } from "../../components/ExamCard";
import useTryoutSectionStore from "../../stores/tryoutSectionStore";
import { useParams } from "react-router-dom";

export interface Exam {
    title: string;
    description: string;
    to: string;
}

const CardTryoutSection = () => {
    const { id = "" } = useParams<{ id: string }>();
    const { getAllAvailableTryoutSectionsByTryoutId, availableTryoutSections } = useTryoutSectionStore();
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        if (availableTryoutSections.length < 1) getAllAvailableTryoutSectionsByTryoutId(id);
    }, [availableTryoutSections, getAllAvailableTryoutSectionsByTryoutId, id]);

    const exams: Exam[] = availableTryoutSections.map((tryoutSection) => ({
        title: tryoutSection.title,
        description: tryoutSection.description,
        to: `/instruction/${tryoutSection.code}`,
    }));

    const filteredExams = exams.filter(
        (exam) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8 bg-gray-100 mt-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pilih Jenis Ujian</h1>
            <ExamSearch onSearch={setSearchQuery} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredExams.map((exam, index) => (
                    <ExamCard key={exam.title} {...exam} delay={index * 0.1} />
                ))}
            </div>
        </div>
    );
};

export default CardTryoutSection;
