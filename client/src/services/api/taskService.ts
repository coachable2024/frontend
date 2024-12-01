// services/taskService.ts
import axios from 'axios';
import { Task, TaskStatus } from '@/types/tasksType';

const API_BASE_URL = 'http://localhost:8000/api'; // FastAPI runs on 8000 by default


export const taskService = {
  async getTasks(): Promise<Task[]> {
    try {
      const { data } = await axios.get(API_BASE_URL);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    console.log('Creating task:', task);
    try {
      const { data } = await axios.post(API_BASE_URL, task);
      return data;
    } catch (error) {
      throw new Error('Failed to create task');
    }
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}`, task);
      return data;
    } catch (error) {
      throw new Error('Failed to update task');
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/${id}/status`, { status });
      return data;
    } catch (error) {
      throw new Error('Failed to update task status');
    }
  }
};