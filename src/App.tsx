import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/layout/Navbar';
import { LoginForm } from './components/LoginForm';
import { ExamCard } from './components/ExamCard';
import { ExamSearch } from './components/dashboard/ExamSearch';
import { CPNSExam } from './pages/CPNSExam';
import { IkatanDinasExam } from './pages/IkatanDinasExam';
import { Profile } from './pages/Profile';
import { ExamHistory } from './pages/ExamHistory';
import { useState } from 'react';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const exams = [
    {
      title: 'Tes CPNS',
      description: 'SKD (TIU, TKP, TWK) dan SKB',
      to: '/exam/cpns',
    },
    {
      title: 'Tes Ikatan Dinas',
      description: 'SKD dengan sub-tipe TIU, TKP, dan TWK',
      to: '/exam/ikatan-dinas',
    },
    {
      title: 'Tes TNI/Polri',
      description: 'Akademik, Psikotes, dan Tes Kecermatan',
      to: '/exam/tni-polri',
    },
  ];

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 mt-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Pilih Jenis Ujian
      </h1>
      <ExamSearch onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredExams.map((exam, index) => (
          <ExamCard
            key={exam.title}
            {...exam}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedBackground />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="pt-16">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/exam/cpns" element={<CPNSExam />} />
                  <Route path="/exam/ikatan-dinas" element={<IkatanDinasExam />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/history" element={<ExamHistory />} />
                </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;