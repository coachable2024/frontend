// 'use client'
// import { useEffect, useState } from 'react';
// import TaskCalendar from '@/components/features/calendar/Calendar';
// import { PageHeader } from '@/components/layout/PageHeader';
// import { mockTaskService } from '@/services/mock/mockTasks';
// import { Task } from '@/types/tasksType';
// import { TaskForm } from '@/components/features/task/TaskForm';
// import { Dialog, DialogContent } from '@/components/ui/dialog';

// export default function CalendarPage() {
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

//   if (isLoading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <PageHeader title="Calendar" />
//       <TaskCalendar
//         tasks={tasks}
//         onEditTask={handleEditTask}
//       />
      
//       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//         <DialogContent className="max-w-2xl">
//           {selectedTask && (
//             <TaskForm
//               initialTask={selectedTask}
//               onSubmit={handleTaskUpdate}
//               onCancel={() => setIsFormOpen(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// version 2: before adding habits
// 'use client'
// import { useEffect, useState } from 'react';
// import TaskCalendar from '@/components/features/calendar/Calendar';
// import { PageHeader } from '@/components/layout/PageHeader';
// import { mockTaskService } from '@/services/mock/mockTasks';
// import { mockHabitService } from '@/services/mock/mockHabits'; // You'll need to create this
// import { Task } from '@/types/tasksType';
// import { Habit } from '@/types/habitsType';
// import { TaskForm } from '@/components/features/task/TaskForm';
// import { HabitForm } from '@/components/features/habits/HabitForm';
// import { Dialog, DialogContent } from '@/components/ui/dialog';

// export default function CalendarPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [habits, setHabits] = useState<Habit[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
//   const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
//   const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [fetchedTasks, fetchedHabits] = await Promise.all([
//           mockTaskService.getTasks(),
//           mockHabitService.getHabits()
//         ]);
//         setTasks(fetchedTasks);
//         setHabits(fetchedHabits);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   const handleEditTask = (task: Task) => {
//     setSelectedTask(task);
//     setIsTaskFormOpen(true);
//   };

//   const handleEditHabit = (habit: Habit) => {
//     setSelectedHabit(habit);
//     setIsHabitFormOpen(true);
//   };

//   const handleTaskUpdate = async (updatedTaskData: Task) => {
//     if (!selectedTask) return;
//     try {
//       const updatedTask = await mockTaskService.updateTask(selectedTask.id, updatedTaskData);
//       setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
//       setIsTaskFormOpen(false);
//     } catch (error) {
//       console.error('Failed to update task:', error);
//     }
//   };

//   const handleHabitUpdate = async (updatedHabitData: Habit) => {
//     if (!selectedHabit) return;
//     try {
//       const updatedHabit = await mockHabitService.updateHabit(selectedHabit.id, updatedHabitData);
//       setHabits(habits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
//       setIsHabitFormOpen(false);
//     } catch (error) {
//       console.error('Failed to update habit:', error);
//     }
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <PageHeader title="Calendar" />
//       <TaskCalendar
//         tasks={tasks}
//         habits={habits}
//         onEditTask={handleEditTask}
//         onEditHabit={handleEditHabit}
//       />
//       <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
//         <DialogContent className="max-w-2xl">
//           {selectedTask && (
//             <TaskForm
//               initialTask={selectedTask}
//               onSubmit={handleTaskUpdate}
//               onCancel={() => setIsTaskFormOpen(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//       <Dialog open={isHabitFormOpen} onOpenChange={setIsHabitFormOpen}>
//         <DialogContent className="max-w-2xl">
//           {selectedHabit && (
//             <HabitForm
//               initialData={selectedHabit}
//               onSubmit={handleHabitUpdate}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }




// version 3: test adding habits

'use client'
import { useEffect, useState } from 'react';
import TaskCalendar from '@/components/features/calendar/Calendar';
import { PageHeader } from '@/components/layout/PageHeader';
import { mockTaskService } from '@/services/mock/mockTasks';
import { mockHabitService } from '@/services/mock/mockHabits'; // Add this
import { Task } from '@/types/tasksType';
import { Habit } from '@/types/habitsType';
import { TaskForm } from '@/components/features/task/TaskForm';
import { HabitForm } from '@/components/features/habits/HabitForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function CalendarPage() {
  // Add habits state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add state for both forms
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load both tasks and habits
        const [fetchedTasks, fetchedHabits] = await Promise.all([
          mockTaskService.getTasks(),
          mockHabitService.getHabits()
        ]);
        setTasks(fetchedTasks);
        setHabits(fetchedHabits);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handler for task editing
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  };

  // Handler for habit editing
  const handleEditHabit = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsHabitFormOpen(true);
  };

  // Handler for task updates
  const handleTaskUpdate = async (updatedTaskData: Task) => {
    if (!selectedTask) return;
    try {
      const updatedTask = await mockTaskService.updateTask(selectedTask.id, updatedTaskData);
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setIsTaskFormOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Handler for habit updates
  const handleHabitUpdate = async (updatedHabitData: Habit) => {
    if (!selectedHabit) return;
    try {
      const updatedHabit = await mockHabitService.updateHabit(selectedHabit.id, updatedHabitData);
      setHabits(habits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
      setIsHabitFormOpen(false);
      setSelectedHabit(null);
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <PageHeader title="Calendar" />
      <TaskCalendar
        tasks={tasks}
        habits={habits}
        onEditTask={handleEditTask}
        onEditHabit={handleEditHabit}
      />
      
      {/* Task Edit Dialog */}
      <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTask && (
            <TaskForm
              initialTask={selectedTask}
              onSubmit={handleTaskUpdate}
              onCancel={() => setIsTaskFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Habit Edit Dialog */}
      <Dialog open={isHabitFormOpen} onOpenChange={setIsHabitFormOpen}>
        <DialogContent className="max-w-2xl">
          {selectedHabit && (
            <HabitForm
              initialData={selectedHabit}
              onSubmit={handleHabitUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}