// types/goalsType.ts
import { Task } from './tasksType';

// Define the possible status values for a goal
export type GoalStatus = 'not-started' | 'in-progress' | 'completed' | 'cancelled';

// Define the possible categories 
export type GoalCategory = 'health' | 'finance' | 'relationship' | 'career' | 'personal';

// Define the main Goal interface
export interface Goal {
  id: string;
  title: string;
  motivation: string;
  status: GoalStatus;
  category: GoalCategory;
  relatedTasks?: Task[];
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
  reward: string;
  progress?: number;  // Optional progress percentage
  metrics?: {         // Optional metrics for tracking
    target: number;
    current: number;
    unit: string;
  };
}

// Type for creating a new goal (omitting auto-generated fields)
export type CreateGoalDTO = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing goal (all fields optional except id)
export type UpdateGoalDTO = Partial<Omit<Goal, 'id'>> & { id: string };