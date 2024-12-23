import { create } from 'zustand';
import { Question, SubType, SubSubType } from '../types/exam';

interface ExamState {
  currentQuestion: number;
  questions: Question[];
  answers: Record<string, string>;
  scores: Record<SubSubType, number>;
  isExamComplete: boolean;
  setAnswer: (questionId: string, answerId: string) => void;
  nextQuestion: () => void;
  goToQuestion: (index: number) => void;
  calculateScore: () => {
    TIU: number;
    TKP: number;
    TWK: number;
    total: number;
  };
}

export const useExamStore = create<ExamState>((set, get) => ({
  currentQuestion: 0,
  questions: [
    // Example questions - replace with real data
    {
      id: '1',
      text: 'Dalam sebuah barisan aritmatika, suku pertama adalah 3 dan suku ketiga adalah 9. Berapakah suku kelima dari barisan tersebut?',
      options: [
        { id: 'a', text: '12', weight: 5 },
        { id: 'b', text: '15', weight: 5 },
        { id: 'c', text: '18', weight: 5 },
        { id: 'd', text: '21', weight: 5 },
      ],
      subSubType: 'TIU',
    },
    // Add more questions...
  ],
  answers: {},
  scores: {
    TIU: 0,
    TKP: 0,
    TWK: 0,
    MTK: 0,
    WK: 0,
    BI: 0,
    PU: 0,
    IQ: 0,
    EQ: 0,
    KECERMATAN: 0,
  },
  isExamComplete: false,

  setAnswer: (questionId, answerId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerId },
    })),

  nextQuestion: () => {
    const state = get();
    const nextIndex = state.currentQuestion + 1;
    
    if (nextIndex >= state.questions.length) {
      set({ isExamComplete: true });
    } else {
      set({ currentQuestion: nextIndex });
    }
  },

  goToQuestion: (index) => {
    if (index >= 0 && index < get().questions.length) {
      set({ currentQuestion: index });
    }
  },

  calculateScore: () => {
    const state = get();
    // Implement actual scoring logic here
    return {
      TIU: 80,
      TKP: 85,
      TWK: 90,
      total: 255,
    };
  },
}));