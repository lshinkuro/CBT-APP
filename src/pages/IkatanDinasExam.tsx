import { ExamHeader } from '../components/exam/ExamHeader';
import { ExamProgress } from '../components/exam/ExamProgress';
import { QuestionView } from '../components/exam/QuestionView';
import { useExamStore } from '../stores/examStore';

export const IkatanDinasExam = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ExamHeader 
          title="Tes Ikatan Dinas" 
          examId="TO-IKDIN-001"
          type="IKATAN_DINAS"
        />
        
        <div className="mt-6">
          <ExamProgress 
            sections={[
              { id: 'TIU', label: 'Tes Intelegensi Umum', total: 10 },
              { id: 'TKP', label: 'Tes Karakteristik Pribadi', total: 10 },
              { id: 'TWK', label: 'Tes Wawasan Kebangsaan', total: 10 }
            ]}
          />
          <div className="mt-6">
            <QuestionView />
          </div>
        </div>
      </div>
    </div>
  );
};