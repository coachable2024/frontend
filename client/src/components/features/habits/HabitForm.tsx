import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Habit, HabitFrequency } from '@/types/habitsType';

interface HabitFormProps {
  onSubmit: (habit: Habit) => void;
  initialData?: Habit;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    frequency: initialData?.schedule.frequency || 'daily' as HabitFrequency,
    preferredTime: initialData?.schedule.preferredTime?.toFormat('HH:mm') || '',
    selectedDays: initialData?.schedule.weeklySchedules?.[0]?.plannedDays || [],
    startDate: initialData?.startDate ? initialData.startDate.toFormat('yyyy-MM-dd') : DateTime.now().toFormat('yyyy-MM-dd'),
  });

  const weekdays = [
    { day: 'Mon', value: 1 },
    { day: 'Tue', value: 2 },
    { day: 'Wed', value: 3 },
    { day: 'Thu', value: 4 },
    { day: 'Fri', value: 5 },
    { day: 'Sat', value: 6 },
    { day: 'Sun', value: 7 }
  ];

  const toggleDay = (dayValue: number) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayValue)
        ? prev.selectedDays.filter(d => d !== dayValue)
        : [...prev.selectedDays, dayValue].sort()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const habit: Habit = {
      id: initialData?.id || crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      schedule: {
        frequency: formData.frequency,
        preferredTime: formData.preferredTime ? 
          DateTime.fromFormat(formData.preferredTime, 'HH:mm') : 
          undefined,
        weeklySchedules: formData.frequency === 'weekly' ? [{
          weekStartDate: DateTime.fromFormat(formData.startDate, 'yyyy-MM-dd').startOf('week'),
          plannedDays: formData.selectedDays.length > 0 ? formData.selectedDays : [1, 2, 3, 4, 5]
        }] : undefined
      },
      status: 'active',
      createdAt: initialData?.createdAt || DateTime.now(),
      updatedAt: DateTime.now(),
      startDate: DateTime.fromFormat(formData.startDate, 'yyyy-MM-dd')
    };

    onSubmit(habit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Habit Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          placeholder="Enter habit title"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description"
        />
      </div>

      <div>
        <Label>Frequency</Label>
        <Select 
          value={formData.frequency}
          onValueChange={(value: HabitFrequency) => {
            setFormData(prev => ({ ...prev, frequency: value }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.frequency === 'weekly' && (
        <div className="space-y-2">
          <Label>Select Days</Label>
          <div className="flex gap-2">
            {weekdays.map(({ day, value }) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(value)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  formData.selectedDays.includes(value)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>Preferred Time</Label>
        <Input
          type="time"
          value={formData.preferredTime}
          onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
        />
      </div>

      <div>
        <Label>Start Date</Label>
        <Input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
          required
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Habit
        </Button>
      </div>
    </form>
  );
};

export { HabitForm };
export default HabitForm;