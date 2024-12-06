// // services/mock/mockGoal.ts
// import { Goal, GoalStatus, GoalCategory } from '@/types/goalsType';
// import { mockTaskService } from './mockTasks';
// import { Task } from '@/types/tasksType';
// import { taskService } from '../api/taskService';

// // Mock data
// const mockGoals: Goal[] = [
//   {
//     id: '1',
//     title: 'Complete Website Redesign',
//     motivation: 'Improve user experience and modernize our platform',
//     status: 'in-progress' as GoalStatus,
//     category: 'career' as GoalCategory,
//     relatedTasks: [], // Will be populated
//     targetDate: new Date('2024-06-30'),
//     createdAt: new Date('2024-03-01'),
//     updatedAt: new Date('2024-03-01'),
//     reward: 'Team celebration dinner',
//     metrics: {
//       target: 100,
//       current: 45,
//       unit: 'percent'
//     }
//   },
//   {
//     id: '2',
//     title: 'Launch MVP Features',
//     motivation: 'Get core functionality to users as quickly as possible',
//     status: 'not-started' as GoalStatus,
//     category: 'career' as GoalCategory,
//     relatedTasks: [], // Will be populated
//     targetDate: new Date('2024-05-15'),
//     createdAt: new Date('2024-03-15'),
//     updatedAt: new Date('2024-03-15'),
//     reward: 'Project bonus',
//     metrics: {
//       target: 5,
//       current: 0,
//       unit: 'features'
//     }
//   }
// ];

// // Initialize mock data by associating existing tasks with goals
// const initializeMockData = async () => {
//   const tasks = await mockTaskService.getTasks();
  
//   // Assign first two tasks to first goal
//   mockGoals[0].relatedTasks = [tasks[0], tasks[1]];
  
//   // Assign third task to second goal
//   mockGoals[1].relatedTasks = [tasks[2]];
// };

// // Call initialization
// initializeMockData();

// // Mock API delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export const mockGoalService = {
//   async getGoals(): Promise<Goal[]> {
//     await delay(500);
//     return [...mockGoals];
//   },

//   async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
//     await delay(500);
//     const newGoal: Goal = {
//       ...goal,
//       id: Date.now().toString(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       relatedTasks: []
//     };
//     mockGoals.push(newGoal);
//     return newGoal;
//   },

//   async updateGoal(id: string, updatedGoal: Partial<Goal>): Promise<Goal> {
//     await delay(500);
//     const goalIndex = mockGoals.findIndex(goal => goal.id === id);
//     if (goalIndex === -1) throw new Error('Goal not found');
    
//     mockGoals[goalIndex] = {
//       ...mockGoals[goalIndex],
//       ...updatedGoal,
//       updatedAt: new Date()
//     };
//     return mockGoals[goalIndex];
//   },

//   async deleteGoal(id: string): Promise<void> {
//     await delay(500);
//     const goalIndex = mockGoals.findIndex(goal => goal.id === id);
//     if (goalIndex === -1) throw new Error('Goal not found');
//     mockGoals.splice(goalIndex, 1);
//   },


//   async addTaskToGoal(goalId: string, taskId: string): Promise<Goal> {
//     await delay(500);
//     const goalIndex = mockGoals.findIndex(goal => goal.id === goalId);
//     if (goalIndex === -1) throw new Error('Goal not found');
  
//     const task = await taskService.getTasks()
//       .then(tasks => tasks.find(t => t.id === taskId));
    
//     if (!task) throw new Error('Task not found');
  
//     // Ensure relatedTasks is initialized
//     if (!mockGoals[goalIndex].relatedTasks) {
//       mockGoals[goalIndex].relatedTasks = [];
//     }
  
//     // Create new array reference
//     mockGoals[goalIndex].relatedTasks = [
//       ...mockGoals[goalIndex].relatedTasks,
//       { ...task }  // Create new task reference
//     ];
    
//     mockGoals[goalIndex].updatedAt = new Date();
  
//     // Return a new object reference
//     return { ...mockGoals[goalIndex] };
//   },


//   async removeTaskFromGoal(goalId: string, taskId: string): Promise<Goal> {
//     await delay(500);
//     const goalIndex = mockGoals.findIndex(goal => goal.id === goalId);
//     if (goalIndex === -1) throw new Error('Goal not found');

//     if (!mockGoals[goalIndex].relatedTasks) {
//       throw new Error('Goal has no tasks');
//     }

//     mockGoals[goalIndex].relatedTasks = mockGoals[goalIndex].relatedTasks.filter(
//       task => task.id !== taskId
//     );
//     mockGoals[goalIndex].updatedAt = new Date();

//     return mockGoals[goalIndex];
//   },

//   async getGoalById(id: string): Promise<Goal> {
//     await delay(500);
//     const goal = mockGoals.find(g => g.id === id);
//     if (!goal) throw new Error('Goal not found');
//     return { ...goal };
//   }
// };



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
    relatedTasks: [],
    targetDate: new Date('2024-06-30'),
    createdAt: new Date(),
    updatedAt: new Date(),
    startDate: new Date(),
    completedDate: new Date(),
    reward: 'Team celebration'
  },
  {
    id: '2',
    title: 'Improve Fitness Level',
    description: 'Better health and energy',
    category: 'health' as GoalCategory,
    relatedTasks: [],
    targetDate: new Date('2024-12-31'),
    createdAt: new Date(),
    updatedAt: new Date(),
    startDate: new Date(),
    completedDate: new Date(),
    reward: 'New running shoes'
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