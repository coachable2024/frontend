// types/tasks.ts
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  category?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// reference a goal
export interface TaskGoalReference {
  goalId?: string; // Optional since not all tasks need to be associated with a goal
}