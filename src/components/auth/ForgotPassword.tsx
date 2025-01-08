import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import useAuthStore from "../../stores/authStore";
import { toast } from "react-hot-toast";
import logoPlatypusCollege from "../../assets/images/platypus-college.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotPassword, error, isLoading, message } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await forgotPassword({ email });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        useAuthStore.setState({ message: null });
    }, [message]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        useAuthStore.setState({ error: null });
    }, [error]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white to-[#F5DEB3]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
            >
                <img src={logoPlatypusCollege} alt="Logo Platypus College" className="w-32 h-32 mx-auto mb-8" />
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    <span className="text-yellow-900">Forgot Password</span>
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
                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 ${
                            isLoading ? "bg-gray-600 hover:bg-gray-700" : "bg-[#F5DEB3] hover:bg-[#F5D7B4]"
                        } hover:text-black rounded-md transition-colors`}
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
