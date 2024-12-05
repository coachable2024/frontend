'use client'
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Pencil,
  Brain,
  Heart,
  MoreVertical,
  MoreHorizontal
} from 'lucide-react';

// DailyView Component
const DailyView = ({ currentDate, events }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const calculateEventPosition = (event) => {
    const [startHour, startMinute] = event.start.split(':').map(Number);
    const [endHour, endMinute] = event.end.split(':').map(Number);
    
    const startPosition = (startHour * 80) + (startMinute / 60 * 80);
    const endPosition = (endHour * 80) + (endMinute / 60 * 80);
    const height = endPosition - startPosition;
    
    return {
      top: `${startPosition}px`,
      height: `${height}px`
    };
  };

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
              <div key={time} className="h-20 border-b p-2">
                <div className="h-full w-full group hover:bg-blue-50/50 transition-colors relative">
                  <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Plus className="text-gray-400" size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div 
              className="absolute left-0 right-0 border-t-2 border-red-500 z-20"
              style={{
                top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px`
              }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full -mt-1 -ml-1"></div>
            </div>

            <div className="absolute inset-0 p-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`absolute left-2 right-2 p-3 rounded-lg ${event.color} mb-1 hover:shadow-md transition-shadow`}
                  style={calculateEventPosition(event)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {event.icon}
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs">
                          {event.start} - {event.end}
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-black/5 rounded">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  {event.description && (
                    <div className="mt-1 text-sm text-gray-600">
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// WeeklyView Component
const WeeklyView = ({ currentDate, events }) => {
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

  const calculateEventPosition = (event) => {
    const [startHour, startMinute] = event.start.split(':').map(Number);
    const [endHour, endMinute] = event.end.split(':').map(Number);
    
    const startPosition = (startHour * 80) + (startMinute / 60 * 80);
    const endPosition = (endHour * 80) + (endMinute / 60 * 80);
    const height = endPosition - startPosition;
    
    return {
      top: `${startPosition}px`,
      height: `${height}px`
    };
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const weekDates = getWeekDates();

  const formatMonthYear = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="border-b">
        <div className="px-4 py-2 border-b">
          <h3 className="font-medium text-gray-600">{formatMonthYear(currentDate)}</h3>
        </div>
        <div className="grid grid-cols-8">
          <div className="p-4 border-r"></div>
          {weekDates.map((date, idx) => (
            <div 
              key={idx}
              className={`p-4 text-center ${isToday(date) ? 'bg-blue-50' : ''}`}
            >
              <div className="font-medium">{daysOfWeek[idx]}</div>
              <div className={`text-sm ${isToday(date) ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {date.getDate()}
              </div>
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
                <div key={time} className="h-20 border-b">
                  <div className="h-full w-full group hover:bg-blue-50/50 transition-colors relative">
                    <button className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <Plus className="text-blue-500" size={20} />
                    </button>
                  </div>
                </div>
              ))}

              {isToday(date) && (
                <div 
                  className="absolute left-0 right-0 border-t-2 border-red-500 z-20"
                  style={{
                    top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px`
                  }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full -mt-1 -ml-1"></div>
                </div>
              )}

              <div className="absolute inset-0 p-1 pointer-events-none">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`absolute left-1 right-1 p-1 rounded-lg ${event.color} mb-1 pointer-events-auto cursor-pointer hover:shadow-md transition-shadow`}
                    style={calculateEventPosition(event)}
                  >
                    <div className="flex items-center gap-1">
                      {event.icon}
                      <div className="truncate">
                        <div className="font-medium text-sm truncate">{event.title}</div>
                        <div className="text-xs truncate">
                          {event.start} - {event.end}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// MonthlyView Component
const MonthlyView = ({ currentDate, events }) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    // Get days from previous month to fill first week
    for (let i = firstDayOfWeek; i > 0; i--) {
      const day = new Date(year, month, -i + 1);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Get days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, isCurrentMonth: true });
    }
    
    // Get days from next month to fill last week
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth();
  
  const formatMonthYear = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="px-4 py-2 border-b">
        <h3 className="font-medium text-gray-600">{formatMonthYear(currentDate)}</h3>
      </div>
      
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
              isToday(date) 
                ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {date.getDate()}
            </div>

            <div className="space-y-1">
              {getEventsForDate(date).slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className={`${event.color} text-xs p-1 rounded truncate`}
                >
                  {event.title}
                </div>
              ))}
              {getEventsForDate(date).length > 3 && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MoreHorizontal size={12} />
                  <span>{getEventsForDate(date).length - 3} more</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Calendar Component
const CalendarComponent = () => {
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Update Portfolio",
      date: "2024-12-04",
      start: "09:00",
      end: "10:30",
      type: "task",
      color: "bg-blue-100 text-blue-600",
      icon: <Pencil size={16}/>,
      description: "Work on personal website and portfolio projects"
    },
    {
      id: 2,
      title: "Morning Meditation",
      date: "2024-12-04",
      start: "07:00",
      end: "07:30",
      type: "habit",
      color: "bg-purple-100 text-purple-600",
      icon: <Brain size={16} />,
      description: "Daily mindfulness practice"
    },
    {
      id: 3,
      title: "Evening Walk",
      date: "2024-12-15",
      start: "18:00",
      end: "18:30",
      type: "selfcare",
      color: "bg-rose-100 text-rose-600",
      icon: <Heart size={16} />,
      description: "30-minute walk around the neighborhood"
    }
  ]);

  const navigateDate = (direction) => {
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
        return <DailyView currentDate={currentDate} events={events} />;
      case 'week':
        return <WeeklyView currentDate={currentDate} events={events} />;
      case 'month':
        return <MonthlyView currentDate={currentDate} events={events} />;
      default:
        return <WeeklyView currentDate={currentDate} events={events} />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Calendar Header */}
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

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              Add Event
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        {renderView()}
      </div>
    </div>
  );
};

export default CalendarComponent;