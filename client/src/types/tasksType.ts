//@/types/tasksType.ts
import { DateTime } from "luxon";
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
  relatedGoal?: Goal; // changed to one-to-one
  // relatedToGoal: boolean;
  duration?: number; // unit: minute
  createdAt: Date;
  updatedAt: Date;
  startTime: DateTime;
}

// reference a goal
export interface TaskGoalReference {
  goalId?: string; // Optional since not all tasks need to be associated with a goal
}