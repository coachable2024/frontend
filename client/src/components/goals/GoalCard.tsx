import React, { useState } from 'react';
import { Clock, Gift, CheckSquare, Square, ChevronDown } from 'lucide-react';

interface TimeRequirement {
  hours: number;
  minutes: number;
}

interface Action {
  name: string;
  time: TimeRequirement;
  completed: boolean;
}

interface GoalCardProps {
  why: string;
  actions: Action[];
  reward: string;
  onActionToggle?: (index: number) => void;
}

const formatTime = (time: TimeRequirement) => {
  const hours = time.hours > 0 ? `${time.hours}h` : "";
  const minutes = time.minutes > 0 ? `${time.minutes}m` : "";
  return `${hours} ${minutes}`.trim();
};

const GoalCard: React.FC<GoalCardProps> = ({ 
  why = "", 
  actions = [], 
  reward = "", 
  onActionToggle 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedActions = actions?.filter(action => action.completed)?.length || 0;
  const progress = actions?.length ? (completedActions / actions.length) * 100 : 0;
  
  const totalTime = actions?.reduce((acc, action) => {
    return {
      hours: acc.hours + action.time.hours,
      minutes: acc.minutes + action.time.minutes
    };
  }, { hours: 0, minutes: 0 }) || { hours: 0, minutes: 0 };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 transform transition-all duration-200 hover:shadow-lg">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 w-full rounded-t-lg overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Why Section */}
      <div className="p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Why?
          </h2>
          <ChevronDown 
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
        <p className="text-gray-600 mt-2">{why}</p>
      </div>

      {/* Collapsible Content */}
      <div className={`transition-all duration-300 ${
        isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
      }`}>
        {/* Action List Section */}
        <div className="px-6 pb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Action List</h3>
            <div className="text-sm text-gray-500">
              {completedActions}/{actions.length} completed
            </div>
          </div>

          <div className="space-y-3">
            {actions.map((action, actionIndex) => (
              <div 
                key={actionIndex}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                onClick={() => onActionToggle?.(actionIndex)}
              >
                <div className="flex items-center gap-2">
                  {action.completed ? (
                    <CheckSquare className="h-5 w-5 text-green-500 transition-all duration-200 hover:scale-110 cursor-pointer" />
                  ) : (
                    <Square className="h-5 w-5 transition-all duration-200 hover:scale-110 cursor-pointer" />
                  )}
                  <span className={action.completed ? 'text-gray-500 line-through' : ''}>
                    {action.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(action.time)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Time */}
          <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Total time: {formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Reward Section */}
        <div className="px-6 pb-6 border-t pt-6">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-50">
            <Gift className="h-5 w-5 text-purple-500" />
            <span className="text-gray-700">{reward}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;