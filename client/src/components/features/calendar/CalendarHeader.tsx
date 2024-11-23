import { CalendarView } from "./types";

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
    view: CalendarView;
  }
  
  export const CalendarHeader = ({
    currentDate,
    onPrevious,
    onNext,
    onToday,
    view,
  }: CalendarHeaderProps) => {
    const formatDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric',
      };
      if (view === 'week') {
        options.day = 'numeric';
      } else if (view === 'day') {
        options.day = 'numeric';
        options.weekday = 'long';
      }
      return currentDate.toLocaleDateString('en-US', options);
    };
  
    return (
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-100 rounded"
          >
            →
          </button>
          <button
            onClick={onToday}
            className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200"
          >
            Today
          </button>
        </div>
        <h2 className="text-xl font-semibold">{formatDate()}</h2>
      </div>
    );
}