import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/layout/Navbar';
import { LoginForm } from './components/LoginForm';
import { CPNSExam } from './pages/student/CPNSExam';
import { IkatanDinasExam } from './pages/student/IkatanDinasExam';
import { Profile } from './pages/student/Profile';
import { ExamHistory } from './pages/student/ExamHistory';
import { StudentDashboard } from './pages/student/StudentDashboard';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersList } from './pages/admin/UsersList';
import { CreateTryOut } from './pages/admin/CreateTryOut';
import { AdminSettings } from './pages/admin/AdminSettings';
import { CreateUser } from './pages/admin/CreateUser';
import { ProtectedRoute } from './ProtectedRoute';



function App() {
  return (
    <Router>
      <AnimatedBackground />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LoginForm />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRole="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="tryouts" element={<CreateTryOut />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </ProtectedRoute>
          } />

          <Route
            path="/*"
            element={
              <ProtectedRoute allowedRole="student">
                <Navbar />
                <div className="pt-16">
                <Routes>
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/exam/cpns" element={<CPNSExam />} />
                  <Route path="/exam/ikatan-dinas" element={<IkatanDinasExam />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/history" element={<ExamHistory />} />
                </Routes>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;