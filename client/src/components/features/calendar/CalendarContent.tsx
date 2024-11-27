'use client';

import { useState } from 'react';
import  Calendar  from '@/components/features/calendar/Calendar';
import { AddTaskModal } from '@/components/features/calendar/AddTaskModal';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/task';
import { CalendarEvent } from '@/components/features/calendar/types';

export function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleEventAdd = (event: CalendarEvent) => {
    const newTask: Task = {
      id: event.id,
      title: event.title,
      description: event.description || '',
      dueDate: event.start,
      priority: 'medium',
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    handleAddTask(newTask);
  };

  const tasksForSelectedDate = tasks.filter(
    task => selectedDate && task.dueDate.toDateString() === selectedDate.toDateString()
  );

  // Convert tasks to CalendarEvent format
  const calendarEvents = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    end: task.dueDate,
    description: task.description
  }));

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Calendar
            events={calendarEvents}
            onEventAdd={handleEventAdd}
            onEventClick={(event) => console.log('Event clicked:', event)}
          />
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4"
          >
            Add Task
          </Button>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">
            Tasks for {selectedDate?.toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {tasksForSelectedDate.map((task, index) => (
              <div key={index} className="p-4 border rounded-md">
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedDate={selectedDate}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
} 