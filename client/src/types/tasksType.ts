//@/types/tasksType.ts

import { Goal } from "./goalsType";

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  relatedGoal?: Goal[];
  relatedToGoal: boolean;
  duration?: number;
  category?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// reference a goal
export interface TaskGoalReference {
  goalId?: string; // Optional since not all tasks need to be associated with a goal
}