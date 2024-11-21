import Calendar from '@/components/features/calendar/Calendar';
import { CalendarEvent } from '@/components/features/calendar/types';

const CalendarPage = () => {
  const handleEventAdd = (event: CalendarEvent) => {
    console.log('Adding event:', event);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Clicked event:', event);
  };

  const handleCalendarSync = (type: 'google' | 'outlook') => {
    console.log('Syncing with:', type);
  };

  return (
    <div className="container mx-auto p-4">
      <Calendar
        events={[]}
        onEventAdd={handleEventAdd}
        onEventClick={handleEventClick}
        onCalendarSync={handleCalendarSync}
      />
    </div>
  );
};

export default CalendarPage;