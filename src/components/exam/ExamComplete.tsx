import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useExamStore } from "../../stores/examStore";

export const ExamComplete = () => {
    const { currentExam } = useExamStore();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-8 text-center h-screen"
        >
            <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Selamat! Anda telah menyelesaikan Ujian {currentExam?.data?.title}
            </h2>
            <p className="text-gray-600 mb-8">Terima kasih telah mengikuti ujian ini. Hasil akan segera diproses.</p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8 md:mx-52">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ringkasan Nilai</h3>
                <div className="space-y-5 overflow-y-scroll max-h-64 p-5">
                    {Object.keys(currentExam?.data?.totalScores).map((key) => (
                        <div key={key} className="flex justify-between">
                            <span>{currentExam.data.totalScores[key]['title']}</span>
                            <span className="font-medium">{currentExam.data.totalScores[key]['score']}</span>
                        </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{currentExam?.data?.allTotalScores}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => location.href = '/'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Kembali ke Dashboard
            </button>
        </motion.div>
    );
};
