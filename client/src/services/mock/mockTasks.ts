// services/mockTaskService.ts
import { Task, TaskStatus } from '@/types/tasksType';

// 模拟数据
const mockTasks: Task[] = [
  {
    id: '1',
    title: '完成用户注册功能',
    description: '实现用户注册表单和验证逻辑',
    status: 'todo' as TaskStatus,
    priority: 'high',
    duration: 15,
    relatedToGoal:false,
    dueDate: new Date('2024-03-20'),
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '2',
    title: '设计首页布局',
    description: '创建响应式首页设计',
    status: 'in-progress' as TaskStatus,
    priority: 'medium',
    duration: 120,
    relatedToGoal:false,
    dueDate: new Date('2024-03-23'),
    createdAt: new Date('2024-03-19'),
    updatedAt: new Date('2024-03-21'),
  },
  {
    id: '3',
    title: '优化性能',
    description: '减少页面加载时间',
    status: 'completed' as TaskStatus,
    priority: 'low',
    duration: 120,
    relatedToGoal:false,
    dueDate: new Date('2024-03-18'),
    createdAt: new Date('2024-03-18'),
    updatedAt: new Date('2024-03-22'),
  },
];

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockTaskService = {
  async getTasks(): Promise<Task[]> {
    await delay(500); // 模拟网络延迟
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