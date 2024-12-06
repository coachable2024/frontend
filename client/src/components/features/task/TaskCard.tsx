// components/task/TaskCard.tsx
import { Task, TaskPriority, TaskStatus } from '@/types/tasksType';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/formatter';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800'
};

export function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="h-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold break-words flex-1">{task.title}</h3>
          <div className="text-xs flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-1 text-sm break-words">{task.description}</p>
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
          <span>Due: {format(task.dueDate, 'MMM d, yyyy')}</span>
          <span>Duration: {formatDuration(task.duration)}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]} border-0 cursor-pointer hover:opacity-80`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}