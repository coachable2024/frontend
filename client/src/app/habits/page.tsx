'use client'
import React, { useState } from 'react';
import { PlusCircle, Heart, Calendar, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { Habit, HabitFrequency, HabitStatus } from '@/types/habitsType';
import HabitForm from '@/components/features/habits/HabitForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import HabitItem from '@/components/features/habits/HabitCard';

const HabitPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      schedule: {
        frequency: 'daily',
        timesPerPeriod: 1,
        defaultDuration: 10,
        preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
        timeSlots: []
      },
      progress: {
        completedDates: [],
        targetCompletionCount: 30,
        actualCompletionCount: 15,
        lastCompleted: DateTime.now()
      },
      status: 'active',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      startDate: DateTime.now()
    },
    {
      id: '2',
      title: 'Evening Workout',
      description: 'Strength training and cardio',
      schedule: {
        frequency: 'weekly',
        timesPerPeriod: 3,
        defaultDuration: 45,
        preferredTime: DateTime.fromObject({ hour: 18, minute: 0 }),
        timeSlots: [],
        weeklySchedules: [{
          weekStartDate: DateTime.now().startOf('week'),
          plannedDays: [1, 3, 5] // Monday, Wednesday, Friday
        }]
      },
      progress: {
        completedDates: [],
        targetCompletionCount: 12,
        actualCompletionCount: 8,
        lastCompleted: DateTime.now()
      },
      status: 'active',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      startDate: DateTime.now()
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const generateScheduledDates = (habit: Habit): DateTime[] => {
    const startDate = DateTime.now().startOf('day');
    const endDate = startDate.plus({ years: 1 });
    const dates: DateTime[] = [];
  
    let currentDate = startDate;
    while (currentDate <= endDate) {
      if (habit.schedule.frequency === 'daily') {
        dates.push(currentDate);
      } else if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
        const plannedDays = habit.schedule.weeklySchedules[0].plannedDays;
        if (plannedDays.includes(currentDate.weekday)) {
          dates.push(currentDate);
        }
      }
      currentDate = currentDate.plus({ days: 1 });
    }

    // If there's a preferred time, adjust all dates to that time
    if (habit.schedule.preferredTime) {
      const hour = habit.schedule.preferredTime.hour;
      const minute = habit.schedule.preferredTime.minute;
      return dates.map(date => 
        date.set({ hour, minute })
      );
    }

    return dates;
  };

  const handleToggleComplete = (id: string, isCompleting: boolean) => {
    setHabits(currentHabits => 
      currentHabits.map(habit => {
        if (habit.id === id) {
          const currentDate = DateTime.now();
          if (isCompleting) {
            // Add current date to scheduledDates if completing
            return {
              ...habit,
              scheduledDates: [...(habit.scheduledDates || []), currentDate],
              updatedAt: currentDate
            };
          } else {
            // Remove current date from scheduledDates if uncompleting
            return {
              ...habit,
              scheduledDates: (habit.scheduledDates || []).filter(date => 
                !date.hasSame(currentDate, 'day')
              ),
              updatedAt: currentDate
            };
          }
        }
        return habit;
      })
    );
  };

  const handleAddHabit = (newHabit: Habit) => {
    const scheduledDates = generateScheduledDates(newHabit);
    const habitWithDates = {
      ...newHabit,
      scheduledDates,
      completedDates: [] 
    };
    
    setHabits(current => [...current, habitWithDates]);
    setIsOpen(false);
    setEditingHabit(undefined);
  };

  const handleEditHabit = (updatedHabit: Habit) => {
    setHabits(currentHabits => 
      currentHabits.map(habit => 
        habit.id === updatedHabit.id ? { ...updatedHabit, updatedAt: DateTime.now() } : habit
      )
    );
    setIsOpen(false);
    setEditingHabit(undefined);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(currentHabits => currentHabits.filter(habit => habit.id !== id));
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingHabit(undefined);
  };

  const getFilteredHabits = (status: HabitStatus) => {
    return habits.filter(habit => habit.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="text-rose-500" /> 
                Habits & Self-Care
              </h1>
              <p className="text-gray-500 mt-1">Track and maintain your daily routines</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Habit
            </button>
          </div>
        </div>

        {/* Active Habits */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Habits</h2>
          <div className="space-y-3">
            {getFilteredHabits('active').map(habit => (
              <HabitItem 
                key={habit.id}
                habit={habit}
                onDelete={handleDeleteHabit}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {habits.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
            <p className="text-gray-500 mt-2">Start building your daily routines</p>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Habit
            </button>
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl">
            <HabitForm 
              onSubmit={editingHabit ? handleEditHabit : handleAddHabit}
              initialData={editingHabit}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HabitPage;