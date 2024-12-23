import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ExamCardProps {
  title: string;
  description: string;
  to: string;
  delay?: number;
}

export const ExamCard = ({ title, description, to, delay = 0 }: ExamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        Start Exam <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
};