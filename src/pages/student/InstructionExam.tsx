import { useNavigate, useParams } from "react-router-dom";
import useTryoutStore from "../../stores/tryoutStore";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import { useExamStore } from "../../stores/examStore";
import EmptyResource from "./EmptyResource";
import { Rocket } from "lucide-react";

const InstructionExam = () => {
    const { code = "" } = useParams<{ code: string }>();
    const { instruction, getInstructionByCode, isLoading } = useTryoutStore();
    const navigate = useNavigate();
    const hasGenerateInstruction = useRef(false);
    const [targetInstruction, setTargetInstruction] = useState<string>("");

    useEffect(() => {
        if (code !== "" && !hasGenerateInstruction.current) {
            getInstructionByCode(code);
            hasGenerateInstruction.current = true;
        }
    }, [code, getInstructionByCode]);

    useEffect(() => {
        if (instruction !== null && instruction !== undefined) {
            const parser = new DOMParser();
            const html = parser.parseFromString(instruction, "text/html");
            const listElements = html.body.querySelectorAll("ol, ul, h1, h2, h3, h4, h5, h6");
            listElements.forEach((listElement) => {
                if (listElement.tagName === "OL") {
                    const listItems = listElement.querySelectorAll("li");
                    listItems.forEach((listItem) => {
                        const dataAttribute = listItem.getAttribute("data-list");
                        if (dataAttribute === "bullet") {
                            listItem.style.listStyle = "disc";
                            listItem.style.marginLeft = "2.5rem";
                        } else if (dataAttribute === "ordered") {
                            listItem.style.listStyle = "decimal";
                            listItem.style.marginLeft = "2.5rem";
                        }
                    });
                } else if (listElement.tagName.startsWith("H")) {
                    listElement.className = `text-2xl font-bold mt-4 mb-2 ${listElement.className}`;
                }
            });
            setTargetInstruction(html.body.innerHTML);
        }
    }, [instruction]);

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {(instruction === null && instruction === undefined) || instruction === "" ? (
                    <EmptyResource />
                ) : (
                    <>
                        <div className="mt-12" dangerouslySetInnerHTML={{ __html: targetInstruction }} />
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
