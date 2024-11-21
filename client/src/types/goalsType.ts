// types/goals/goals.ts

// Define the possible status values for a goal
export type GoalStatus = 'not-started' | 'in-progress' | 'completed' | 'cancelled';

// Define the possible priority levels
export type GoalPriority = 'low' | 'medium' | 'high';

// Define the main Goal interface
export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  priority: GoalPriority;
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
  progress?: number;  // Optional progress percentage
  category?: string;  // Optional category
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