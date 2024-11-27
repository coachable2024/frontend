'use client';
<<<<<<< HEAD
import Tasks from '../../pages/Task';

// export default function TasksPage() {
//   return <Tasks/>;
// }


import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function TasksPage() {
  return (
    <PageWrapper>
      <PageHeader title="Tasks" />
      {<Tasks />}
    </PageWrapper>
=======

import { useState } from 'react';
import { TaskList } from '@/components/features/task/TaskList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Task } from '@/types/task';

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
>>>>>>> c743d4388327f7530b39bd74d4582a7326165df2
  );
}