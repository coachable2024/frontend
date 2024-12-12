// import { DateTime } from 'luxon';
// import { 
//   Habit, 
//   HabitFrequency, 
//   HabitStatus, 
//   SingleUnitStatus,
//   WeeklySchedule,
//   MonthlySchedule
// } from '@/types/habitsType';

// // Mock initial habits data
// const mockHabits: Habit[] = [
//   {
//     id: '1',
//     title: 'Morning Meditation',
//     description: 'Start the day with 10 minutes of mindfulness',
//     schedule: {
//       frequency: 'daily' as HabitFrequency,
//       timesPerPeriod: 1,
//       defaultDuration: 10,
//       preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
//       timeSlots: [
//         {
//           date: DateTime.now().toFormat('yyyy-MM-dd'),
//           time: '07:00',
//           duration: 10,
//           completed: 'completed' as SingleUnitStatus,
//           note: ''
//         }
//       ]
//     },
//     progress: {
//       completedDates: [],
//       targetCompletionCount: 30,
//       actualCompletionCount: 15,
//       lastCompleted: DateTime.now()
//     },
//     status: 'active' as HabitStatus,
//     createdAt: DateTime.now(),
//     updatedAt: DateTime.now(),
//     startDate: DateTime.now()
//   },
//   {
//     id: '2',
//     title: 'Exercise Routine',
//     description: 'Strength training and cardio',
//     schedule: {
//       frequency: 'weekly' as HabitFrequency,
//       timesPerPeriod: 3,
//       defaultDuration: 45,
//       preferredTime: DateTime.fromObject({ hour: 18, minute: 0 }),
//       timeSlots: [],
//       weeklySchedules: [{
//         weekStartDate: DateTime.now().startOf('week'),
//         plannedDays: [1, 3, 5] // Monday, Wednesday, Friday
//       }]
//     },
//     progress: {
//       completedDates: [],
//       targetCompletionCount: 12,
//       actualCompletionCount: 8,
//       lastCompleted: DateTime.now().minus({ days: 2 })
//     },
//     status: 'active' as HabitStatus,
//     createdAt: DateTime.now().minus({ days: 30 }),
//     updatedAt: DateTime.now(),
//     startDate: DateTime.now().minus({ days: 30 })
//   },
//   {
//     id: '3',
//     title: 'Monthly Review',
//     description: 'Review goals and adjust plans',
//     schedule: {
//       frequency: 'monthly' as HabitFrequency,
//       timesPerPeriod: 1,
//       defaultDuration: 60,
//       preferredTime: DateTime.fromObject({ hour: 10, minute: 0 }),
//       timeSlots: [],
//       monthlySchedule: {
//         recurrenceType: 'dayOfMonth',
//         dayOfMonth: 1
//       }
//     },
//     progress: {
//       completedDates: [],
//       targetCompletionCount: 12,
//       actualCompletionCount: 3,
//       lastCompleted: DateTime.now().minus({ months: 1 })
//     },
//     status: 'active' as HabitStatus,
//     createdAt: DateTime.now().minus({ months: 3 }),
//     updatedAt: DateTime.now(),
//     startDate: DateTime.now().minus({ months: 3 })
//   }
// ];

// // Simulate network delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// class MockHabitService {
//   private habits: Habit[] = [...mockHabits];

//   async getHabits(): Promise<Habit[]> {
//     await delay(500); // Simulate network delay
//     return [...this.habits];
//   }

//   async getHabit(id: string): Promise<Habit | null> {
//     await delay(300);
//     const habit = this.habits.find(h => h.id === id);
//     return habit ? { ...habit } : null;
//   }

//   async createHabit(habitData: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Habit> {
//     await delay(500);
//     const newHabit: Habit = {
//       ...habitData,
//       id: Math.random().toString(36).substring(7),
//       createdAt: DateTime.now(),
//       updatedAt: DateTime.now()
//     };
//     this.habits.push(newHabit);
//     return { ...newHabit };
//   }

//   async updateHabit(id: string, habitData: Partial<Habit>): Promise<Habit> {
//     await delay(500);
//     const index = this.habits.findIndex(h => h.id === id);
//     if (index === -1) throw new Error('Habit not found');

//     const updatedHabit: Habit = {
//       ...this.habits[index],
//       ...habitData,
//       id, // Ensure ID doesn't change
//       updatedAt: DateTime.now()
//     };
//     this.habits[index] = updatedHabit;
//     return { ...updatedHabit };
//   }

//   async deleteHabit(id: string): Promise<void> {
//     await delay(300);
//     const index = this.habits.findIndex(h => h.id === id);
//     if (index === -1) throw new Error('Habit not found');
//     this.habits.splice(index, 1);
//   }

//   async updateHabitStatus(id: string, status: HabitStatus): Promise<Habit> {
//     await delay(300);
//     const index = this.habits.findIndex(h => h.id === id);
//     if (index === -1) throw new Error('Habit not found');

//     const updatedHabit: Habit = {
//       ...this.habits[index],
//       status,
//       updatedAt: DateTime.now()
//     };
//     this.habits[index] = updatedHabit;
//     return { ...updatedHabit };
//   }

//   async updateTimeSlot(
//     habitId: string, 
//     date: string, 
//     status: SingleUnitStatus | null, 
//     note?: string
//   ): Promise<Habit> {
//     await delay(300);
//     const index = this.habits.findIndex(h => h.id === habitId);
//     if (index === -1) throw new Error('Habit not found');

//     const habit = { ...this.habits[index] };
//     const timeSlots = [...habit.schedule.timeSlots];
//     const slotIndex = timeSlots.findIndex(slot => slot.date === date);

//     if (status === null) {
//       // Remove time slot if exists
//       if (slotIndex !== -1) {
//         timeSlots.splice(slotIndex, 1);
//       }
//     } else {
//       const newSlot = {
//         date,
//         time: habit.schedule.preferredTime?.toFormat('HH:mm') || '09:00',
//         duration: habit.schedule.defaultDuration,
//         completed: status,
//         note: note || ''
//       };

//       if (slotIndex !== -1) {
//         timeSlots[slotIndex] = newSlot;
//       } else {
//         timeSlots.push(newSlot);
//       }
//     }

//     const updatedHabit: Habit = {
//       ...habit,
//       schedule: {
//         ...habit.schedule,
//         timeSlots
//       },
//       updatedAt: DateTime.now()
//     };
//     this.habits[index] = updatedHabit;
//     return { ...updatedHabit };
//   }
// }

// export const mockHabitService = new MockHabitService();

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