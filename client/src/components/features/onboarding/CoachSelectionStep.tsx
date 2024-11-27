import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coach } from '@/types/onboardingType';

interface CoachSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (coach: Coach) => void;
}

const coaches: Coach[] = [
  {
    id: 'luna',
    name: 'Luna',
    personality: 'Empathetic Guide',
    specialties: ['Emotional Support', 'Work-Life Balance', 'Personal Growth'],
    avatarUrl: '🌙',
    profileImage: 'https://img.recraft.ai/9SDeazrGYBf6jj-TWNQP6Yk8twFfFLA9qc1m5T0xK98/rs:fit:1024:1024:0/q:80/g:no/plain/abs://prod/images/4c71a474-180b-48a1-a1d1-32f97ebdab90@avif',
    description: 'A warm and understanding coach who focuses on supportive, nurturing guidance'
  },
  {
    id: 'max',
    name: 'Max',
    personality: 'Strategic Partner',
    specialties: ['Data-Driven', 'Structured Planning', 'Efficiency'],
    avatarUrl: '📊',
    profileImage: 'https://img.recraft.ai/QykHMV_-kgzpv7p54RvGbhl4R2qG9OKd7wR3UfTOmA8/rs:fit:1024:1024:0/q:80/g:no/plain/abs://prod/images/3cf8f7de-7719-4c55-9135-e2b6e42019c4@avif',
    description: 'An analytical coach who provides clear, structured approaches to achieving goals'
  },
  {
    id: 'zara',
    name: 'Zara',
    personality: 'Energetic Motivator',
    specialties: ['High Energy', 'Positive Motivation', 'Action-Oriented'],
    avatarUrl: '⚡',
    profileImage: 'https://img.recraft.ai/tk-8_rxFGbWiZWzLt21VeNUSzAaZl6bK_gnMmU6o_Zk/rs:fit:1024:1024:0/q:80/g:no/plain/abs://prod/images/566e4ab9-69e3-4aaa-af06-2490b34a74cf@avif',
    description: 'A dynamic coach who brings enthusiasm and high energy to your goal journey'
  },
  {
    id: 'sage',
    name: 'Sage',
    personality: 'Wise Mentor',
    specialties: ['Deep Reflection', 'Holistic Approach', 'Long-term Growth'],
    avatarUrl: '🌿',
    profileImage: 'https://img.recraft.ai/k_2EmxFkpEFSwxVMzs8pN1qN9zlY95ozP5x8SnHzUVo/rs:fit:1024:1024:0/q:80/g:no/plain/abs://prod/images/5728095c-f5ab-4531-9229-d176ebef4f22@avif',
    description: 'A thoughtful coach who combines practical advice with philosophical insights'
  }
];

const CoachSelectionStep: React.FC<CoachSelectionStepProps> = ({ onNext, onBack, onSelect }) => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const handleSelect = (coach: Coach) => {
    setSelectedCoach(coach);
    onSelect(coach);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Choose Your AI Coach
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {coaches.map((coach) => (
          <motion.button
            key={coach.id}
            onClick={() => handleSelect(coach)}
            className={`w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md 
                     transition-all border ${
                       selectedCoach?.id === coach.id 
                         ? 'border-blue-500 ring-2 ring-blue-200' 
                         : 'border-gray-100'
                     }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 overflow-hidden flex-shrink-0">
                <img 
                  src={coach.profileImage}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`Image loaded successfully for ${coach.name}:`, coach.profileImage)}
                  onError={(e) => {
                    console.error(`Failed to load image for ${coach.name}:`, coach.profileImage);
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${coach.name}&background=random`;
                  }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{coach.name}</h3>
                <p className="text-gray-600 mt-2">{coach.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {coach.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedCoach}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with {selectedCoach?.name || 'Selected Coach'}
        </button>
      </div>
    </motion.div>
  );
};

export default CoachSelectionStep; 