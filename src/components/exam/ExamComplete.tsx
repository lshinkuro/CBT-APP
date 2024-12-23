import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useExamStore } from '../../stores/examStore';

export const ExamComplete = () => {
  const navigate = useNavigate();
  const { calculateScore } = useExamStore();
  const score = calculateScore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-md p-8 text-center"
    >
      <div className="flex justify-center mb-6">
        <Trophy className="h-16 w-16 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Selamat! Anda telah menyelesaikan Ujian CPNS
      </h2>
      <p className="text-gray-600 mb-8">
        Terima kasih telah mengikuti ujian ini. Hasil akan segera diproses.
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ringkasan Nilai</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>TIU:</span>
            <span className="font-medium">{score.TIU}</span>
          </div>
          <div className="flex justify-between">
            <span>TKP:</span>
            <span className="font-medium">{score.TKP}</span>
          </div>
          <div className="flex justify-between">
            <span>TWK:</span>
            <span className="font-medium">{score.TWK}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{score.total}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </button>
    </motion.div>
  );
};