import { create } from 'zustand';
import { Question } from '../types/exam';

interface IkatanDinasState {
  questions: Question[];
  currentSection: 'TIU' | 'TKP' | 'TWK';
  sectionScores: {
    TIU: number;
    TKP: number;
    TWK: number;
  };
  calculateTotalScore: () => number;
}

export const useIkatanDinasStore = create<IkatanDinasState>((set, get) => ({
  questions: [
    {
      id: 'ID-1',
      text: 'Jika 3 orang dapat menyelesaikan sebuah proyek dalam 12 hari, berapa lama waktu yang dibutuhkan oleh 4 orang untuk menyelesaikan proyek yang sama?',
      options: [
        { id: 'a', text: '9 hari', weight: 5, isCorrect: true },
        { id: 'b', text: '8 hari', weight: 0, isCorrect: false },
        { id: 'c', text: '10 hari', weight: 0, isCorrect: false },
        { id: 'd', text: '15 hari', weight: 0, isCorrect: false }
      ],
      subSubType: 'TIU',
      duration: 120
    },
    // Add more questions...
  ],
  currentSection: 'TIU',
  sectionScores: {
    TIU: 0,
    TKP: 0,
    TWK: 0
  },
  calculateTotalScore: () => {
    const { sectionScores } = get();
    return sectionScores.TIU + sectionScores.TKP + sectionScores.TWK;
  }
}));