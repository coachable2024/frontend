export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export type CalendarView = 'month' | 'week' | 'day';

export interface CalendarProps {
  events: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onCalendarSync?: (type: 'google' | 'outlook') => void;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}
