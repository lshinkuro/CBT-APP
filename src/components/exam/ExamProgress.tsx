import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  total: number;
}

interface ExamProgressProps {
  sections: Section[];
}

export const ExamProgress = ({ sections }: ExamProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress Ujian</h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{section.label}</span>
              <span>0/{section.total}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};