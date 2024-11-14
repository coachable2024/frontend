'use client';
import CalendarPage from '../../pages/Calendar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function CalendarPageOutput() {
  return (
    <PageWrapper>
      <PageHeader title="Calendar" />
      {<CalendarPage/>}
    </PageWrapper>
  );
}