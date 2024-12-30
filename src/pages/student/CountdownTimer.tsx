import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import { useExamStore } from "../../stores/examStore";

const CountdownTimer = () => {
    const { code = "" } = useParams<{ code: string }>();
    const { isReadIstruction, createExam } = useExamStore();
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const hasCreatedExam = useRef(false);

    useEffect(() => {
        if (code !== "" && !hasCreatedExam.current) {
            createExam({ code });
            hasCreatedExam.current = true;
        }
    }, [createExam, code]);

    useEffect(() => {
        if (!isReadIstruction) navigate("/dashboard");
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(timer);
            navigate("/dashboard", { replace: true });
        }

        return () => clearInterval(timer);
    }, [count, navigate, isReadIstruction]);

    if (!isReadIstruction) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="text-center">
                        <div className="text-7xl font-bold text-black">{count > 0 ? count : "GO!"}</div>
                        <p className="mt-4 text-lg text-black">
                            {count > 0 ? "Bersiaplah! Tes akan segera dimulai." : "Mengalihkan halaman..."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
