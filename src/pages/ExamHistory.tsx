import { motion } from 'framer-motion';
import { useExamHistory } from '../stores/examHistoryStore';

export const ExamHistory = () => {
  const { history } = useExamHistory();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Ujian</h2>
        
        <div className="space-y-4">
          {history.map((exam) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                  <p className="text-gray-600">{exam.type}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exam.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {exam.score.total}
                  </div>
                  <div className="text-sm text-gray-600">Nilai Total</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};