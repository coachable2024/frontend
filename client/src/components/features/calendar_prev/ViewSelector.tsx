import { CalendarView } from '@/types/calendarType';

interface ViewSelectorProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => onViewChange('month')}
        className={`px-4 py-2 rounded ${
          currentView === 'month' ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
      >
        Month
      </button>
      <button
        onClick={() => onViewChange('week')}
        className={`px-4 py-2 rounded ${
          currentView === 'week' ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
      >
        Week
      </button>
      <button
        onClick={() => onViewChange('day')}
        className={`px-4 py-2 rounded ${
          currentView === 'day' ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
      >
        Day
      </button>
    </div>
  );
};
