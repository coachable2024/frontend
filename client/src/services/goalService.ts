import { Goal, CreateGoalDto } from '../types/goals/goals';

export const goalService = {
  createGoal: async (goal: CreateGoalDto): Promise<Goal> => {
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create goal');
    }
    
    return response.json();
  },
};