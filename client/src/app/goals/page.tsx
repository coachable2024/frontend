'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import GoalCard from '@/components/features/goals/GoalCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalForm } from '@/components/features/goals/GoalForm';
import { Goal, GoalStatus, GoalCategory, CreateGoalDTO} from '@/types/goalsType';
import { Task, TaskStatus } from '@/types/tasksType';
import AddTaskToGoal from '@/components/features/goals/AddTaskToGoal';
import { goalService, taskService } from '@/services';
import { TaskForm } from '@/components/features/task/TaskForm';


interface GoalsPageProps {To
  isMainExpanded?: boolean;
}

interface GoalService {
  createGoal: (goal: CreateGoalDTO) => Promise<Goal>;
  addTaskToGoal: (goalId: string, taskId: string) => Promise<void>; // Add this line
}

// interface AddTaskToGoalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   goalId: string | null;
//   onTaskAdd: (tasks: Task[], mode: 'existing' | 'new') => void;
//   existingTasks: Task[]; // Change this line to accept Task[]
// }

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


  // Mock for testing 
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await goalService.getGoals();
        setGoals(goals);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };
  
    fetchGoals();
  }, []);


  // track usable width 
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width;
      setContainerWidth(width);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);


  const handleGoalEdit = (goal: Goal) => {
    setEditingGoal(goal);  // You'll need to add this state
    setIsModalOpen(true);
  };

  const handleGoalDelete = (goalId: string) => {
    // Add confirmation if needed
    const confirmed = window.confirm('Are you sure you want to delete this goal?');
    if (confirmed) {
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
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
        relatedToGoal: false
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
      relatedTasks: [] // Ensure relatedTasks is initialized
    };

    setGoals(prevGoals => [...prevGoals, newGoal]);
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
            relatedToGoal: true
          });
          console.log('Created new task:', newTask);
          return newTask;
        } else {
          const updatedTask = await taskService.updateTask(task.id, {
            relatedToGoal: true
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
    <div className="container mx-auto px-4 py-6" ref={containerRef}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Goals</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Empty State Message */}
      {goals.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No goals yet. Click the "Add Goal" button to create one!
        </div>
      )}

      {/* Responsive Grid Layout */}
      <div 
        className={`grid gap-6 ${
          isMainExpanded 
            ? 'grid-cols-1' // Vertical layout when middle section is expanded
            : containerWidth >= 1200 
              ? 'grid-cols-3' // 3 cards per row on very wide screens
              : containerWidth >= 800 
                ? 'grid-cols-2' // 2 cards per row on medium-wide screens
                : 'grid-cols-1' // 1 card per row on narrow screens
        }`}
      >
        {goals.map(goal => (
          // In the goals.map() section of GoalsPage
          <GoalCard
            key={goal.id}
            goal={goal}
            onTaskStatusChange={(taskId, status) => handleTaskStatusChange(goal.id, taskId, status)}
            onTaskEdit={(task) => handleTaskEdit(goal.id, task)}
            onTaskDelete={(taskId) => handleTaskDelete(goal.id, taskId)}
            onGoalEdit={handleGoalEdit}
            onGoalDelete={handleGoalDelete}
            onAddTask={handleAddTask}  // Add this line
          />
        ))}
      </div>


      {/* Goal Creation/Edit Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingGoal ? 'Edit Goal' : 'Create New Goal'}
            </DialogTitle>
          </DialogHeader>
          <GoalForm
            initialGoal={editingGoal}
            onSubmit={(goalData) => {
              if (editingGoal) {
                // Handle update
                setGoals(prevGoals => 
                  prevGoals.map(goal => 
                    goal.id === editingGoal.id 
                      ? { ...goal, ...goalData, updatedAt: new Date() }
                      : goal
                  )
                );
              } else {
                // Handle create
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

      <AddTaskToGoal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedGoalId(null);
        }}
        goalId={selectedGoalId}
        onTaskAdd={handleAddTaskToGoal}
        existingTasks={goals.find(g => g.id === selectedGoalId)?.relatedTasks as Task[] || []} // Explicitly cast to Task[]
      />

      <Dialog open={isTaskEditModalOpen} onOpenChange={setIsTaskEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
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
  );
};

export default GoalsPage;