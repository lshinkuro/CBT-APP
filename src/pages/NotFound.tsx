import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
        >
            <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Halaman tidak ditemukan</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Sepertinya Anda mengunjungi halaman yang tidak ada. Silakan kembali ke halaman sebelumnya atau coba
                    mencari halaman lainnya.
                </p>
                <Link to="/" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                    <ArrowLeft className="w-6 h-6" />
                    Kembali ke halaman utama
                </Link>
            </div>
        </motion.div>
    );
}
