import { motion } from "framer-motion";
import useAuthStore from "../../stores/authStore";
import { CalendarDays, Mail, User } from "lucide-react";
import useProgramStore from "../../stores/programStore";
import Loading from "../../components/loading/Loading";
import { useEffect, useRef } from "react";

export const Profile = () => {
    const { user } = useAuthStore();
    const { getAllAvailablePrograms, availablePrograms, isLoading } = useProgramStore();
    const hasGeneratePrograms = useRef(false);

    useEffect(() => {
        if (!hasGeneratePrograms.current) {
            getAllAvailablePrograms();
            hasGeneratePrograms.current = true;
        }
    }, [getAllAvailablePrograms]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white py-12">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                    {/* Profile Header */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-700 to-blue-800" />

                    <div className="relative px-8 pt-20 pb-8">
                        {/* Profile Avatar */}
                        <div className="absolute -top-8 left-8">
                            <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                                <span className="text-4xl font-bold text-blue-600">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <motion.div variants={container} initial="hidden" animate="show" className="pt-8">
                            <motion.h2 variants={item} className="text-3xl font-bold text-gray-800 mt-8">
                                Profil Saya
                            </motion.h2>

                            <div className="mt-8 space-y-6">
                                <motion.div
                                    variants={item}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Nama</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{user?.username}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={item}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{user?.email}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={item}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <CalendarDays className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Bergabung Sejak</p>
                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {user &&
                                                new Date(user?.createdAt).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                        </p>
                                    </div>
                                </motion.div>
                                <motion.h2 variants={item} className="text-3xl font-bold text-gray-800 mt-8">
                                    Program yang diikuti
                                </motion.h2>
                                <motion.div
                                    variants={item}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    {availablePrograms.map((program) => (
                                        <motion.div
                                            key={program.id}
                                            variants={item}
                                            className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <div className="p-3 bg-green-100 rounded-lg">
                                                <span className="text-green-600 font-bold">{program?.title}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
