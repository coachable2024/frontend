export type CalendarView = 'month' | 'week' | 'day';

export type calendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: string;
    type?: 'task' | 'meeting';
    calendar?: 'google' | 'outlook' | 'local';
  }
