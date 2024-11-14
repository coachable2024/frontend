// types/task.ts
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string;
  category?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}