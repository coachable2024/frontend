import React from 'react';
import { SmartGoal } from '../../../types/goals';
// import { Goal } from '../../../types/goalsType';

interface GoalSettingPanelProps {
  currentGoal: SmartGoal | null;
  onConfirmGoal: (goal: SmartGoal) => void;
}

// interface GoalSettingPanelProps {
//   currentGoal: Goal | null;
//   onConfirmGoal: (goal: Goal) => void;
// }

const GoalSettingPanel: React.FC<GoalSettingPanelProps> = ({ currentGoal, onConfirmGoal }) => {
  if (!currentGoal) {
    return (
      <div className="w-80 border-l border-gray-200 p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Goal Setting</h3>
        <p className="text-gray-500 text-sm">
          Tell your coach about your goal, and they'll help you make it SMART:
          Specific, Measurable, Achievable, Relevant, and Time-bound.
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-200 p-4 bg-gray-50 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Your SMART Goal</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">Goal Statement</h4>
          <p className="text-sm text-gray-600">{currentGoal.title}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Specific</h4>
          <p className="text-sm text-gray-600">{currentGoal.description}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Measurable</h4>
          <p className="text-sm text-gray-600">{currentGoal.duration * 60}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Achievable</h4>
          <p className="text-sm text-gray-600">{currentGoal.achievable}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Relevant</h4>
          <p className="text-sm text-gray-600">{currentGoal.relevant}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Time-bound</h4>
          <p className="text-sm text-gray-600">{currentGoal.timeBound * 60}</p>
        </div>

        {currentGoal.SettingStatus === 'draft' && (
          <button
            onClick={() => onConfirmGoal(currentGoal)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Goal
          </button>
        )}

        {currentGoal.relatedTasks.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Tasks</h4>
            <ul className="space-y-2">
              {currentGoal.tasks.map(task => (
                <li key={task.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="rounded text-blue-600"
                    readOnly
                  />
                  <span className="text-sm text-gray-600">{task.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalSettingPanel;