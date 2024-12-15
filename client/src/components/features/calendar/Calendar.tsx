import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Pencil,
  Brain
} from 'lucide-react';
import { Task } from '@/types/tasksType';
import { Habit } from '@/types/habitsType';
import { DateTime } from 'luxon';
import  Tooltip  from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

interface CalendarProps {
  tasks?: Task[];
  habits?: Habit[];
  onEditTask?: (task: Task) => void;
  onEditHabit?: (habit: Habit) => void;
}

interface ViewProps extends CalendarProps {
  currentDate: Date;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const formatMonthYear = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// Calculate position for both tasks and habits
const calculateEventPosition = (datetime: DateTime, duration: number) => {
  const startHour = datetime.hour;
  const startMinute = datetime.minute;
  const startPosition = (startHour * 80) + (startMinute / 60 * 80);
  const heightPosition = (duration / 60 * 80);
  
  return {
    top: `${startPosition}px`,
    height: `${heightPosition}px`
  };
};


const HabitEventTab = ({ 
  habit, 
  scheduledDate, 
  onClick,
  isWeekView = false  // Add this prop
}: {
  habit: Habit;
  scheduledDate: DateTime;
  onClick: () => void;
  isWeekView?: boolean;
}) => {
  const heightInPixels = habit.duration * (80/60);
  const isShortEvent = heightInPixels < 30;

  // Even more compact layout for week view or short events
  if (isWeekView || isShortEvent) {
    return (
      <div
        onClick={onClick}
        className="absolute left-1 right-1 rounded-md bg-pink-100 text-pink-600 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
        style={{
          top: `${(scheduledDate.hour * 60 + scheduledDate.minute) * (80/60)}px`,
          height: `${heightInPixels}px`
        }}
      >
        <div className="flex items-center h-full px-1 gap-1">
          <Brain className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs font-medium truncate">
            {habit.title}
          </span>
        </div>
      </div>
    );
  }

  // Regular layout for daily view normal height events
  return (
    <div
      onClick={onClick}
      className="absolute left-1 right-1 p-1 rounded-lg bg-pink-100 text-pink-600 hover:shadow-md transition-shadow cursor-pointer"
      style={{
        top: `${(scheduledDate.hour * 60 + scheduledDate.minute) * (80/60)}px`,
        height: `${heightInPixels}px`
      }}
    >
      <div className="flex items-center gap-1">
        <Brain className="w-4 h-4 flex-shrink-0" />
        <div className="truncate flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{habit.title}</div>
          <div className="text-xs truncate">
            {scheduledDate.toFormat('HH:mm')} - {scheduledDate.plus({ minutes: habit.duration }).toFormat('HH:mm')}
          </div>
        </div>
      </div>
    </div>
  );
};

const HabitDot = ({ habit, onClick }: { habit: Habit; onClick: () => void }) => (
  <Tooltip
    content={habit.title}
    className="px-2 py-1 bg-gray-800 text-white text-xs rounded"
  >
    <div
      onClick={onClick}
      className="w-2 h-2 rounded-full bg-pink-400 cursor-pointer"
    />
  </Tooltip>
);

const TaskEventTab = ({ task, onClick }: {
  task: Task;
  onClick: () => void;
}) => {
  const heightInPixels = (task.duration || 0) * (80/60);
  const isShortEvent = heightInPixels < 30;
  const position = calculateEventPosition(task.startTime!, task.duration || 0);

  if (isShortEvent) {
    // Compact layout for short events
    return (
      <div
        onClick={onClick}
        className="absolute left-1 right-1 rounded-md bg-blue-100 text-blue-600 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
        style={position}
      >
        <div className="flex items-center h-full px-1 gap-1">
          <Pencil className="w-3 h-3 flex-shrink-0" />
          <span className="text-xs font-medium truncate">
            {task.title}
          </span>
        </div>
      </div>
    );
  }

  // Regular layout for normal height events
  return (
    <div
      onClick={onClick}
      className="absolute left-1 right-1 p-1 rounded-lg bg-blue-100 text-blue-600 hover:shadow-md transition-shadow cursor-pointer"
      style={position}
    >
      <div className="flex items-center gap-1">
        <Pencil className="w-4 h-4 flex-shrink-0" />
        <div className="truncate flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{task.title}</div>
          <div className="text-xs truncate">
            {task.startTime?.toFormat('HH:mm')} - {task.startTime?.plus({ minutes: task.duration || 0 }).toFormat('HH:mm')}
          </div>
        </div>
      </div>
    </div>
  );
};

const DailyView: React.FC<ViewProps> = ({ currentDate, tasks = [], habits = [], onEditTask, onEditHabit }) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const currentDateTime = DateTime.fromJSDate(currentDate);

  const dailyTasks = tasks.filter(task => 
    task.startTime?.hasSame(currentDateTime, 'day')
  );

  const dailyHabits = habits.filter(habit => 
    habit.scheduledDates?.some(date => 
      date.hasSame(currentDateTime, 'day')
    )
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

            {/* Current time marker */}
            {isToday(currentDate) && (
              <div 
                className="absolute left-0 right-0 z-20 pointer-events-none"
                style={{
                  top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px`
                }}
              >
                <div className="border-t-2 border-red-500" />
                <div className="absolute left-0 w-2 h-2 bg-red-500 rounded-full -mt-1" />
              </div>
            )}

            <div className="absolute inset-0 p-2">
              {/* Tasks */}

              {dailyTasks.map((task) => (
                <TaskEventTab
                  key={task.id}
                  task={task}
                  onClick={() => onEditTask?.(task)}
                />
              ))} 


              {dailyHabits.map((habit) => {
              const scheduledDate = habit.scheduledDates?.find(date => 
                date.hasSame(currentDateTime, 'day')
              );
  
              if (!scheduledDate) return null;

              return (
                <HabitEventTab
                  key={habit.id}
                  habit={habit}
                  scheduledDate={scheduledDate}
                  onClick={() => onEditHabit?.(habit)}
                />
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeeklyView: React.FC<ViewProps> = ({ currentDate, tasks, habits, onEditHabit }) => {
  const router = useRouter();

  const handleHabitClick = (habit: Habit) => {
    router.push(`/habits/${habit.id}`); // Adjust the route according to your app
  };
  
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
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg border min-h-[600px] overflow-hidden">
      <div className="border-b flex-shrink-0">
        <div className="px-4 py-2 border-b">
          <h3 className="font-medium text-center">{formatMonthYear(currentDate)}</h3>
        </div>
        <div className="grid grid-cols-8" style={{ marginRight: '17px' }}>
          <div className="p-4 border-r"></div>
          {weekDates.map((date, idx) => (
            <div key={idx} className={`p-4 text-center ${isToday(date) ? 'bg-blue-50' : ''}`}>
              <div className="font-medium">{daysOfWeek[idx]}</div>
              <div className={`text-sm ${
                isToday(date) 
                  ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto'
                  : 'text-gray-500'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative min-h-0">
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

              {/* Current time marker */}
              {isToday(date) && (
                <div 
                  className="absolute left-0 right-0 z-20 pointer-events-none"
                  style={{
                    top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px`
                  }}
                >
                  <div className="border-t-2 border-red-500" />
                  <div className="absolute left-0 w-2 h-2 bg-red-500 rounded-full -mt-1" />
                </div>
              )}

              <div className="absolute inset-0 p-1">
                {/* Tasks */}
                {/* {tasks
                  .filter(task => task.startTime?.hasSame(DateTime.fromJSDate(date), 'day'))
                  .map((task) => {
                    const position = calculateEventPosition(task.startTime!, task.duration || 0);
                    return (
                      <div
                        key={task.id}
                        className="absolute left-1 right-1 p-1 rounded-lg bg-blue-100 text-blue-600 hover:shadow-md transition-shadow cursor-pointer"
                        style={position}
                        onClick={() => onEditTask?.(task)}
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
                  })} */}

                  {/* Replace this in WeeklyView */}
                  {tasks
                    .filter(task => task.startTime?.hasSame(DateTime.fromJSDate(date), 'day'))
                    .map((task) => (
                      <TaskEventTab
                        key={task.id}
                        task={task}
                        onClick={() => onEditTask?.(task)}
                      />
                    ))}

                {/* Habits */}
                {habits
              .filter(habit => 
                habit.scheduledDates?.some(scheduledDate => 
                  scheduledDate.hasSame(DateTime.fromJSDate(date), 'day')
                )
              )
              .map((habit) => {
                const scheduledDate = habit.scheduledDates?.find(d => 
                  d.hasSame(DateTime.fromJSDate(date), 'day')
                );
                if (!scheduledDate) return null;

                return (
                  <HabitEventTab
                    key={habit.id}
                    habit={habit}
                    scheduledDate={scheduledDate}
                    onClick={() => handleHabitClick(habit)}
                  />
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

// MonthlyView Component preserved from original
const MonthlyView: React.FC<ViewProps> = ({ currentDate, tasks, habits, onEditTask, onEditHabit }) => {
    
  
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

  // const getEventsForDate = (date: Date) => {
  //   const dateTime = DateTime.fromJSDate(date);
  //   const tasksForDate = tasks.filter(task => 
  //     task.startTime?.hasSame(dateTime, 'day')
  //   );
  //   const habitsForDate = habits.filter(habit => 
  //     habit.scheduledDates?.some(scheduledDate => 
  //       scheduledDate.hasSame(dateTime, 'day')
  //     )
  //   );

  //   return [...tasksForDate.map(task => ({
  //     id: task.id,
  //     title: task.title,
  //     type: 'task',
  //     item: task
  //   })), ...habitsForDate.map(habit => ({
  //     id: habit.id,
  //     title: habit.title,
  //     type: 'habit',
  //     item: habit
  //   }))];
  // };

  const getEventsForDate = (date: Date) => {
    const dateTime = DateTime.fromJSDate(date);
    // Only return tasks, not habits
    const tasksForDate = tasks.filter(task => 
      task.startTime?.hasSame(dateTime, 'day')
    );
  
    return tasksForDate.map(task => ({
      id: task.id,
      title: task.title,
      type: 'task',
      item: task
    }));
  };

  const days = getDaysInMonth();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-lg border">
      <div className="px-4 py-2 border-b">
        <h3 className="font-medium text-center">{formatMonthYear(currentDate)}</h3>
      </div>
      <div className="grid grid-cols-7 border-b">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-4 text-sm font-medium text-center border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-6rem)]">
{days.map(({ date, isCurrentMonth }, index) => (
  <div
    key={index}
    className={`border-r border-b last:border-r-0 p-2 ${
      isCurrentMonth ? 'bg-white' : 'bg-gray-50'
    } ${isToday(date) ? 'bg-blue-50' : ''}`}
  >
    {/* Date number */}
    <div className={`text-sm mb-1 ${
      isToday(date) 
        ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
        : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
    }`}>
      {date.getDate()}
    </div>

    {/* Events space */}
    <div className="space-y-1">
      {getEventsForDate(date).map((event) => (
        <div
          key={event.id}
          className="text-xs p-1 rounded truncate cursor-pointer bg-blue-100 text-blue-600"
          onClick={() => onEditTask?.(event.item as Task)}
        >
          <div className="flex items-center gap-1">
            <Pencil size={12} />
            <span className="truncate">{event.title}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Habit dots */}
    <div className="flex gap-1 mt-1 flex-wrap">
      {habits
        .filter(habit => habit.scheduledDates?.some(d => 
          d.hasSame(DateTime.fromJSDate(date), 'day')
        ))
        .map(habit => (
          <HabitDot
            key={habit.id}
            habit={habit}
            onClick={() => onEditHabit(habit)}
          />
        ))}
    </div>
  </div>
))}
      </div>
    </div>
  );
};

// Main Calendar Component
const TaskCalendar: React.FC<CalendarProps> = ({ tasks = [], habits = [], onEditTask, onEditHabit }) => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
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
    const props = {
      currentDate,
      tasks,
      habits,
      onEditTask,
      onEditHabit
    };

    switch(view) {
      case 'day':
        return <DailyView {...props} />;
      case 'week':
        return <WeeklyView {...props} />;
      case 'month':
        return <MonthlyView {...props} />;
      default:
        return <WeeklyView {...props} />;
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