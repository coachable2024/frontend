import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Task, TaskPriority, TaskStatus } from '@/types/tasksType';
import { taskService } from '@/services';
import { TaskForm } from '@/components/features/task/TaskForm';
import { Clock } from 'lucide-react';
import { formatDuration } from '@/utils/formatter';


interface AddTaskToGoalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string | null;
  onTaskAdd: (tasks: Task[], mode: 'existing' | 'new') => void;
  existingTasks: Task[];
}

const AddTaskToGoal: React.FC<AddTaskToGoalProps> = ({ 
  isOpen, 
  onClose, 
  goalId, 
  onTaskAdd, 
  existingTasks = [] 
}) => {
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);
  const [selectedTab, setSelectedTab] = useState("existing");
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium' as TaskPriority,
    status: 'todo' as TaskStatus,
    startDate: '',
    duration: 30,
    relatedToGoal: true,
    category: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks();
        // Filter out tasks that are already in this goal
        const existingTaskIds = new Set(existingTasks.map(task => task.id));
        const availableTasks = tasks.filter(task => !existingTaskIds.has(task.id));
        setAvailableTasks(availableTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    if (isOpen) {
      fetchTasks();
      setSelectedTasks(new Set()); // Reset selections when opening
    }
  }, [isOpen, existingTasks]);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSubmitExisting = () => {
    const selectedTasksArray = availableTasks.filter(task => 
      selectedTasks.has(task.id)
    );
    onTaskAdd(selectedTasksArray, "existing");
    onClose();
  };

  const handleNewTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    onTaskAdd({ ...taskData } as Task, "new");
    onClose();
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Tasks to Goal</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="existing" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 gap-4 p-2 bg-gray-50 rounded-lg">
        <TabsTrigger 
            value="existing" 
            className={`px-4 py-3 rounded-md font-medium transition-all duration-200 ${
            selectedTab === "existing" 
                ? 'bg-blue-600 text-white shadow-md transform hover:bg-blue-700 hover:shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
        >
            <div className="flex items-center justify-center gap-2">
            Select Existing Tasks
            {availableTasks.length > 0 && selectedTab === "existing" && (
                <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                {availableTasks.length}
                </span>
            )}
            </div>
        </TabsTrigger>
        <TabsTrigger 
            value="new"
            className={`px-4 py-3 rounded-md font-medium transition-all duration-200 ${
            selectedTab === "new" 
                ? 'bg-blue-600 text-white shadow-md transform hover:bg-blue-700 hover:shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
        >
            <div className="flex items-center justify-center gap-2">
            Create New Task
            </div>
        </TabsTrigger>
        </TabsList>




          <TabsContent value="existing">
            <div className="space-y-4">
              {availableTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No available tasks to add
                </div>
              ) : (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {availableTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskSelect(task.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedTasks.has(task.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="font-medium flex items-center gap-2">
                            {task.title}
                            <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                              ({task.priority})
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                            {task.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatDuration(task.duration)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  {selectedTasks.size} task{selectedTasks.size !== 1 ? 's' : ''} selected
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitExisting}
                    disabled={selectedTasks.size === 0}
                  >
                    Add Selected Tasks
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Keep your existing "new task" form here */}
          <TabsContent value="new">
            <TaskForm
                onSubmit={handleNewTaskSubmit}
                onCancel={onClose}
                initialTask={{
                }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskToGoal;