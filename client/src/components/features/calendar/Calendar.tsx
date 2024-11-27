import { useState } from 'react';
import { CalendarEvent, CalendarProps, CalendarView } from './types';
import { WeekView } from './WeekView';
import { ViewSelector } from './ViewSelector';
import { CalendarHeader } from './CalendarHeader';

export default function Calendar({
  events,
  onEventAdd,
  onEventClick,
  onCalendarSync,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(currentDate.getMonth() - 1);
    else if (view === 'week') newDate.setDate(currentDate.getDate() - 7);
    else newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(currentDate.getMonth() + 1);
    else if (view === 'week') newDate.setDate(currentDate.getDate() + 7);
    else newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const renderTimeGrid = () => {
    return (
      <div className="flex flex-col h-[600px] overflow-y-auto">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="flex border-t">
            <div className="w-16 pr-2 py-2 text-right text-sm text-gray-500">
              {`${i.toString().padStart(2, '0')}:00`}
            </div>
            <div className="flex-1 border-l min-h-[60px]"></div>
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-white p-2 text-center font-semibold">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {Array.from({ length: 42 }, (_, i) => {
          const date = new Date(firstDay);
          date.setDate(1 - firstDay.getDay() + i);
          
          return (
            <div
              key={i}
              className={`bg-white p-2 min-h-[100px] ${
                date.getMonth() === currentDate.getMonth()
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              <div className="font-semibold">{date.getDate()}</div>
              {/* Event dots would go here */}
            </div>
          );
        })}
      </div>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        );
      case 'day':
        return renderTimeGrid();
      case 'month':
      default:
        return renderMonthView();
    }
  };

  return (
    <div className="border rounded-lg shadow bg-white">
      <div className="border-b">
        <ViewSelector currentView={view} onViewChange={setView} />
      </div>
      
      <CalendarHeader
        currentDate={currentDate}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={() => setCurrentDate(new Date())}
        view={view}
      />

      {/* Calendar sync buttons */}
      {onCalendarSync && (
        <div className="flex gap-2 p-4 border-b">
          <button
            onClick={() => onCalendarSync('google')}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
          >
            Sync with Google Calendar
          </button>
          <button
            onClick={() => onCalendarSync('outlook')}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
          >
            Sync with Outlook
          </button>
        </div>
      )}

      {/* Calendar grid */}
      <div className="p-4">
        {renderView()}
      </div>
    </div>
  );
}
