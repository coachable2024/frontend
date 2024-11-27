'use client';

import { useState } from 'react';
import Calendar from '@/components/features/calendar/Calendar';
import { TaskList } from '@/components/features/task/TaskList';
import GoalCard from '@/components/features/goals/GoalCard';
import { Task } from '@/types/task';
import { CalendarEvent } from '@/components/features/calendar/types';

const Dashboard = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Project Proposal',
      description: 'Draft and submit project proposal',
      dueDate: new Date('2024-11-20'),
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    console.log('New event:', event);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Current Goal</h2>
          <GoalCard 
            why="Your motivation here"
            actions={[{
              name: "Action 1",
              time: {hours: 10, minutes: 0},
              completed: false
            }]}
            reward="Your reward here"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tasks</h2>
          <TaskList
            tasks={tasks}
            onTaskClick={handleTaskClick}
            itemsPerPage={5}
          />
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Calendar</h2>
          <Calendar
            events={events}
            onEventAdd={handleEventAdd}
            onEventClick={handleEventClick}
            onCalendarSync={(type) => console.log(`Sync with ${type}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
