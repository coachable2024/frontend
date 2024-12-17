// types/goalsType.ts
import { Task } from './tasksType';

// Define the possible categories 
export type GoalCategory = 'goal' | 'habit';
export type SettingStatus = 'draft' | 'confirmed';


// Define the main Goal interface
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  relatedTasks?: Task[];
  targetDate: Date;
  startDate: Date;
  completedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  reward?: string;
  SettingStatus: string;
}

// Type for creating a new goal (omitting auto-generated fields)
export type CreateGoalDTO = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing goal (all fields optional except id)
export type UpdateGoalDTO = Partial<Omit<Goal, 'id'>> & { id: string };