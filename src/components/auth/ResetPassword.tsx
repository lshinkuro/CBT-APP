import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import useAuthStore from "../../stores/authStore";
import { toast } from "react-hot-toast";
import logoPlatypusCollege from "../../assets/images/platypus-college.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const { error, isLoading, message, resetPassword, isSuccessResetPassword } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await resetPassword({ password, token: token ?? "" });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (message && isSuccessResetPassword) {
            toast.success(message);
            navigate("/login");
        }
        useAuthStore.setState({ message: null, isSuccessResetPassword: false });
    }, [isSuccessResetPassword, message, navigate]);

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
                    <span className="text-yellow-900">Reset Password</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-xs text-red-600">
                        Ensure your password is at least 8 characters long, with a mix of uppercase, lowercase, numbers,
                        and preferably a special character (e.g., !, @, #). Avoid using easily guessed details like
                        names or birthdays, and never reuse passwords from other accounts. Keep your password secure and
                        private!
                    </p>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            {showPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
                            Repeat Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="repeatPassword"
                                type={showRepeatPassword ? "text" : "password"}
                                name="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            {showRepeatPassword ? (
                                <EyeOff
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={() => setShowRepeatPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={() => setShowRepeatPassword(true)}
                                />
                            )}
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

export default ResetPassword;
