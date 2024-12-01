// services/api/goalService.ts
import axios from 'axios';
import { Goal, GoalStatus } from '@/types/goalsType';

const API_BASE_URL = 'http://localhost:8000/api/goals'; // Adjust URL as needed

export const goalService = {
  async getGoals(): Promise<Goal[]> {
    try {
      const { data } = await axios.get(API_BASE_URL);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch goals');
    }
  },

  async getGoalById(id: string): Promise<Goal> {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/${id}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch goal');
    }
  },

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    try {
      const { data } = await axios.post(API_BASE_URL, goal);
      return data;
    } catch (error) {
      throw new Error('Failed to create goal');
    }
  },

  async updateGoal(id: string, goal: Partial<Goal>): Promise<Goal> {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}`, goal);
      return data;
    } catch (error) {
      throw new Error('Failed to update goal');
    }
  },

  async deleteGoal(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete goal');
    }
  },

  async addTaskToGoal(goalId: string, taskId: string): Promise<Goal> {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/${goalId}/tasks/${taskId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to add task to goal');
    }
  },

  async removeTaskFromGoal(goalId: string, taskId: string): Promise<Goal> {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/${goalId}/tasks/${taskId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to remove task from goal');
    }
  },

  async updateGoalStatus(id: string, status: GoalStatus): Promise<Goal> {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}/status`, { status });
      return data;
    } catch (error) {
      throw new Error('Failed to update goal status');
    }
  }
};