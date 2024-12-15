'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '@/types/tasksType';
import { Habit } from '@/types/habitsType';
import { Goal } from '@/types/goalsType';
import { mockTaskService } from '@/services/mock/mockTasks';
import { mockHabitService } from '@/services/mock/mockHabits';
import { goalService } from '@/services';
import { DateTime } from 'luxon';
import { format } from 'date-fns';

const GoalsList = ({ goals }: { goals: Goal[] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Goals Overview</h2>
          <div className="space-y-3">
            {goals.map(goal => {
              const completedTasks = goal.relatedTasks?.filter(task => task.status === 'completed').length || 0;
              const totalTasks = goal.relatedTasks?.length || 0;

              return (
                <div key={goal.id} className="bg-blue-50/50 rounded-lg p-4">
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Category: {goal.category}</span>
                    <span>{completedTasks}/{totalTasks} tasks completed</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {goals.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No goals set yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DailySchedule = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedTasks, fetchedHabits, fetchedGoals] = await Promise.all([
          mockTaskService.getTasks(),
          mockHabitService.getHabits(),
          goalService.getGoals()
        ]);
        
        setTasks(fetchedTasks);
        setHabits(fetchedHabits);
        setGoals(fetchedGoals);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const today = DateTime.now().startOf('day');
  const todaysTasks = tasks.filter(task => 
    task.startTime?.hasSame(today, 'day')
  );

  const todaysHabits = habits.filter(habit => 
    habit.scheduledDates?.some(date => 
      date.hasSame(today, 'day')
    )
  );

  const allEvents = [
    ...todaysTasks.map(task => ({
      ...task,
      type: 'task' as const,
      time: task.startTime!,
      duration: task.duration || 0
    })),
    ...todaysHabits.map(habit => ({
      ...habit,
      type: 'habit' as const,
      time: habit.scheduledDates?.find(date => date.hasSame(today, 'day'))!,
      duration: habit.duration
    }))
  ].sort((a, b) => a.time.toMillis() - b.time.toMillis());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <GoalsList goals={goals} />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <button className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>

        <div className="space-y-3">
          {allEvents.map((event) => (
            <div
              key={`${event.type}-${event.id}`}
              className={`${
                event.type === 'task' ? 'bg-blue-50' : 'bg-pink-50'
              } rounded-lg p-4`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {event.type === 'task' ? '✏️' : '📝'}
                  </span>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.time.toFormat('HH:mm')} - {event.time.plus({ minutes: event.duration }).toFormat('HH:mm')}
                    </p>
                  </div>
                </div>
                <button className="text-sm px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                  Reschedule
                </button>
              </div>
            </div>
          ))}

          {allEvents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No activities scheduled for today
            </div>
          )}
        </div>

        <button className="w-full mt-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          + Add Activity
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailySchedule />
      </div>
    </div>
  );
};

export default Dashboard;