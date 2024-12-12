import { DateTime } from "luxon";
import { Goal } from "./goalsType";

export type HabitFrequency = 'daily' | 'weekly';
export type HabitStatus = 'active' | 'paused' | 'archived';
export type SingleUnitStatus = 'completed' | 'missed'; // 'off day' has no TimeSlot

export interface WeeklySchedule {
  weekStartDate: DateTime;
  plannedDays: number[]; // Array of days (0-6 for Sun-Sat)
}

export interface HabitSchedule {
  frequency: HabitFrequency;
  preferredTime?: DateTime; // Default time if no specific time slot is set
  weeklySchedules?: WeeklySchedule[]; // For flexible weekly planning
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes 
  schedule: HabitSchedule;
  completedDates?: DateTime[];
  scheduledDates?: DateTime[];
  status: HabitStatus;
  createdAt: DateTime;
  updatedAt: DateTime;
  startDate: DateTime;
  endDate?: DateTime;
}