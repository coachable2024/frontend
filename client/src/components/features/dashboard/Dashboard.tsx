// 'use client';

// import { useState } from 'react';
// import TaskCalendar from '@/components/features/calendar/Calendar';
// import { TaskList } from '@/components/features/task/TaskList';
// import GoalCard from '@/components/features/goals/GoalCard';
// import { Task } from '@/types/tasksType';
// import { CalendarComponent} from '@/components/features/calendar_test/DailyView';
// import { calendarEvent } from '@/types/calendarType';

// const Dashboard = () => {
//   const [events, setEvents] = useState<calendarEvent[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([
//     {
//       id: '1',
//       title: 'Complete Project Proposal',
//       description: 'Draft and submit project proposal',
//       dueDate: new Date('2024-11-20'),
//       priority: 'high',
//       status: 'in-progress',
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   ]);

//   const handleTaskClick = (task: Task) => {
//     console.log('Task clicked:', task);
//   };

//   const handleEventAdd = (event: Omit<calendarEvent, 'id'>) => {
//     console.log('New event:', event);
//   };

//   const handleEventClick = (event: calendarEvent) => {
//     console.log('Event clicked:', event);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Current Goal</h2>
//           <GoalCard 
//             actions={[{
//               name: "Action 1",
//               time: {hours: 10, minutes: 0},
//               completed: false
//             }]}
//             reward="Your reward here"
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Tasks</h2>
//           <TaskList
//             tasks={tasks}
//             onTaskClick={handleTaskClick}
//             itemsPerPage={5}
//           />
//         </div>

//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Calendar</h2>
//           <TaskCalendar
//             events={events}
//             onEventAdd={handleEventAdd}
//             onEventClick={handleEventClick}
//             onCalendarSync={(type) => console.log(`Sync with ${type}`)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// 'use client';
// import { useEffect, useState } from 'react';
// // import Dashboard from '@/components/features/dashboard/Dashboard';
// import TaskCalendar from '@/components/features/calendar/Calendar';
// import { mockTaskService } from '@/services/mock/mockTasks';
// import { Task } from '@/types/tasksType';
// import { TaskForm } from '@/components/features/task/TaskForm';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { TaskList } from '../task/TaskList';

// export default function DashboardPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const fetchedTasks = await mockTaskService.getTasks();
//         setTasks(fetchedTasks);
//       } catch (error) {
//         console.error('Failed to load tasks:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadTasks();
//   }, []);

//   const handleEditTask = (task: Task) => {
//     setSelectedTask(task);
//     setIsFormOpen(true);
//   };

//   const handleTaskUpdate = async (updatedTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
//     if (!selectedTask) return;
    
//     try {
//       const updatedTask = await mockTaskService.updateTask(selectedTask.id, updatedTaskData);
//       setTasks(tasks.map(task => 
//         task.id === updatedTask.id ? updatedTask : task
//       ));
//       setIsFormOpen(false);
//     } catch (error) {
//       console.error('Failed to update task:', error);
//     }
//   };

//   if (isLoading) return <div className="p-6">Loading...</div>;

//   // return (
//   //   <>
//   //     <Dashboard>
//   //       <TaskCalendar tasks={tasks} onEditTask={handleEditTask} />
//   //     </Dashboard>

//   //     <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//   //       <DialogContent className="max-w-2xl">
//   //         {selectedTask && (
//   //           <TaskForm
//   //             initialTask={selectedTask}
//   //             onSubmit={handleTaskUpdate}
//   //             onCancel={() => setIsFormOpen(false)}
//   //           />
//   //         )}
//   //       </DialogContent>
//   //     </Dialog>
//   //   </>
//   // );

//     return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Current Goal</h2>
//           <GoalCard 
//             actions={[{
//               name: "Action 1",
//               time: {hours: 10, minutes: 0},
//               completed: false
//             }]}
//             reward="Your reward here"
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Tasks</h2>
//           <TaskList
//             tasks={tasks}
//             onTaskClick={handleTaskClick}
//             itemsPerPage={5}
//           />
//         </div>


//     </div>
//   );
// };






const Dashboard = () => {
"here is dashboard"
}
export default Dashboard;
