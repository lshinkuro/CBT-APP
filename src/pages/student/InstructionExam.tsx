import { useNavigate, useParams } from "react-router-dom";
import useTryoutStore from "../../stores/tryoutStore";
import { useEffect, useRef } from "react";
import Loading from "../../components/loading/Loading";
import { useExamStore } from "../../stores/examStore";
import EmptyResource from "./EmptyResource";
import { Rocket } from "lucide-react";
import "quill/dist/quill.snow.css";

const InstructionExam = () => {
    const { code = "" } = useParams<{ code: string }>();
    const { instruction, getInstructionByCode, isLoading } = useTryoutStore();
    const navigate = useNavigate();
    const hasGenerateInstruction = useRef(false);

    useEffect(() => {
        if (code !== "" && !hasGenerateInstruction.current) {
            getInstructionByCode(code);
            hasGenerateInstruction.current = true;
        }
    }, [code, getInstructionByCode]);

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {(instruction === null && instruction === undefined) || instruction === "" ? (
                    <EmptyResource />
                ) : (
                    <>
                        <div className="ql-editor">
                            <div className="mt-12" dangerouslySetInnerHTML={{ __html: instruction ?? "" }} />
                        </div>
                        <div className="text-center mt-12">
                            <button
                                type="button"
                                onClick={() => {
                                    useExamStore.setState({ isReadIstruction: true });
                                    navigate(`/starting-exam/${code}`);
                                }}
                                className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 rounded-md"
                            >
                                <Rocket className="mr-2" /> Mulai Kerjakan
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstructionExam;
