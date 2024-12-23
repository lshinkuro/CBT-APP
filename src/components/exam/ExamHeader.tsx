import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { ExamTimer } from './ExamTimer';

interface ExamHeaderProps {
  title: string;
  examId: string;
  type: string;
}

export const ExamHeader = ({ title, examId, type }: ExamHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">ID Try Out: {examId}</p>
        </div>
        <ExamTimer duration={7200} onTimeUp={() => console.log('Time up!')} />
      </div>
    </motion.div>
  );
};