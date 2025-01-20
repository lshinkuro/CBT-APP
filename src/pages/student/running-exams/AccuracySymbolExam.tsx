/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import Loading from "../../../components/loading/Loading";
import { ExamTimer } from "../../../components/exam/ExamTimer";
import { useCallback } from "react";
import useExamStore from "../../../stores/examStore";
import useAccuracyTestStore from "../../../stores/accuracyTestStore";

export default function AccuracySymbolExam({ currentExam }: any) {
    const { isExamComplete, timeUp } = useExamStore();
    const { setAnswerAccuracySymbol, moveToNextSessionAccuracySymbol, isLoading } = useAccuracyTestStore();

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
            useExamStore.setState({ timeUp: true });
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
                className="bg-white rounded-lg shadow-md p-3 mb-2"
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
            <Options currentSymbolOption={currentSymbolOption} />
            <Question currentSymbolQuestion={currentSymbolQuestion} />
            <OptionLetters currentSymbolOption={currentSymbolOption} duration={duration} handleAnswer={handleAnswer} />
        </>
    );
}

function Question({ currentSymbolQuestion }: Readonly<{ currentSymbolQuestion: string[] }>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-3 flex flex-wrap justify-center"
        >
            {currentSymbolQuestion.map((symbol) => (
                <motion.div key={symbol + "q"} className="flex flex-col items-center justify-center m-2">
                    <div className="bg-gray-200 rounded-full p-4 text-6xl">{symbol}</div>
                </motion.div>
            ))}
        </motion.div>
    );
}

function Options({
    currentSymbolOption,
}: Readonly<{
    currentSymbolOption: string[];
}>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md"
        >
            <p className="text-center text-gray-800 text-2xl font-semibold m-3">Carilah simbol yang hilang</p>
            <div className="flex flex-wrap justify-center">
                {currentSymbolOption
                    .map((symbol) => ({ symbol, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((data, index) => (
                        <motion.div
                            key={data.symbol + "a"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center justify-center m-2"
                        >
                            <div className="bg-gray-200 rounded-full p-4 text-6xl">{data.symbol}</div>
                            <div className="text-center mt-2">{String.fromCharCode(97 + index)}</div>
                        </motion.div>
                    ))}
            </div>
        </motion.div>
    );
}

function OptionLetters({ currentSymbolOption, handleAnswer, duration }: Readonly<{ currentSymbolOption: string[]; handleAnswer: (symbol: string) => void; duration: number }>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md flex flex-wrap justify-center"
        >
            <div className="flex flex-wrap justify-center">
                {currentSymbolOption
                    .map((symbol) => ({ symbol, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((data, index) => (
                        <motion.div
                            key={data.symbol + "a"}
                            whileHover={{ backgroundColor: "#f5f5f5" }}
                            onClick={() => handleAnswer(data.symbol)}
                            style={
                                duration < 2
                                    ? { pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" }
                                    : undefined
                            }
                            className="flex flex-col items-center justify-center m-5 p-3 border-2 border-gray-300 rounded-lg cursor-pointer"
                        >
                            <div className="text-center text-5xl font-bold">{String.fromCharCode(97 + index)}</div>
                        </motion.div>
                    ))}
            </div>
        </motion.div>
    );
}
