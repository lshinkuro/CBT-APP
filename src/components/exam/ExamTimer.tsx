import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ExamTimerProps {
    duration: number;
    onTimeUp: () => void;
}

export const ExamTimer = ({ duration, onTimeUp }: ExamTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setIsFinished(false);
    }, [duration]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (!isFinished) {
                setIsFinished(true);
                onTimeUp();
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, isFinished]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center space-x-2 text-gray-700">
            <Clock className="h-5 w-5" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
    );
};
