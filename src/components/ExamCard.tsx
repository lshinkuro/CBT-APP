import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ExamCardProps {
    title: string;
    description: string;
    to: string;
    delay?: number;
    textButton?: string;
}

export const ExamCard = ({ title, description, to, delay = 0, textButton }: ExamCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-[1.02] duration-300 ease-in-out"
        >
            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mb-5 leading-relaxed">
                {description}
            </p>

            {/* Action Link */}
            <Link
                to={to}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                {textButton ?? "Select Exam"}
                <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
        </motion.div>

    );
};
