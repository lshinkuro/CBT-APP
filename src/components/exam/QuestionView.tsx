import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useExamStore } from '../../stores/examStore';
import { QuestionGrid } from './QuestionGrid';
import { ExamComplete } from './ExamComplete';

export const QuestionView = () => {
  const { 
    currentQuestion,
    questions,
    answers,
    setAnswer,
    nextQuestion,
    goToQuestion,
    isExamComplete
  } = useExamStore();

  const question = questions[currentQuestion];

  const handleOptionSelect = (optionId: string) => {
    setAnswer(question.id, optionId);
    // Auto advance after 500ms
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  if (isExamComplete) {
    return <ExamComplete />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Soal {currentQuestion + 1}/{questions.length}
          </span>
        </div>

        <div className="space-y-6">
          <div className="text-gray-800 text-lg">
            {question.text}
          </div>

          {question.imageUrl && (
            <img
              src={question.imageUrl}
              alt="Question illustration"
              className="max-w-full rounded-lg"
            />
          )}

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[question.id] === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current text-sm font-medium">
                    {option.id.toUpperCase()}
                  </span>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <button 
              onClick={() => goToQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button 
              onClick={() => nextQuestion()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
            </button>
          </div>
        </div>
      </motion.div>

      <QuestionGrid />
    </div>
  );
};