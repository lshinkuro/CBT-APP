import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EmptyResource() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center bg-yellow-50 p-8"
        >
            <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Materi belum tersedia</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Belum ada materi yang tersedia, kami sedang mempersiapkan materi.
                </p>
                <Link to="/" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                    <ArrowLeft className="w-6 h-6" />
                    Kembali ke halaman utama
                </Link>
            </div>
        </motion.div>
    );
}
