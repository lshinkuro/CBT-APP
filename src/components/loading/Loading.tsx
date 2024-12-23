import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <svg
    className="w-12 h-12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{
        pathLength: { duration: 1.5, repeat: Infinity },
        rotate: { duration: 2, repeat: Infinity, ease: "linear" }
      }}
    />
  </svg>
);

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center min-h-screen z-50">
      <div className=" flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-600"
        >
          <LoadingSpinner />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Mohon Tunggu
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Sedang memproses permintaan Anda
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;