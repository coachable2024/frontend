// export default GoalsPage;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { CreateGoalModal } from '@/components/goals/CreateGoalModal';
import GoalCard from '@/components/goals/GoalCard';
import GoodbyeCard from '@/components/goals/GoodbyeCard';

// Types can be moved to a separate types file if desired
interface TimeRequirement {
  hours: number;
  minutes: number;
}

interface Action {
  name: string;
  time: TimeRequirement;
  completed: boolean;
}

interface ByebyeAction {
  name: string;
  time: TimeRequirement;
}

const GoalsPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const goalData = {
    why: "To improve my health and energy levels",
    actions: [
      { name: "Morning jog", time: { hours: 1, minutes: 0 }, completed: false },
      { name: "Meal prep", time: { hours: 2, minutes: 30 }, completed: true },
      { name: "Gym workout", time: { hours: 1, minutes: 30 }, completed: false },
      { name: "Meditation", time: { hours: 0, minutes: 30 }, completed: false },
      { name: "Read health books", time: { hours: 1, minutes: 0 }, completed: false }
    ],
    reward: "New workout gear"
  };

  const byeData = {
    why: "These activities don't align with my priorities",
    byebyeActions: [
      { name: "Social media scrolling", time: { hours: 2, minutes: 0 } },
      { name: "Random YouTube videos", time: { hours: 1, minutes: 30 } },
      { name: "Excessive TV watching", time: { hours: 2, minutes: 0 } }
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Goal</h2>
          <GoalCard 
            why={goalData.why}
            actions={goalData.actions}
            reward={goalData.reward}
          />
        </div>



        <div className="flex h-full">
      <div className="w-32 p-4 border-r">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2"
          variant="default"
        >
          <PlusIcon className="w-4 h-4" />
          Add Goal
        </Button>
        {/* Rest of your sidebar content */}
      </div>
      
      {isModalOpen && (
        <CreateGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>





        <div>
          <h2 className="text-2xl font-bold mb-4">Bye</h2>
          <GoodbyeCard 
            why={byeData.why}
            byebyeActions={byeData.byebyeActions}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;