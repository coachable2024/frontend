import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Goal } from '@/types/goalsType';
import { Task, TaskStatus } from '@/types/tasksType';
import { Target, MoreVertical, CheckCircle, Plus, Pencil, ChevronDown, Clock } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(true);

  if (!goal) {
    return null;
  }

  // Safely access relatedTasks with proper type checking
  const tasks = goal.relatedTasks || [];
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-t-lg overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold flex-grow">{goal.title}</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onGoalEdit?.(goal)}
              className="text-gray-600 hover:text-blue-600"
            >
              <Pencil size={16} />
              <span className="ml-1">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onGoalDelete?.(goal.id)}
              className="text-gray-600 hover:text-red-600"
            >
              Delete
            </Button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown 
                className={`h-5 w-5 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Target Date: {
            (() => {
              try {
                // Handle both string and Date objects
                const dateValue = typeof goal.targetDate === 'string' 
                  ? goal.targetDate 
                  : goal.targetDate?.toISOString();
                return dateValue 
                  ? format(new Date(dateValue), 'MMM d, yyyy') 
                  : 'No date set';
              } catch (error) {
                console.error('Date formatting error:', error);
                return 'Invalid date';
              }
            })()
          }
        </p>

        {/* Tasks Section */}
        {isExpanded && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Tasks</h4>
                <span className="text-sm text-gray-500">
                  ({completedTasks}/{totalTasks})
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddTask?.(goal.id)}
                className="text-blue-600"
              >
                <Plus size={16} />
                <span className="ml-1">Add Task</span>
              </Button>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onTaskStatusChange?.(
                        task.id,
                        task.status === 'completed' ? 'todo' : 'completed'
                      )}
                    >
                      <CheckCircle 
                        className={task.status === 'completed' ? 'text-green-500' : 'text-gray-300'} 
                        size={20} 
                      />
                    </button>
                    <div>
                      <span className={task.status === 'completed' ? 'text-gray-500 line-through' : ''}>
                        {task.title}
                      </span>
                      {task.duration && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          {formatDuration(task.duration * 60)}
                        </div>
                      )}
                    </div>
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
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No tasks yet. Click "Add Task" to create one!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;