'use client';

import { useState } from 'react';
import  Calendar  from '@/components/calendar/Calendar';
import { AddTaskModal } from '@/components/calendar/AddTaskModal';
import { Button } from '@/components/ui/button';

interface Task {
    id: string;  // Add this
    title: string;
    date: Date;
    description: string;
    start: Date;  // Add this
    end: Date;    // Add this
}

export function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const tasksForSelectedDate = tasks.filter(
    task => selectedDate && task.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Calendar
            events={tasks}
            onEventAdd={handleAddTask}
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