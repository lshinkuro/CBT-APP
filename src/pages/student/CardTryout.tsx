import { useEffect, useRef, useState } from "react";
import { ExamSearch } from "../../components/dashboard/ExamSearch";
import { ExamCard } from "../../components/ExamCard";
import { useParams } from "react-router-dom";
import useTryoutStore from "../../stores/tryoutStore";
import EmptyResource from "./EmptyResource";
import Loading from "../../components/loading/Loading";

export interface Exam {
    title: string;
    description: string;
    to: string;
}

const CardTryout = () => {
    const { id = "" } = useParams<{ id: string }>();
    const { getAllAvailableTryoutsByProgramId, availableTryouts, isLoading } = useTryoutStore();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const hasGenerateTryouts = useRef(false);

    useEffect(() => {
        if (!hasGenerateTryouts.current) {
            getAllAvailableTryoutsByProgramId(id);
            hasGenerateTryouts.current = true;
        }
    }, [availableTryouts, getAllAvailableTryoutsByProgramId, id]);

    const exams: Exam[] = availableTryouts.map((tryout) => ({
        title: tryout.title,
        description: tryout.description,
        to: `/instruction/${tryout.code}`,
    }));

    const filteredExams = exams.filter(
        (exam) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen p-8 bg-gray-100 mt-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pilih Jenis Tryout</h1>
            <ExamSearch onSearch={setSearchQuery} />
            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredExams.map((exam, index) => (
                        <ExamCard key={exam.title} {...exam} delay={index * 0.1} />
                    ))}
                </div>
            ) : (
                <EmptyResource />
            )}
        </div>
    );
};

export default CardTryout;
