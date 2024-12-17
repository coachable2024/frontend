import { DateTime } from 'luxon';
import { Habit, HabitFrequency, HabitStatus } from '@/types/habitsType';

class MockHabitService {
  private habits: Habit[] = [
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start the day with mindfulness',
      duration: 15,
      schedule: {
        frequency: 'daily' as HabitFrequency,
        preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
        weeklySchedules: []
      },
      status: 'active' as HabitStatus,
      createdAt: DateTime.now().minus({ days: 30 }),
      updatedAt: DateTime.now(),
      startDate: DateTime.now().minus({ days: 30 }),
      // Future dates for next 30 days
      scheduledDates: Array.from({ length: 60 }).map((_, i) => 
        DateTime.now().plus({ days: i - 30 }).set({ hour: 7, minute: 0 })
      ),
      // Some completed dates in the past
      completedDates: Array.from({ length: 15 }).map((_, i) => 
        DateTime.now().minus({ days: i + 1 }).set({ hour: 7, minute: 0 })
      )
    },
    {
      id: '2',
      title: 'Evening Workout',
      description: 'Strength training and cardio',
      duration: 45, // 45 minutes
      schedule: {
        frequency: 'weekly' as HabitFrequency,
        preferredTime: DateTime.fromObject({ hour: 18, minute: 30 }),
        weeklySchedules: [{
          weekStartDate: DateTime.now().startOf('week'),
          plannedDays: [1, 3, 5] // Monday, Wednesday, Friday
        }]
      },
      status: 'active' as HabitStatus,
      createdAt: DateTime.now().minus({ days: 14 }),
      updatedAt: DateTime.now(),
      startDate: DateTime.now().minus({ days: 14 }),
      scheduledDates: Array.from({ length: 6 }).map((_, i) => 
        DateTime.now().minus({ weeks: i }).set({ weekday: 1, hour: 18, minute: 30 })
      ).concat(
        Array.from({ length: 6 }).map((_, i) => 
          DateTime.now().minus({ weeks: i }).set({ weekday: 3, hour: 18, minute: 30 })
        ),
        Array.from({ length: 6 }).map((_, i) => 
          DateTime.now().minus({ weeks: i }).set({ weekday: 5, hour: 18, minute: 30 })
        )
      )
    },
    {
      id: '3',
      title: 'Reading',
      description: 'Read a book for personal growth',
      duration: 30, // 30 minutes
      schedule: {
        frequency: 'daily' as HabitFrequency,
        preferredTime: DateTime.fromObject({ hour: 21, minute: 0 }),
        weeklySchedules: []
      },
      status: 'active' as HabitStatus,
      createdAt: DateTime.now().minus({ days: 7 }),
      updatedAt: DateTime.now(),
      startDate: DateTime.now().minus({ days: 7 }),
      scheduledDates: Array.from({ length: 7 }).map((_, i) => 
        DateTime.now().minus({ days: i }).set({ hour: 21, minute: 0 })
      )
    },
    {
      id: '4',
      title: 'Weekly Planning',
      description: 'Plan the week ahead',
      duration: 60, // 60 minutes
      schedule: {
        frequency: 'weekly' as HabitFrequency,
        preferredTime: DateTime.fromObject({ hour: 10, minute: 0 }),
        weeklySchedules: [{
          weekStartDate: DateTime.now().startOf('week'),
          plannedDays: [0] // Sunday
        }]
      },
      status: 'active' as HabitStatus,
      createdAt: DateTime.now().minus({ days: 21 }),
      updatedAt: DateTime.now(),
      startDate: DateTime.now().minus({ days: 21 }),
      scheduledDates: Array.from({ length: 3 }).map((_, i) => 
        DateTime.now().minus({ weeks: i }).startOf('week').set({ hour: 10, minute: 0 })
      )
    }
  ];

  async getHabits(): Promise<Habit[]> {
    return Promise.resolve(this.habits);
  }

  async updateHabit(id: string, habitData: Habit): Promise<Habit> {
    this.habits = this.habits.map(habit => 
      habit.id === id ? { ...habitData, updatedAt: DateTime.now() } : habit
    );
    return Promise.resolve(habitData);
  }

  async deleteHabit(id: string): Promise<void> {
    this.habits = this.habits.filter(habit => habit.id !== id);
    return Promise.resolve();
  }

  async createHabit(habitData: Omit<Habit, 'id'>): Promise<Habit> {
    const newHabit = {
      ...habitData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now()
    };
    this.habits.push(newHabit);
    return Promise.resolve(newHabit);
  }
}

export const mockHabitService = new MockHabitService();