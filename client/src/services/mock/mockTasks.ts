// services/mockTaskService.ts
import { Task, TaskStatus } from '@/types/tasksType';
import { DateTime } from 'luxon';

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Set Up a Tracker for webpage design',
    description: '',
    status: 'in-progress' as TaskStatus,
    priority: 'high',
    duration: 120, // 2 hours
    startTime: DateTime.fromObject({
      year: 2024,
      month: 12,
      day: 20,
      hour: 9,
      minute: 0
    }),
    dueDate: new Date('2024-12-31'),
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '2',
    title: 'Design Page Layout',
    description: 'Create home page layout',
    status: 'in-progress' as TaskStatus,
    priority: 'medium',
    duration: 180, // 3 hours
    startTime: DateTime.fromObject({
      year: 2024,
      month: 12,
      day: 23,
      hour: 13,
      minute: 30
    }),
    dueDate: new Date('2024-12-23'),
    createdAt: new Date('2024-03-19'),
    updatedAt: new Date('2024-03-21'),
  },
  {
    id: '3',
    title: 'Improve features',
    description: 'improve task and goal features',
    status: 'completed' as TaskStatus,
    priority: 'low',
    duration: 90, // 1.5 hours
    startTime: DateTime.fromObject({
      year: 2024,
      month: 12,
      day: 18,
      hour: 15,
      minute: 0
    }),
    dueDate: new Date('2024-12-28'),
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-22'),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockTaskService = {
  async getTasks(): Promise<Task[]> {
    await delay(500);
    return [...mockTasks];
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id: string, updatedTask: Partial<Task>): Promise<Task> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...updatedTask,
      updatedAt: new Date(),
    };
    return mockTasks[taskIndex];
  },

  async deleteTask(id: string): Promise<void> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    mockTasks.splice(taskIndex, 1);
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      status,
      updatedAt: new Date(),
    };
    return mockTasks[taskIndex];
  },
};