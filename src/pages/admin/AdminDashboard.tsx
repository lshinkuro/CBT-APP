import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useDashboardStore from "../../stores/dashboardStore";

export const AdminDashboard = () => {
    const { getDashboardStats, stats } = useDashboardStore();
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    useEffect(() => {
        getDashboardStats();
    }, [getDashboardStats]);

    return (
        <div className="flex">
            <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main className={`flex-1 p-8 pt-36 md:pt-10 transition-all duration-300 md:ml-20 lg:ml-64 ${isMinimized ? "ml-20" : "md:ml-64 lg:ml-[21.25rem]"}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 md:mt-0"
                >
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.activeUsers}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Try Outs</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.activeTryouts}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed Exams</h3>
                        <p className="text-3xl font-bold text-purple-600">{stats.completedExams}</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
