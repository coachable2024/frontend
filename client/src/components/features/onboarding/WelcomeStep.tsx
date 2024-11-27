import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      className="text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Your AI Goal Coach
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Ready to achieve your goals? Let's pair you with your perfect AI coach
        and create a personalized path to success.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition-colors duration-200
                     font-semibold text-lg"
        >
          Let's Get Started
        </button>
        
        <div className="text-sm text-gray-500">
          Takes only 2 minutes to setup
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeStep; 