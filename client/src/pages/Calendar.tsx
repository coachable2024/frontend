import {CalendarContent} from '../components/calendar/CalendarContent';
import  Calendar  from '@/components/calendar/Calendar';

const CalendarPage = () => {
    const handleEventAdd = (event: any) => {
        // Implement event adding logic
        console.log('Adding event:', event);
      };
    
      const handleEventClick = (event: any) => {
        // Implement event click logic
        console.log('Clicked event:', event);
      };
    
      const handleCalendarSync = (type: 'google' | 'outlook') => {
        // Implement calendar sync logic
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
    }

export default CalendarPage;