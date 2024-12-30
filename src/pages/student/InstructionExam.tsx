import { useNavigate, useParams } from "react-router-dom";
import useTryoutStore from "../../stores/tryoutStore";
import { useEffect, useRef } from "react";
import Loading from "../../components/loading/Loading";
import { useExamStore } from "../../stores/examStore";
import EmptyResource from "./EmptyResource";

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
                {instruction === null || instruction === undefined ? (
                    <EmptyResource />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">{instruction.title}</h1>
                        {instruction.sections.map((section) => (
                            <div key={section.id} className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3">{section.title}</h2>
                                {section.content && <p className="text-gray-600 mb-4">{section.content}</p>}
                                {section.list && (
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        {section.list.map((item) => (
                                            <li key={item.id}>{item.text}</li>
                                        ))}
                                    </ul>
                                )}
                                {section?.subsections?.map((sub) => (
                                    <div key={sub.id} className="mt-4">
                                        <h3 className="text-lg font-medium text-gray-700">{sub.title}</h3>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
                                            {sub.list.map((subItem) => (
                                                <li key={subItem.id}>{subItem.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {section.steps && (
                                    <ol className="list-decimal pl-5 text-gray-600 space-y-4 mt-2">
                                        {section.steps.map((step) => (
                                            <li key={step.id}>
                                                <h3 className="font-medium text-gray-700">{step.title}</h3>
                                                <p className="text-gray-600">{step.content}</p>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                                {section.note && <p className="text-sm text-gray-500 italic mt-4">{section.note}</p>}
                            </div>
                        ))}
                        <div className="text-center mt-12">
                            <button
                                type="button"
                                onClick={() => {
                                    useExamStore.setState({ isReadIstruction: true });
                                    navigate(`/starting-exam/${code}`);
                                }}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 rounded-md"
                            >
                                Mulai Kerjakan
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstructionExam;
