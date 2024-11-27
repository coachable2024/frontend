'use client';

import { useState } from 'react';
import Calendar from '@/components/calendar/Calendar';
import { TaskList } from '@/components/task/TaskList';
import GoalCard from '@/components/goals/GoalCard';
import { Task } from '@/types/tasksType'; // Adjust import path as needed
import { calendarEvent as CalendarEvent } from '@/types/calendarType';  // Add this import

const Dashboard = () => {
// app/dashboard/page.tsx

const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Sample data - replace with your actual data fetching logic
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
    },
    // Add more sample tasks as needed
  ]);


  const handleTaskClick = (task: Task) => {
    // Handle task click - maybe open a modal or navigate to task details
    console.log('Task clicked:', task);
  };

  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    // Handle adding new calendar events
    console.log('New event:', event);
  };

  const handleEventClick = (event: CalendarEvent) => {
    // Handle calendar event clicks
    console.log('Event clicked:', event);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-1/2 space-y-6">
          {/* Goal Card Section */}
          <div className="bg-white rounded-lg shadow">
            <GoalCard 
              motivation ="Your motivation here"
              actions={[{
                name: "Action 1",
                time: {hours: 10, minutes: 0},
                completed: false
              }]}
              reward="Your reward here"
            />
          </div>

          {/* Task List Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <TaskList
              tasks={tasks}
              onTaskClick={handleTaskClick}
              itemsPerPage={5}
            />
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar
              calendarEvents={events}
              onEventAdd={handleEventAdd}
              onEventClick={handleEventClick}
              onCalendarSync={(type) => console.log(`Sync with ${type}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
