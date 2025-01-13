import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { motion } from "framer-motion";
import { useState } from "react";

export const AdminDashboard = () => {

    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };
    return (
        <div className="flex">
             <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main
                className={`flex-1 p-8 transition-all duration-300 ${
                    isMinimized ? "ml-20" : "ml-64"
                }`}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">245</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Try Outs</h3>
                        <p className="text-3xl font-bold text-green-600">12</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed Tests</h3>
                        <p className="text-3xl font-bold text-purple-600">1,234</p>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-white p-6 rounded-lg shadow-md"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">{/* Activity items would go here */}</div>
                </motion.div>
            </main>
        </div>
    );
};
