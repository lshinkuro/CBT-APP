import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navbar } from "./components/layout/Navbar";
import { LoginForm } from "./components/LoginForm";
import { ExamCard } from "./components/ExamCard";
import { ExamSearch } from "./components/dashboard/ExamSearch";
import { CPNSExam } from "./pages/CPNSExam";
import { IkatanDinasExam } from "./pages/IkatanDinasExam";
import { Profile } from "./pages/Profile";
import { ExamHistory } from "./pages/ExamHistory";
import { useEffect, useState } from "react";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersList } from "./pages/admin/UsersList";
import { CreateTryOut } from "./pages/admin/CreateTryOut";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { CreateUser } from "./pages/admin/CreateUser";
import useAuthStore from "./stores/authStore";
import Loading from "./components/loading/Loading";

const ProtectedRoute = ({
    children,
    allowedRole,
}: {
    children: React.ReactNode;
    allowedRole?: "admin" | "student";
}) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} replace />;
    }

    return <>{children}</>;
};

function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    const exams = [
        {
            title: "Tes CPNS",
            description: "SKD (TIU, TKP, TWK) dan SKB",
            to: "/exam/cpns",
        },
        {
            title: "Tes Ikatan Dinas",
            description: "SKD dengan sub-tipe TIU, TKP, dan TWK",
            to: "/exam/ikatan-dinas",
        },
        {
            title: "Tes TNI/Polri",
            description: "Akademik, Psikotes, dan Tes Kecermatan",
            to: "/exam/tni-polri",
        },
    ];

    const filteredExams = exams.filter(
        (exam) =>
            exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8 bg-gray-100 mt-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Pilih Jenis Ujian</h1>
            <ExamSearch onSearch={setSearchQuery} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredExams.map((exam, index) => (
                    <ExamCard key={exam.title} {...exam} delay={index * 0.1} />
                ))}
            </div>
        </div>
    );
}

function App() {
    const { user, checkAuth, isLoading } = useAuthStore();

    useEffect(() => {
        if (!user) {
            checkAuth();
        }
    }, [checkAuth, user]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <Router>
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
                                    <Route path="users/create" element={<CreateUser />} />
                                    <Route path="tryouts" element={<CreateTryOut />} />
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
                                        <Route path="/dashboard" element={<Dashboard />} />
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
