import React from 'react';
import { motion } from 'framer-motion';

const SuccessStep: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        You're All Set!
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Your AI coach is ready to help you achieve your goals. Let's get started on your journey!
      </p>
      <button
        onClick={() => window.location.href = '/goals'}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition-colors duration-200
                 font-semibold text-lg"
      >
        Set Up Goals
      </button>
    </motion.div>
  );
};

export default SuccessStep; 