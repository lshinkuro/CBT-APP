import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import useExamStore from "../../stores/examStore";

const CountdownTimer = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code") ?? "";
    const mode = searchParams.get("mode") ?? "";
    const { isReadIstruction, createExam, isContinueExam, continueExam } = useExamStore();
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const hasCreatedExam = useRef(false);

    useEffect(() => {
        if (code !== "" && !hasCreatedExam.current && !isContinueExam) {
            createExam({ code, mode });
            hasCreatedExam.current = true;
        } else if (isContinueExam) {
            continueExam({ code, mode });
        }
    }, [createExam, code, mode, isContinueExam, continueExam]);

    useEffect(() => {
        if (!isReadIstruction) navigate("/dashboard");
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(timer);
            useExamStore.setState({ isProgressExam: true });
            navigate("/exam/running", { replace: true });
        }

        return () => clearInterval(timer);
    }, [count, navigate, isReadIstruction]);

    if (!isReadIstruction) {
        return <Loading />;
    }

    return (
        <div className="bg-blue-800 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center h-screen bg-blue-800">
                    <div className="text-center">
                        <div className="text-7xl font-bold text-white">{count > 0 ? count : "GO!"}</div>
                        <p className="mt-4 text-lg text-white">
                            {count > 0 ? "Bersiaplah! Tes akan segera dimulai." : "Mengalihkan halaman..."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
