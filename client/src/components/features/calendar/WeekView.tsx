import { CalendarEvent, WeekViewProps } from './types';

export const WeekView: React.FC<WeekViewProps> = ({ currentDate, events, onEventClick }) => {
  // Get start of week (Sunday)
  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  return (
    <div className="flex flex-col h-[800px]">
      {/* Week header */}
      <div className="flex border-b">
        <div className="w-16" /> {/* Time column spacer */}
        {weekDays.map((date) => (
          <div
            key={date.toISOString()}
            className="flex-1 text-center p-2 border-l"
          >
            <div className="font-semibold">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-sm ${
              date.toDateString() === new Date().toDateString() 
                ? 'bg-blue-100 rounded-full w-7 h-7 flex items-center justify-center mx-auto'
                : ''
            }`}>
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {Array.from({ length: 24 }, (_, hour) => (
          <div key={hour} className="flex border-t min-h-[60px]">
            {/* Time column */}
            <div className="w-16 pr-2 py-2 text-right text-sm text-gray-500 sticky left-0 bg-white">
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
            
            {/* Day columns */}
            {weekDays.map((date) => (
              <div
                key={`${date.toISOString()}-${hour}`}
                className="flex-1 border-l relative"
              >
                {/* Event rendering would go here */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
