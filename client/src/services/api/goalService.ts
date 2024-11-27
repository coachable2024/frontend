import { Goal, CreateGoalDTO } from '@/types/goalsType';

export const goalService = {
  createGoal: async (goal: CreateGoalDTO): Promise<Goal> => {
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