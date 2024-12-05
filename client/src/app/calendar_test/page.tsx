import TaskCalendar from '@/components/features/calendar/Calendar';
import { Task } from '@/types/tasksType';
import { TaskForm } from '@/components/features/task/TaskForm';
import { PageHeader } from "@/components/layout/PageHeader";



export default function CalendarPage() {
    return (
      <div className="p-6">
        <PageHeader title="Calendar" />
        <TaskCalendar 
          tasks={[]} // Provide an empty array or your actual tasks here
          onEditTask={(task) => { /* handle edit task logic */ }} // Implement your edit task logic
        />
      </div>
    );
  }


//   'use client'

// import { useState } from 'react';
// import TaskCalendar from '@/components/features/calendar_test/Calendar';
// import {PageHeader} from '@/components/layout/PageHeader';
// import  { mockTasks } from '@/services/mock/mockTasks';
// import { Task } from '@/types/tasksType';
// import { useRouter } from 'next/navigation';

// export default function CalendarPage() {
//   const [tasks, setTasks] = useState<Task[]>(mockTasks);
//   const router = useRouter();

//   const handleEditTask = (task: Task) => {
//     // Navigate to task edit page with the task ID
//     router.push(`/tasks/${task.id}/edit`);
//   };

//   return (
//     <div className="p-6">
//       <PageHeader title="Calendar" />
//       <TaskCalendar
//         tasks={tasks}
//         onEditTask={handleEditTask}
//       />
//     </div>
//   );
// }
