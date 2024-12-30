import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import useAuthStore from "../stores/authStore";
import { toast } from "react-hot-toast";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthenticated, error, isLoading, checkAuth } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Login successful!");
            checkAuth();
        }
    }, [isAuthenticated, checkAuth]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Login to Police Examination Platform
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${
                            isLoading ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-500"
                        } hover:bg-blue-700 text-white rounded-md transition-colors`}
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
