import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GoalDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
  onSubmit: (goalDetails: { title: string; description: string; targetDate: Date | null }) => void;
}

const GoalDetailsStep: React.FC<GoalDetailsStepProps> = ({ onNext, onBack, onSubmit }) => {
  const [goalDetails, setGoalDetails] = useState({
    title: '',
    description: '',
    targetDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...goalDetails,
      targetDate: goalDetails.targetDate ? new Date(goalDetails.targetDate) : null,
    });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Tell us about your goal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Title
          </label>
          <input
            type="text"
            id="title"
            value={goalDetails.title}
            onChange={(e) => setGoalDetails(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={goalDetails.description}
            onChange={(e) => setGoalDetails(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
            Target Date
          </label>
          <input
            type="date"
            id="targetDate"
            value={goalDetails.targetDate}
            onChange={(e) => setGoalDetails(prev => ({ ...prev, targetDate: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GoalDetailsStep; 