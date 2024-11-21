import React from 'react';
import { motion } from 'framer-motion';

interface GoalSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (goalType: string) => void;
}

const goalTypes = [
  {
    id: 'career',
    title: 'Career Growth',
    description: 'Advance your professional life and achieve work-related goals',
    icon: '💼'
  },
  {
    id: 'health',
    title: 'Health & Fitness',
    description: 'Improve your physical and mental well-being',
    icon: '💪'
  },
  {
    id: 'learning',
    title: 'Learning & Skills',
    description: 'Acquire new knowledge and develop valuable skills',
    icon: '📚'
  },
  {
    id: 'personal',
    title: 'Personal Growth',
    description: 'Work on self-improvement and life goals',
    icon: '🌱'
  }
];

const GoalSelectionStep: React.FC<GoalSelectionStepProps> = ({ onNext, onBack, onSelect }) => {
  const handleSelect = (goalType: string) => {
    onSelect(goalType);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        What type of goal would you like to work on?
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Select the category that best matches your ambitions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goalTypes.map((goal) => (
          <motion.button
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(goal.id)}
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all
                     border border-gray-100 text-left"
          >
            <div className="text-4xl mb-3">{goal.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {goal.title}
            </h3>
            <p className="text-gray-600">{goal.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default GoalSelectionStep; 