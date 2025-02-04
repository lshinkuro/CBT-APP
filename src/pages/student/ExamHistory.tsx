/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useExamStore from "../../stores/examStore";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useQuestionStore from "../../stores/questionStore";
import { Exam } from "../../types/exam";

export const ExamHistory = () => {
    const navigate = useNavigate();
    const { getAllExamsByStudentId, exams, limit, offset, search } = useExamStore();
    const [filteredExams, setFilteredExams] = useState(exams);

    useEffect(() => {
        getAllExamsByStudentId({ search, limit, offset });
    }, [search, limit, offset, getAllExamsByStudentId]);

    useEffect(() => {
        const filtered = exams.filter((exam: { title: string }) =>
            exam.title.toLowerCase().includes(search?.toLowerCase() ?? "")
        );
        setFilteredExams(filtered);
    }, [exams, search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        useExamStore.setState({ search: e.target.value, offset: 0 });
    };

    const handlePagination = (type: string) => {
        if (type === "prev" && offset > 0) {
            useExamStore.setState({ offset: offset - limit });
        } else if (type === "next" && filteredExams.length === limit) {
            useExamStore.setState({ offset: offset + limit });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white py-8">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white mb-8">Riwayat Ujian</h2>
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Cari ujian berdasarkan kode..."
                        value={search ?? ""}
                        onChange={handleSearch}
                    />
                </div>
                <div className="space-y-6">
                    {filteredExams.length > 0 ? (
                        filteredExams.map((exam: Exam) => {
                            const groupedScores: any = Object.values(exam?.data?.totalScores).reduce(
                                (acc: any, item: any) => {
                                    const { title, session, score } = item;
                                    const titleTest = title.split("-")[0];
                                    if (!acc[titleTest]) {
                                        acc[titleTest] = [];
                                    }
                                    if (session) {
                                        acc[titleTest].push(`Sesi ${session} = ${score}`);
                                    } else {
                                        acc[titleTest].push(`${score}`);
                                    }

                                    return acc;
                                },
                                {}
                            );
                            return (
                                <motion.div
                                    key={exam.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-white rounded-lg shadow-lg p-6 ${
                                        exam.data.normalTestsStatus === "progress" ||
                                        exam.data.symbolTestsStatus === "progress"
                                            ? "bg-blue-200"
                                            : ""
                                    }`}
                                >
                                    <div className="flex justify-between items-start font-bold">
                                        <div>
                                            <h3 className="text-xl font-semibold text-black">{exam.title}</h3>
                                            <p className="text-md text-black mt-1 mb-1">
                                                Waktu Submit :{" "}
                                                {new Intl.DateTimeFormat("id-ID", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                }).format(new Date(exam.data.submitTime))}
                                            </p>
                                            {Object.entries<string[]>(groupedScores).map(([title, scores]) => (
                                                <div key={title}>
                                                    <span className="font-semibold">{title}:</span>{" "}
                                                    <span>{scores.join(", ")}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Score */}
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-blue-600">
                                                {exam.data.allTotalScores}
                                            </div>
                                            <p className="text-sm text-black">Nilai Total</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        {exam.data.normalTestsStatus && exam.data.normalTestsStatus === "progress" && (
                                            <button
                                                className="px-6 py-2 text-sm font-medium flex items-center rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                onClick={() => {
                                                    useExamStore.setState({
                                                        isReadIstruction: true,
                                                        mode: "normal",
                                                        isContinueExam: true,
                                                        currentExam: exam,
                                                    });
                                                    useQuestionStore.setState({ examQuestions: exam.data.questions });
                                                    navigate(`/starting-exam?code=${exam.tryout.code}&mode=normal`);
                                                }}
                                            >
                                                <Rocket className="mr-2" />
                                                Mulai Ujian Normal
                                            </button>
                                        )}
                                        {exam.data.symbolTestsStatus && exam.data.symbolTestsStatus === "progress" && (
                                            <button
                                                className="px-6 py-2 text-sm font-medium flex items-center rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                onClick={() => {
                                                    useExamStore.setState({
                                                        isReadIstruction: true,
                                                        mode: "accuracy_symbol",
                                                        isContinueExam: true,
                                                        currentExam: exam,
                                                    });
                                                    useQuestionStore.setState({
                                                        examQuestions: exam.data.questions,
                                                    });
                                                    navigate(
                                                        `/starting-exam?code=${exam.tryout.code}&mode=accuracy_symbol`
                                                    );
                                                }}
                                            >
                                                <Rocket className="mr-2" />
                                                Mulai Ujian Akurasi
                                            </button>
                                        )}
                                        {exam.data.pauliTestsStatus && exam.data.pauliTestsStatus === "progress" && (
                                            <button
                                                className="px-6 py-2 text-sm font-medium flex items-center rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                onClick={() => {
                                                    useExamStore.setState({
                                                        isReadIstruction: true,
                                                        mode: "arithmetic_pauli",
                                                        isContinueExam: true,
                                                        currentExam: exam,
                                                    });
                                                    useQuestionStore.setState({
                                                        examQuestions: exam.data.questions,
                                                    });
                                                    navigate(
                                                        `/starting-exam?code=${exam.tryout.code}&mode=arithmetic_pauli`
                                                    );
                                                }}
                                            >
                                                <Rocket className="mr-2" />
                                                Mulai Ujian Aritmatika
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <p className="text-center text-black">Tidak ada data ujian yang ditemukan.</p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-8">
                    <button
                        className={`px-6 py-2 text-sm font-medium rounded-md ${
                            offset > 0
                                ? "text-white bg-blue-600 hover:bg-blue-700"
                                : "text-black bg-gray-200 cursor-not-allowed"
                        }`}
                        onClick={() => handlePagination("prev")}
                        disabled={offset <= 0}
                    >
                        Prev
                    </button>
                    <span className="px-4 text-gray-500 text-sm font-medium">
                        {offset + 1} &mdash; {Math.min(offset + limit, filteredExams.length)}
                    </span>
                    <button
                        className={`px-6 py-2 text-sm font-medium rounded-md ${
                            filteredExams.length === limit
                                ? "text-white bg-blue-600 hover:bg-blue-700"
                                : "text-gray-400 bg-gray-200 cursor-not-allowed"
                        }`}
                        onClick={() => handlePagination("next")}
                        disabled={filteredExams.length < limit}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
