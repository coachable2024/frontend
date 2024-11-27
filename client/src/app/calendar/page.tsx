'use client';
<<<<<<< HEAD
import CalendarPage from '../../pages/Calendar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function CalendarPageOutput() {
  return (
    <PageWrapper>
      <PageHeader title="Calendar" />
      {<CalendarPage/>}
    </PageWrapper>
=======

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
>>>>>>> c743d4388327f7530b39bd74d4582a7326165df2
  );
}