import { useNavigate, useParams } from "react-router-dom";
import useTryoutStore from "../../stores/tryoutStore";
import { useEffect, useRef } from "react";
import Loading from "../../components/loading/Loading";
import useExamStore from "../../stores/examStore";
import EmptyResource from "./EmptyResource";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

const InstructionExam = () => {
    const { code = "" } = useParams<{ code: string }>();
    const {
        instruction,
        getInstructionByCode,
        isLoading,
        hasAccuracyTest,
        questionsCount,
        targetAccuracyTestType,
        testTypes,
    } = useTryoutStore();
    const navigate = useNavigate();
    const hasGenerateInstruction = useRef(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    useEffect(() => {
        if (code !== "" && !hasGenerateInstruction.current) {
            getInstructionByCode(code);
            hasGenerateInstruction.current = true;
        }
    }, [code, getInstructionByCode]);

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 m-6"
            >
                <div className="max-w-4xl mx-auto px-4">
                    {(instruction === null && instruction === undefined) ||
                    instruction === "" ||
                    (!hasAccuracyTest && questionsCount === 0) ? (
                        <EmptyResource />
                    ) : (
                        <>
                            <div className="ql-editor">
                                <div className="mt-12" dangerouslySetInnerHTML={{ __html: instruction ?? "" }} />
                            </div>
                            <div className="text-center mt-12 flex justify-center space-x-4">
                                {hasAccuracyTest && questionsCount > 0 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                useExamStore.setState({
                                                    isReadIstruction: true,
                                                    mode: targetAccuracyTestType,
                                                });
                                                navigate(`/starting-exam?code=${code}&mode=${targetAccuracyTestType}`);
                                            }}
                                            className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 rounded-md"
                                        >
                                            <Rocket className="mr-2" /> Mulai Ujian {testTypes[targetAccuracyTestType]}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                useExamStore.setState({ isReadIstruction: true, mode: "normal" });
                                                navigate(`/starting-exam?code=${code}&mode=normal`);
                                            }}
                                            className="w-full flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 px-4 py-2 rounded-md"
                                        >
                                            <Rocket className="mr-2" /> Mulai Ujian Normal
                                        </button>
                                    </>
                                )}
                                {!hasAccuracyTest && questionsCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            useExamStore.setState({ isReadIstruction: true, mode: "normal" });
                                            navigate(`/starting-exam?code=${code}&mode=normal`);
                                        }}
                                        className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 rounded-md"
                                    >
                                        <Rocket className="mr-2" /> Mulai Ujian Normal
                                    </button>
                                )}
                                {hasAccuracyTest && questionsCount === 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            useExamStore.setState({
                                                isReadIstruction: true,
                                                mode: targetAccuracyTestType,
                                            });
                                            navigate(`/starting-exam?code=${code}&mode=${targetAccuracyTestType}`);
                                        }}
                                        className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 rounded-md"
                                    >
                                        <Rocket className="mr-2" /> Mulai Ujian {testTypes[targetAccuracyTestType]}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default InstructionExam;
