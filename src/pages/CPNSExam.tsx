import { useState } from 'react';
import { ExamHeader } from '../components/exam/ExamHeader';
import { ExamProgress } from '../components/exam/ExamProgress';
import { QuestionView } from '../components/exam/QuestionView';
import { SubTypeSelector } from '../components/exam/SubTypeSelector';

export const CPNSExam = () => {
  const [selectedSubType, setSelectedSubType] = useState<'SKD' | 'SKB'>('SKD');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ExamHeader 
          title="Tes CPNS" 
          examId="TO-CPNS-001"
          type="CPNS"
        />
        
        <SubTypeSelector
          selectedType={selectedSubType}
          onTypeChange={setSelectedSubType}
          types={[
            { id: 'SKD', label: 'Seleksi Kompetensi Dasar (SKD)' },
            { id: 'SKB', label: 'Seleksi Kompetensi Bidang (SKB)' }
          ]}
        />

        {selectedSubType === 'SKD' && (
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
        )}

        {selectedSubType === 'SKB' && (
          <div className="mt-6">
            <ExamProgress 
              sections={[
                { id: 'SKB1', label: 'Bagian 1', total: 15 },
                { id: 'SKB2', label: 'Bagian 2', total: 15 }
              ]}
            />
            <div className="mt-6">
              <QuestionView />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};