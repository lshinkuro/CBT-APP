import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navbar } from "./components/layout/Navbar";
import { LoginForm } from "./components/LoginForm";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersList } from "./pages/admin/UsersList";
import { AdminSettings } from "./pages/admin/AdminSettings";
import useAuthStore from "./stores/authStore";
import Loading from "./components/loading/Loading";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { ExamHistory } from "./pages/student/ExamHistory";
import { IkatanDinasExam } from "./pages/student/IkatanDinasExam";
import { CPNSExam } from "./pages/student/CPNSExam";
import { Profile } from "./pages/student/Profile";
import { Helmet } from "react-helmet-async";
import logoPencil from "./assets/images/pencil.png";
import TryoutsList from "./pages/admin/TryoutsList";
import TryoutSectionsList from "./pages/admin/TryoutSectionsList";
import QuestionsList from "./pages/admin/QuestionsList";
import InstructionExam from "./pages/student/InstructionExam";
import CountdownTimer from "./pages/student/CountdownTimer";
import CardTryoutSection from "./pages/student/CardTryoutSection";
import ProgramsList from "./pages/admin/ProgramsList";
import Logout from "./components/auth/Logout";

function App() {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <Loading />;
    }
    return (
        <Router>
            <Helmet>
                <link rel="icon" href={logoPencil} />
                <title>Tryout CPNS Polri</title>
            </Helmet>
            <AnimatedBackground />
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} />

                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <Routes>
                                    <Route path="dashboard" element={<AdminDashboard />} />
                                    <Route path="users" element={<UsersList />} />
                                    <Route path="programs" element={<ProgramsList />} />
                                    <Route path="tryouts" element={<TryoutsList />} />
                                    <Route path="tryout-sections" element={<TryoutSectionsList />} />
                                    <Route path="questions" element={<QuestionsList />} />
                                    <Route path="settings" element={<AdminSettings />} />
                                </Routes>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <Navbar />
                                <div className="pt-16">
                                    <Routes>
                                        <Route path="/dashboard" element={<StudentDashboard />} />
                                        <Route path="/tryout-section/:id" element={<CardTryoutSection />} />
                                        <Route path="/instruction/:code" element={<InstructionExam />} />
                                        <Route path="/exam/cpns" element={<CPNSExam />} />
                                        <Route path="/exam/ikatan-dinas" element={<IkatanDinasExam />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/history" element={<ExamHistory />} />
                                        <Route path="/starting-exam/:code" element={<CountdownTimer />} />
                                    </Routes>
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
