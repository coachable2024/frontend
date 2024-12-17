// services/mock/mockGoal.ts
import { Goal, GoalCategory } from '@/types/goalsType';
import { Task } from '@/types/tasksType';
import { mockTaskService } from './mockTasks';

// Mock data
const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Complete Project Milestone',
    description: 'Deliver key features to customers',
    category: 'career' as GoalCategory,
    relatedTasks: ['1'],
    targetDate: new Date('2024-06-30'),
    createdAt: new Date(),
    updatedAt: new Date(),
    startDate: new Date(),
    completedDate: new Date(),
  },
  {
    id: '2',
    title: 'Improve Fitness Level',
    description: 'Better health and energy',
    category: 'health' as GoalCategory,
    relatedTasks: ['2'],
    targetDate: new Date('2024-12-31'),
    createdAt: new Date(),
    updatedAt: new Date(),
    startDate: new Date(),
    completedDate: new Date(),
  }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockGoalService = {
  async getGoals(): Promise<Goal[]> {
    await delay(500);
    return [...mockGoals];
  },

  async getGoalById(id: string): Promise<Goal> {
    await delay(500);
    const goal = mockGoals.find(g => g.id === id);
    if (!goal) throw new Error('Goal not found');
    return { ...goal };
  },

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    await delay(500);
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedTasks: []
    };
    mockGoals.push(newGoal);
    return { ...newGoal };
  },

  async updateGoal(id: string, updatedGoal: Partial<Goal>): Promise<Goal> {
    await delay(500);
    const index = mockGoals.findIndex(g => g.id === id);
    if (index === -1) throw new Error('Goal not found');
    
    mockGoals[index] = {
      ...mockGoals[index],
      ...updatedGoal,
      updatedAt: new Date()
    };
    return { ...mockGoals[index] };
  },

  async deleteGoal(id: string): Promise<void> {
    await delay(500);
    const index = mockGoals.findIndex(g => g.id === id);
    if (index === -1) throw new Error('Goal not found');
    mockGoals.splice(index, 1);
  },

  async addTaskToGoal(goalId: string, taskId: string): Promise<Goal> {
    await delay(500);
    const goalIndex = mockGoals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) throw new Error('Goal not found');

    const task = await mockTaskService.getTasks()
      .then(tasks => tasks.find(t => t.id === taskId));
    
    if (!task) throw new Error('Task not found');

    if (!mockGoals[goalIndex].relatedTasks) {
      mockGoals[goalIndex].relatedTasks = [];
    }

    if (!mockGoals[goalIndex].relatedTasks.some(t => t.id === taskId)) {
      mockGoals[goalIndex].relatedTasks.push(task);
    }

    mockGoals[goalIndex].updatedAt = new Date();
    return { ...mockGoals[goalIndex] };
  },

  async removeTaskFromGoal(goalId: string, taskId: string): Promise<Goal> {
    await delay(500);
    const goalIndex = mockGoals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) throw new Error('Goal not found');

    if (!mockGoals[goalIndex].relatedTasks) return mockGoals[goalIndex];

    mockGoals[goalIndex].relatedTasks = mockGoals[goalIndex].relatedTasks.filter(
      t => t.id !== taskId
    );

    mockGoals[goalIndex].updatedAt = new Date();
    return { ...mockGoals[goalIndex] };
  },

  async updateGoalStatus(id: string): Promise<Goal> {
    await delay(500);
    const goalIndex = mockGoals.findIndex(g => g.id === id);
    if (goalIndex === -1) throw new Error('Goal not found');

    mockGoals[goalIndex].updatedAt = new Date();
    return { ...mockGoals[goalIndex] };
  }
};