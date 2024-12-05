'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import Calendar from '@/components/features/calendar/Calendar';

export default function CalendarPage() {
  return (
    <div className="p-6">
      <PageHeader title="Calendar" />
      <Calendar 
        events={[]}
        onEventAdd={(event) => console.log('Add event:', event)}
        onEventClick={(event) => console.log('Click event:', event)}
        onCalendarSync={(type) => console.log(`Sync with ${type}`)}
      />
    </div>
  );
}