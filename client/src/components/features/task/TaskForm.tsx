
// components/task/TaskForm.tsx
import { useState } from 'react';
import { format } from 'date-fns';
import { Task, TaskPriority, TaskStatus } from '@/types/tasksType';
import { formatDuration } from '@/utils/formatter';

interface TaskFormProps {
  initialTask?: Partial<Task>;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

interface DurationInputProps {
  duration: number;
  onChange: (minutes: number) => void;
}


const DurationInput = ({ duration, onChange }: DurationInputProps) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const handleChange = (newHours: number, newMinutes: number) => {
    const totalMinutes = (newHours * 60) + newMinutes;
    onChange(totalMinutes);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Duration</label>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-500">Hours</label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => {
              const newHours = parseInt(e.target.value) || 0;
              handleChange(newHours, minutes);
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => {
              const newMinutes = parseInt(e.target.value) || 0;
              handleChange(hours, newMinutes);
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps,
  { duration, onChange }: DurationInputProps
) {
  const [formData, setFormData] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    dueDate: initialTask?.dueDate ? format(initialTask.dueDate, 'yyyy-MM-dd') : '',
    duration: initialTask?.duration ? initialTask.duration : 15,
    priority: initialTask?.priority || 'medium' as TaskPriority,
    status: initialTask?.status || 'todo' as TaskStatus,
    category: initialTask?.category || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dueDate: new Date(formData.dueDate)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="number"
          value={formData.duration}
          // onChange={(newDuration) => setFormData({ ...formData, duration: newDuration })}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}