/* eslint-disable @typescript-eslint/no-explicit-any */
import useSymbolStore from "../../../stores/symbolStore";
import { motion } from "framer-motion";
import Loading from "../../../components/loading/Loading";
import { ExamTimer } from "../../../components/exam/ExamTimer";
import { useCallback } from "react";
import { useExamStore } from "../../../stores/examStore";

export default function AccuracySymbolExam({ currentExam }: any) {
    const { setAnswerAccuracySymbol, moveToNextSessionAccuracySymbol, isLoading, timeUp } = useSymbolStore();
    const { isExamComplete } = useExamStore();

    if (isExamComplete) {
        location.reload();
    }

    const currentSymbolQuestion = currentExam?.data?.currentSymbolQuestion;
    const currentSession = currentExam?.data?.currentSession;
    const totalAnswerCurrentSession = currentExam?.data?.totalAnswerCurrentSession;
    const currentSymbolOption = currentExam?.data?.currentSymbolOption;
    const currentAccuracyTestIndex = currentExam?.data?.currentAccuracyTestIndex;
    const numberOfSessions = currentExam?.data?.accuracyTests[currentAccuracyTestIndex].numberOfSessions;
    const code = currentExam?.data?.accuracyTests[currentAccuracyTestIndex].code;
    const liveEndTime = currentExam?.data?.liveEndTimeAccuracyTest;
    let duration = 0;

    if (liveEndTime) {
        const now = new Date().getTime();
        const end = new Date(liveEndTime).getTime();
        duration = Math.max(0, Math.floor((end - now) / 1000));
    }

    const handleTimeUp = useCallback(() => {
        if (!timeUp) {
            useSymbolStore.setState({ timeUp: true });
            moveToNextSessionAccuracySymbol();
        }
    }, [timeUp, moveToNextSessionAccuracySymbol]);

    const handleAnswer = useCallback(
        (symbol: string) => {
            setAnswerAccuracySymbol({ character: symbol, code });
        },
        [setAnswerAccuracySymbol, code]
    );

    if (isLoading) return <Loading />;

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
                        <p className="text-gray-600">Code Try Out: {currentExam?.id}</p>
                        <p className="text-gray-600">Sesi ke: {currentSession}</p>
                        <p className="text-gray-600">Jumlah Sesi: {numberOfSessions}</p>
                        <p className="text-gray-600">Jumlah Terjawab Sesi ini: {totalAnswerCurrentSession}</p>
                    </div>
                    <ExamTimer key={duration} duration={duration} onTimeUp={handleTimeUp} />
                </div>
            </motion.div>
            <Question currentSymbolQuestion={currentSymbolQuestion} />
            <Options duration={duration} currentSymbolOption={currentSymbolOption} handleAnswer={handleAnswer} />
        </>
    );
}

function Question({ currentSymbolQuestion }: Readonly<{ currentSymbolQuestion: string[] }>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-wrap justify-center"
        >
            {currentSymbolQuestion.map((symbol) => (
                <motion.div key={symbol + "q"} className="flex flex-col items-center justify-center m-2 cursor-pointer">
                    <div className="bg-gray-200 rounded-full p-4 text-6xl">{symbol}</div>
                </motion.div>
            ))}
        </motion.div>
    );
}

function Options({
    currentSymbolOption,
    handleAnswer,
    duration,
}: Readonly<{
    currentSymbolOption: string[];
    handleAnswer: (symbol: string) => void;
    duration: number;
}>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mt-5"
        >
            <p className="text-center text-gray-800 text-2xl font-semibold mb-3">Carilah simbol yang hilang</p>
            <div className="flex flex-wrap justify-center">
                {currentSymbolOption
                    .map((symbol) => ({ symbol, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((data) => (
                        <motion.div
                            key={data.symbol + "a"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center justify-center m-2 cursor-pointer"
                            onClick={() => handleAnswer(data.symbol)}
                            style={duration < 2 ? { pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" } : undefined}
                        >
                            <div className="bg-gray-200 rounded-full p-4 text-6xl">{data.symbol}</div>
                            <div className="text-center mt-2">
                                {["a", "b", "c", "d", "e"][Math.floor(Math.random() * 5)]}
                            </div>
                        </motion.div>
                    ))}
            </div>
        </motion.div>
    );
}
