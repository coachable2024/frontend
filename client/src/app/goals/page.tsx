'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import GoalCard from '@/components/features/goals/GoalCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalForm } from '@/components/features/goals/GoalForm';
import { Goal, GoalCategory, CreateGoalDTO } from '@/types/goalsType';
import { Task, TaskStatus } from '@/types/tasksType';
import AddTaskToGoal from '@/components/features/goals/AddTaskToGoal';
import { goalService, taskService } from '@/services';
import { TaskForm } from '@/components/features/task/TaskForm';
import { Plus, Target, Flag } from 'lucide-react';


interface GoalsPageProps {
  isMainExpanded?: boolean;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ isMainExpanded = true }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null); // Add this line to define the state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Add this line to define the state
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isTaskEditModalOpen, setIsTaskEditModalOpen] = useState(false);

  // Fetch goals from localStorage
  const loadGoals = () => {
    const localGoals = localStorage.getItem('goals');
    if (localGoals) {
      const parsedGoals = JSON.parse(localGoals).map((goal: any) => ({
        ...goal,
        targetDate: new Date(goal.targetDate),
        createdAt: new Date(goal.createdAt),
        updatedAt: new Date(goal.updatedAt),
      }));
      setGoals(parsedGoals);
    }
  };

  useEffect(() => {
    loadGoals();

    // Listen for changes in localStorage
  const handleStorageChange = () => loadGoals();
  window.addEventListener('storage', handleStorageChange);

  return () => window.removeEventListener('storage', handleStorageChange);
}, []);


  const handleGoalEdit = (goal: Goal) => {
    setEditingGoal(goal);  // You'll need to add this state
    setIsModalOpen(true);
  };

  const handleGoalDelete = (goalId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this goal?');
    if (confirmed) {
      setGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
  
        // Update localStorage after filtering out the goal
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
  
        return updatedGoals; // Update state
      });
    }
  };

  const handleTaskStatusChange = (goalId: string, taskId: string, newStatus: TaskStatus) => {
    setGoals(prevGoals => {
      return prevGoals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            relatedTasks: goal.relatedTasks ? goal.relatedTasks.map(task => {
              if (task.id === taskId) {
                return { ...task, status: newStatus };
              }
              return task;
            }) : []
          };
        }
        return goal;
      });
    });
  };

  const handleTaskEdit = (goalId: string, task: Task) => {
    // Implement task edit logic
    setEditingTask(task);
    setIsTaskEditModalOpen(true);
    console.log('Editing task:', task);
  };

  const handleTaskDelete = async (goalId: string, taskId: string) => {
    try {
      // First, update the task to set relatedToGoal to false
      await taskService.updateTask(taskId, {
        // relatedToGoal: false
      });
  
      // Then update the local goals state to remove the task
      setGoals(prevGoals => {
        return prevGoals.map(goal => {
          if (goal.id === goalId) {
            return {
              ...goal,
              relatedTasks: goal.relatedTasks ? 
                goal.relatedTasks.filter(task => task.id !== taskId) 
                : []
            };
          }
          return goal;
        });
      });
    } catch (error) {
      console.error('Failed to delete task from goal:', error);
    }
  };

  const handleCreateGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(), // In a real app, this would come from the backend
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedTasks: [] // Ensure setIsModalOpen is initialized
    };
    const updatedGoals = [...goals, newGoal];
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
    setIsModalOpen(false);
  };

  const handleAddTask = (goalId: string) => {
    setSelectedGoalId(goalId);
    setIsTaskModalOpen(true);

  };





  const handleAddTaskToGoal = async (tasks: Task[], mode: 'existing' | 'new') => {
    if (!selectedGoalId) return;
    try {
      console.log('Starting task addition:', { tasks, mode, selectedGoalId });
      const updatedTasks = await Promise.all(tasks.map(async (task) => {
        if (mode === 'new') {
          const newTask = await taskService.createTask({
            ...task,
            // relatedToGoal: true

          });

          console.log('Created new task:', newTask);
          return newTask;
        } else {
          const updatedTask = await taskService.updateTask(task.id, {
            // relatedToGoal: true
          });

          console.log('Updated existing task:', updatedTask);
          return updatedTask;
        }
      }));

  

      // First update the tasks in the goal service

      await Promise.all(updatedTasks.map(task => 
        goalService.addTaskToGoal(selectedGoalId, task.id)
      ));

  

      // Then fetch the updated goal to ensure we have the latest state

      const updatedGoal = await goalService.getGoalById(selectedGoalId);
      console.log('Updated goal from service:', updatedGoal);

  

      // Update the local state with a new reference
      setGoals(prevGoals => {
        const newGoals = prevGoals.map(goal => 
          goal.id === selectedGoalId 
            ? { ...updatedGoal, relatedTasks: [...(updatedGoal.relatedTasks || [])] }
            : goal
        );

        console.log('New goals state:', newGoals);
        return newGoals;
      });
    } catch (error) {
      console.error('Failed to add tasks to goal:', error);
    }
  };



  const handleTaskUpdate = async (updatedTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    try {
      // Update task in the service
      const updatedTask = await taskService.updateTask(editingTask.id, {
        ...updatedTaskData,
        updatedAt: new Date()
      });

      // Update local state

      setGoals(prevGoals => prevGoals.map(goal => ({
        ...goal,
        relatedTasks: goal.relatedTasks?.map(task => 
          task.id === editingTask.id ? updatedTask : task
        )
      })));

      setIsTaskEditModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Flag className="text-blue-600" />
                Goals
              </h1>
              <p className="text-gray-500 mt-1">Track and achieve your aspirations</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Goal
            </Button>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4 max-w-2xl">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onTaskStatusChange={(taskId, status) => 
              handleTaskStatusChange(goal.id, taskId, status)}
            onTaskEdit={(task) => handleTaskEdit(goal.id, task)}
            onTaskDelete={(taskId) => handleTaskDelete(goal.id, taskId)}
            onGoalEdit={handleGoalEdit}
            onGoalDelete={handleGoalDelete}
            onAddTask={handleAddTask}
          />
          ))}

          {goals.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No goals yet</h3>
              <p className="text-gray-500 mt-2">Start by setting your first goal</p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Goal
              </Button>
            </div>
          )}
        </div>

        {/* Goal Creation/Edit Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl bg-white rounded-xl p-6 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </DialogTitle>
            </DialogHeader>
            <GoalForm
              initialGoal={editingGoal}
              onSubmit={(goalData) => {
                if (editingGoal) {
                  const updatedGoals = goals.map((goal) =>
                    goal.id === editingGoal.id ? { ...goal, ...goalData, updatedAt: new Date() } : goal
                  );
                  localStorage.setItem('goals', JSON.stringify(updatedGoals));
                  setGoals(updatedGoals);
                } else {
                  handleCreateGoal(goalData);
                }
                setIsModalOpen(false);
                setEditingGoal(undefined);
              }}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingGoal(undefined);
              }}
            />
          </DialogContent>
        </Dialog>


        {/* Other Dialogs */}
        <AddTaskToGoal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedGoalId(null);
          }}
          goalId={selectedGoalId}
          onTaskAdd={handleAddTaskToGoal}
          existingTasks={goals.find(g => g.id === selectedGoalId)?.relatedTasks || []}
        />


        <Dialog open={isTaskEditModalOpen} onOpenChange={setIsTaskEditModalOpen}>
          <DialogContent className="max-w-2xl bg-white rounded-xl p-6 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Edit Task</DialogTitle>
            </DialogHeader>
            {editingTask && (
              <TaskForm
                initialTask={editingTask}
                onSubmit={handleTaskUpdate}
                onCancel={() => {
                  setIsTaskEditModalOpen(false);
                  setEditingTask(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GoalsPage;
