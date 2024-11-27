'use client';

import { useState } from 'react';
import { TaskList } from '@/components/features/task/TaskList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Task } from '@/types/tasksType';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Project Proposal',
      description: 'Draft and submit project proposal',
      dueDate: new Date('2024-11-20'),
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  return (
    <div className="p-6">
      <PageHeader title="Tasks" />
      <TaskList 
        tasks={tasks}
        onTaskClick={handleTaskClick}
        itemsPerPage={5}
      />
    </div>
  );
}