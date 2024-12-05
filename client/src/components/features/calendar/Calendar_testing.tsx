'use client'

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Pencil,
} from 'lucide-react';
import type { Task } from '@/types/tasksType';
import { DateTime } from 'luxon';

// Props interface definitions
interface CalendarProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

interface ViewProps {
  currentDate: Date;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

// Utility function to calculate event position and duration
const calculateEventPosition = (task: Task) => {
  if (!task.startTime || !task.duration) return null;
  
  const startHour = task.startTime.hour;
  const startMinute = task.startTime.minute;
  const durationInMinutes = task.duration;
  
  const startPosition = (startHour * 80) + (startMinute / 60 * 80);
  const endPosition = startPosition + (durationInMinutes / 60 * 80);
  
  return {
    top: `${startPosition}px`,
    height: `${endPosition - startPosition}px`
  };
};

// DailyView Component
const DailyView: React.FC<ViewProps> = ({ currentDate, tasks, onEditTask }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const dailyTasks = tasks.filter(task => 
    task.startTime?.hasSame(DateTime.fromJSDate(currentDate), 'day')
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="border-b p-4">
        <h3 className="font-medium text-center">{formatDate(currentDate)}</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <div className="w-20 flex-shrink-0 border-r">
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b p-2 text-sm text-gray-500">
                {time}
              </div>
            ))}
          </div>

          <div className="flex-1 relative">
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b" />
            ))}

            <div className="absolute inset-0 p-2">
              {dailyTasks.map((task) => {
                const position = calculateEventPosition(task);
                if (!position) return null;

                return (
                  <div
                    key={task.id}
                    className="absolute left-2 right-2 p-3 rounded-lg bg-blue-100 text-blue-600 hover:shadow-md transition-shadow cursor-pointer"
                    style={position}
                    onClick={() => onEditTask(task)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pencil size={16} />
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs">
                            {task.startTime?.toFormat('HH:mm')} - {task.startTime?.plus({ minutes: task.duration || 0 }).toFormat('HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                    {task.description && (
                      <div className="mt-1 text-sm text-gray-600">
                        {task.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// WeeklyView Component
const WeeklyView: React.FC<ViewProps> = ({ currentDate, tasks, onEditTask }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="border-b">
        <div className="grid grid-cols-8">
          <div className="p-4 border-r"></div>
          {weekDates.map((date, idx) => (
            <div key={idx} className="p-4 text-center">
              <div className="font-medium">{daysOfWeek[idx]}</div>
              <div className="text-sm text-gray-500">{date.getDate()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8">
          <div className="border-r">
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b p-2 text-sm text-gray-500">
                {time}
              </div>
            ))}
          </div>

          {weekDates.map((date, dayIndex) => (
            <div key={dayIndex} className="relative border-r">
              {timeSlots.map((time) => (
                <div key={time} className="h-20 border-b" />
              ))}

              <div className="absolute inset-0 p-1">
                {tasks
                  .filter(task => task.startTime?.hasSame(DateTime.fromJSDate(date), 'day'))
                  .map((task) => {
                    const position = calculateEventPosition(task);
                    if (!position) return null;

                    return (
                      <div
                        key={task.id}
                        className="absolute left-1 right-1 p-1 rounded-lg bg-blue-100 text-blue-600 hover:shadow-md transition-shadow cursor-pointer"
                        style={position}
                        onClick={() => onEditTask(task)}
                      >
                        <div className="flex items-center gap-1">
                          <Pencil size={16} />
                          <div className="truncate">
                            <div className="font-medium text-sm truncate">{task.title}</div>
                            <div className="text-xs truncate">
                              {task.startTime?.toFormat('HH:mm')} - {task.startTime?.plus({ minutes: task.duration || 0 }).toFormat('HH:mm')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// MonthlyView Component
const MonthlyView: React.FC<ViewProps> = ({ currentDate, tasks, onEditTask }) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = new Date(year, month, -i + 1);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, isCurrentMonth: true });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    return days;
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.startTime?.hasSame(DateTime.fromJSDate(date), 'day')
    );
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth();

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="grid grid-cols-7 border-b">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-4 text-sm font-medium text-center border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-3rem)]">
        {days.map(({ date, isCurrentMonth }, index) => (
          <div
            key={index}
            className={`border-r border-b last:border-r-0 p-2 ${
              isCurrentMonth ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className={`text-sm mb-1 ${
              isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {date.getDate()}
            </div>

            <div className="space-y-1">
              {getTasksForDate(date).slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="bg-blue-100 text-blue-600 text-xs p-1 rounded truncate cursor-pointer"
                  onClick={() => onEditTask(task)}
                >
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Calendar Component
const TaskCalendar: React.FC<CalendarProps> = ({ tasks, onEditTask }) => {
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateDate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const renderView = () => {
    switch(view) {
      case 'day':
        return <DailyView currentDate={currentDate} tasks={tasks} onEditTask={onEditTask} />;
      case 'week':
        return <WeeklyView currentDate={currentDate} tasks={tasks} onEditTask={onEditTask} />;
      case 'month':
        return <MonthlyView currentDate={currentDate} tasks={tasks} onEditTask={onEditTask} />;
      default:
        return <WeeklyView currentDate={currentDate} tasks={tasks} onEditTask={onEditTask} />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setView('day')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  view === 'day' ? 'bg-white shadow' : ''
                }`}
              >
                Day
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  view === 'week' ? 'bg-white shadow' : ''
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  view === 'month' ? 'bg-white shadow' : ''
                }`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <button 
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium"
              >
                Today
              </button>
              <button 
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {renderView()}
      </div>
    </div>
  );
};

export default TaskCalendar;