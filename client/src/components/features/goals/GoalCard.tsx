import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Goal, GoalStatus } from '@/types/goalsType';
import { Task, TaskStatus } from '@/types/tasksType';
import { Clock, Gift, CheckSquare, Square, ChevronDown, Goal as GoalIcon, PlusIcon } from 'lucide-react';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/formatter';

interface GoalCardProps {
  goal: Goal;
  onTaskStatusChange?: (taskId: string, status: TaskStatus) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onGoalEdit?: (goal: Goal) => void;
  onGoalDelete?: (goalId: string) => void;
  onAddTask?: (goalId: string) => void;
  
}



const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete,
  onGoalEdit,
  onGoalDelete,
  onAddTask
}) => {
  if (!goal) {
    return null;
  }


  // add log to debug:
  console.log('GoalCard rendered with goal:', goal);
  console.log('Related tasks:', goal.relatedTasks);

  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate completion statistics
  const relatedTasks = goal.relatedTasks ?? [];
  const completedTasks = relatedTasks.filter(task => task.status === 'completed').length;
  const progress = relatedTasks.length ? (completedTasks / relatedTasks.length) * 100 : 0;
  const totalDuration = relatedTasks.reduce((acc, task) => acc + (task.duration || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-md transform transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 w-full rounded-t-lg overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-grow cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <h2 className="text-lg font-semibold line-clamp-2">{goal.title}</h2>
              <div className="text-sm text-gray-500 mt-1">
                Target Date: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
              </div>
              <p className="text-gray-600 mt-2 line-clamp-3">{goal.motivation}</p>
            </div>

            {/* Controls */}
            <div className="flex items-start ml-4 gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onGoalEdit?.(goal);
                }}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onGoalDelete?.(goal.id);
                }}
              >
                Delete
              </Button>
              <ChevronDown 
                className={`h-5 w-5 transform transition-transform duration-200 ml-2 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div 
          className={`transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
          }`}
        >
          {/* Tasks Section */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Related Tasks</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-sm"
                  onClick={() => onAddTask?.(goal.id)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                {completedTasks}/{relatedTasks.length} completed
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {relatedTasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Task Status and Title */}
                  <div className="flex items-center gap-2">
                    <div 
                      onClick={() => onTaskStatusChange?.(
                        task.id,
                        task.status === 'completed' ? 'todo' : 'completed'
                      )}
                      className="cursor-pointer"
                    >
                      {task.status === 'completed' ? (
                        <CheckSquare className="h-5 w-5 text-green-500 transition-all duration-200 hover:scale-110" />
                      ) : (
                        <Square className="h-5 w-5 transition-all duration-200 hover:scale-110" />
                      )}
                    </div>
                    <span className={`${task.status === 'completed' ? 'text-gray-500 line-through' : ''} line-clamp-1`}>
                      {task.title}
                    </span>
                  </div>

                  {/* Task Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(task.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskEdit?.(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTaskDelete?.(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Duration */}
            <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Total time: {formatDuration(totalDuration)}</span>
            </div>
          </div>

          {/* Metrics Section */}
          {goal.metrics && (
            <div className="px-6 pb-6 border-t pt-6">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
                <div className="text-gray-700">
                  Progress: {goal.metrics.current} / {goal.metrics.target} {goal.metrics.unit}
                </div>
              </div>
            </div>
          )}

          {/* Reward Section */}
          {goal.reward && (
            <div className="px-6 pb-6 border-t pt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Gift className="h-4 w-4" />
                <span>Reward: {goal.reward}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;