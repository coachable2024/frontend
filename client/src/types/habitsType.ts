import { DateTime } from "luxon";
import { Goal } from "./goalsType";

export type HabitFrequency = 'daily' | 'weekly';
export type HabitStatus = 'active' | 'paused' | 'archived';
export type SingleUnitStatus = 'completed' | 'missed';

export interface WeeklySchedule {
  weekStartDate: DateTime;
  plannedDays: number[];
}

export interface HabitProgress {
  completedDates: DateTime[];
  targetCompletionCount: number;
  actualCompletionCount: number;
  lastCompleted: DateTime;
}

export interface HabitSchedule {
  frequency: HabitFrequency;
  timesPerPeriod: number;
  defaultDuration: number;
  preferredTime?: DateTime;
  timeSlots: any[];
  weeklySchedules?: WeeklySchedule[];
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  schedule: HabitSchedule;
  completedDates?: DateTime[];
  scheduledDates?: DateTime[];
  status: HabitStatus;
  createdAt: DateTime;
  updatedAt: DateTime;
  startDate: DateTime;
  endDate?: DateTime;
}