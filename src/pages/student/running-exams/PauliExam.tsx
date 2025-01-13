/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ExamTimer } from "../../../components/exam/ExamTimer";

export default function PauliExam({ currentExam }: any) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Accuracy Symbol</h1>
                        {/* <p className="text-gray-600">Code Try Out: {currentExam?.id}</p>
                        <p className="text-gray-600">Sesi ke: {currentSession}</p>
                        <p className="text-gray-600">Jumlah Sesi: {numberOfSessions}</p>
                        <p className="text-gray-600">Jumlah Terjawab Sesi ini: {totalAnswerCurrentSession}</p> */}
                    </div>
                    {/* <ExamTimer key={duration} duration={duration} onTimeUp={handleTimeUp} /> */}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md"
            >
                <div className="flex flex-col md:flex-row justify-center items-center min-h-96 bg-white">
                    <div className="md:w-1/2 md:flex md:items-center md:justify-center md:px-12">
                        <div className="text-4xl font-bold text-black md:text-6xl">3 + 8</div>
                    </div>
                    <div className="md:w-1/2 md:flex md:flex-wrap md:justify-center md:px-12">
                        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-5">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((number) => (
                                <button
                                    key={number}
                                    className="w-16 h-16 text-xl font-semibold bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
