// pages/goals/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import GoalCard from '@/components/goals/GoalCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoalForm } from '@/components/goals/GoalForm';
import { Goal, GoalStatus, GoalCategory } from '@/types/goalsType';
import { Task, TaskStatus } from '@/types/tasksType';

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null); // Add this line to define the state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Add this line to define the state

  // Mock data for testing
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Morning jog',
        description: 'Quick 5K run',
        status: 'todo' as TaskStatus,
        priority: 'high',
        duration: 60, // 60 minutes
        dueDate: new Date('2024-03-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Meal prep',
        description: 'Prepare healthy meals for the week',
        status: 'completed' as TaskStatus,
        priority: 'medium',
        duration: 150, // 2.5 hours
        dueDate: new Date('2024-03-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const mockGoals: Goal[] = [
      {
        id: '1',
        title: 'Improve Health and Fitness',
        motivation: 'To improve my health and energy levels',
        status: 'in-progress' as GoalStatus,
        category: 'health' as GoalCategory,
        relatedTasks: mockTasks,
        targetDate: new Date('2024-06-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
        reward: 'New workout gear',
        metrics: {
          target: 10,
          current: 3,
          unit: 'workouts'
        }
      },
      {
        id: '2',
        title: 'Learn Web Development',
        motivation: 'To advance my career in tech',
        status: 'not-started' as GoalStatus,
        category: 'career' as GoalCategory,
        relatedTasks: [],
        targetDate: new Date('2024-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
        reward: 'New laptop'
      }
    ];

    setGoals(mockGoals);
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
            }):[]
          };
        }
        return goal;
      });
    });
  };

  const handleTaskEdit = (goalId: string, task: Task) => {
    // Implement task edit logic
    console.log('Editing task:', task);
  };

  const handleTaskDelete = (goalId: string, taskId: string) => {
    setGoals(prevGoals => {
      return prevGoals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            relatedTasks: goal.relatedTasks ? goal.relatedTasks.filter(task => task.id !== taskId):[]
          };
        }
        return goal;
      });
    });
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
  

  return (
    <div className="container mx-auto p-6">
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


      {goals.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No goals yet. Click the "Add Goal" button to create one!
        </div>
      )}


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onTaskStatusChange={(taskId, status) => 
              handleTaskStatusChange(goal.id, taskId, status)
            }
            onTaskEdit={(task) => handleTaskEdit(goal.id, task)}
            onTaskDelete={(taskId) => handleTaskDelete(goal.id, taskId)}
            onGoalEdit={handleGoalEdit}
            onGoalDelete={handleGoalDelete}
          />
        ))}
      </div>

      {/* Update your Dialog to handle both create and edit */}
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
    </div>

  );
};

export default GoalsPage;