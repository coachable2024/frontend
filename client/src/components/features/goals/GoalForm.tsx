// components/goal/GoalForm.tsx
import { useState } from 'react';
import { format } from 'date-fns';
import { Goal, GoalStatus, GoalCategory } from '@/types/goalsType';

interface GoalFormProps {
  initialGoal?: Partial<Goal>;
  onSubmit: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

interface MetricsInputProps {
  metrics: {
    target: number;
    current: number;
    unit: string;
  };
  onChange: (metrics: { target: number; current: number; unit: string }) => void;
}

const MetricsInput = ({ metrics, onChange }: MetricsInputProps) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Metrics (Optional)</label>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Target</label>
          <input
            type="number"
            min="0"
            value={metrics.target}
            onChange={(e) => onChange({
              ...metrics,
              target: parseInt(e.target.value) || 0
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Current</label>
          <input
            type="number"
            min="0"
            value={metrics.current}
            onChange={(e) => onChange({
              ...metrics,
              current: parseInt(e.target.value) || 0
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Unit</label>
          <input
            type="text"
            value={metrics.unit}
            onChange={(e) => onChange({
              ...metrics,
              unit: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., workouts, books..."
          />
        </div>
      </div>
    </div>
  );
};

export function GoalForm({ initialGoal, onSubmit, onCancel }: GoalFormProps) {
  const [formData, setFormData] = useState({
    title: initialGoal?.title || '',
    motivation: initialGoal?.motivation || '',
    status: initialGoal?.status || 'not-started' as GoalStatus,
    category: initialGoal?.category || 'personal' as GoalCategory,
    targetDate: initialGoal?.targetDate ? format(initialGoal.targetDate, 'yyyy-MM-dd') : '',
    relatedTasks: initialGoal?.relatedTasks || [],
    metrics: initialGoal?.metrics || {
      target: 0,
      current: 0,
      unit: ''
    },
    reward: initialGoal?.reward || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetDate: new Date(formData.targetDate)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="What do you want to achieve?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Motivation</label>
        <textarea
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Why do you want to achieve this goal?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as GoalCategory })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="career">Career</option>
            <option value="relationship">Relationship</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as GoalStatus })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Date</label>
        <input
          type="date"
          value={formData.targetDate}
          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <MetricsInput
        metrics={formData.metrics}
        onChange={(newMetrics) => setFormData({ ...formData, metrics: newMetrics })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Reward</label>
        <input
          type="text"
          value={formData.reward}
          onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
          placeholder="How will you reward yourself when you achieve this goal?"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                   border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                   rounded-md hover:bg-blue-700"
        >
          {initialGoal ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
}