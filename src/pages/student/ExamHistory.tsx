/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useExamStore } from "../../stores/examStore";

export const ExamHistory = () => {
    const { getAllExams, exams, limit, offset, search } = useExamStore();
    const [filteredExams, setFilteredExams] = useState(exams);

    useEffect(() => {
        getAllExams({ search, limit, offset });
    }, [search, limit, offset, getAllExams]);

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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Riwayat Ujian</h2>
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
                        filteredExams.map((exam: { id: string; code: string; type: string; data: any, title: string }) => (
                            <motion.div
                                key={exam.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-lg p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{exam.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Waktu Submit : {new Intl.DateTimeFormat("id-ID", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            }).format(new Date(exam.data.submitTime))}
                                        </p>
                                    </div>

                                    {/* Score */}
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-600">
                                            {exam.data.allTotalScores}
                                        </div>
                                        <p className="text-sm text-gray-500">Nilai Total</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Tidak ada data ujian yang ditemukan.</p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-8">
                    <button
                        className={`px-6 py-2 text-sm font-medium rounded-md ${
                            offset > 0
                                ? "text-white bg-blue-600 hover:bg-blue-700"
                                : "text-gray-400 bg-gray-200 cursor-not-allowed"
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
