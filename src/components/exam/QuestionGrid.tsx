import { motion } from 'framer-motion';
import { useExamStore } from '../../stores/examStore';

export const QuestionGrid = () => {
  const { questions, answers, currentQuestion, goToQuestion } = useExamStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h3>
      <div className="grid grid-cols-10 gap-2">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => goToQuestion(index)}
            className={`
              h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium
              transition-all
              ${currentQuestion === index ? 'ring-2 ring-blue-500' : ''}
              ${
                answers[question.id]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};