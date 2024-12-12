// attempt habits page to include a streak calendar

// // 'use client'
// // import React, { useState } from 'react';
// // import { PlusCircle, Heart, Calendar } from 'lucide-react';
// // import { DateTime } from 'luxon';
// // import { Habit, HabitFrequency, HabitStatus, TimeSlot, SingleUnitStatus } from '@/types/habitsType';
// // import HabitCard from '@/components/features/habits/HabitCard';
// // import HabitForm from '@/components/features/habits/HabitForm';
// // import { Dialog, DialogContent } from '@/components/ui/dialog';

// // const HabitPage: React.FC = () => {
// //   const [habits, setHabits] = useState<Habit[]>([
// //     {
// //       id: '1',
// //       title: 'Morning Meditation',
// //       description: 'Start the day with 10 minutes of mindfulness',
// //       schedule: {
// //         frequency: 'daily' as HabitFrequency,
// //         timesPerPeriod: 1,
// //         defaultDuration: 10,
// //         preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
// //         timeSlots: [
// //           {
// //             date: DateTime.now().startOf('day'),
// //             time: DateTime.fromObject({ hour: 7, minute: 0 }),
// //             duration: 10,
// //             completed: 'completed' as SingleUnitStatus,
// //             note: ''
// //           }
// //         ],
// //         weeklySchedules: [{
// //           weekStartDate: DateTime.now().startOf('week'),
// //           plannedDays: [1, 3, 5]
// //         }]
// //       },
// //       progress: {
// //         completedDates: [],
// //         targetCompletionCount: 30,
// //         actualCompletionCount: 15,
// //         lastCompleted: DateTime.now()
// //       },
// //       status: 'active' as HabitStatus,
// //       createdAt: DateTime.now(),
// //       updatedAt: DateTime.now(),
// //       startDate: DateTime.now()
// //     }
// //   ]);

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

// //   const calculateProgress = (habit: Habit): number => {
// //     const { progress } = habit;
// //     if (!progress.targetCompletionCount) return 0;
// //     return (progress.actualCompletionCount / progress.targetCompletionCount) * 100;
// //   };

// //   const handleTimeSlotUpdate = (
// //     habitId: string, 
// //     date: DateTime, 
// //     status: SingleUnitStatus | null
// //   ) => {
// //     setHabits(currentHabits => currentHabits.map(habit => {
// //       if (habit.id !== habitId) return habit;

// //       const updatedTimeSlots = [...habit.schedule.timeSlots];
// //       const slotIndex = updatedTimeSlots.findIndex(slot => 
// //         DateTime.fromISO(slot.date.toString()).hasSame(date, 'day')
// //       );

// //       if (slotIndex >= 0) {
// //         if (status) {
// //           updatedTimeSlots[slotIndex] = {
// //             ...updatedTimeSlots[slotIndex],
// //             completed: status
// //           };
// //         } else {
// //           updatedTimeSlots.splice(slotIndex, 1);
// //         }
// //       } else if (status) {
// //         updatedTimeSlots.push({
// //           date: date.startOf('day'),
// //           time: habit.schedule.preferredTime || DateTime.now(),
// //           duration: habit.schedule.defaultDuration,
// //           completed: status,
// //           note: ''
// //         });
// //       }

// //       const completedCount = updatedTimeSlots.filter(
// //         slot => slot.completed === 'completed'
// //       ).length;

// //       return {
// //         ...habit,
// //         schedule: {
// //           ...habit.schedule,
// //           timeSlots: updatedTimeSlots
// //         },
// //         progress: {
// //           ...habit.progress,
// //           actualCompletionCount: completedCount,
// //           lastCompleted: status === 'completed' ? date : habit.progress.lastCompleted
// //         },
// //         updatedAt: DateTime.now()
// //       };
// //     }));
// //   };

// //   const handleAddHabit = (newHabit: Habit) => {
// //     setHabits(current => [...current, newHabit]);
// //     setIsOpen(false);
// //     setEditingHabit(null);
// //   };

// //   const handleEditHabit = (updatedHabit: Habit) => {
// //     setHabits(currentHabits => 
// //       currentHabits.map(habit => 
// //         habit.id === updatedHabit.id ? { ...updatedHabit, updatedAt: DateTime.now() } : habit
// //       )
// //     );
// //     setIsOpen(false);
// //     setEditingHabit(null);
// //   };

// //   const handleStartEdit = (habit: Habit) => {
// //     setEditingHabit(habit);
// //     setIsOpen(true);
// //   };

// //   const handleDeleteHabit = (id: string) => {
// //     setHabits(currentHabits => currentHabits.filter(habit => habit.id !== id));
// //   };

// //   const handleUpdateHabitStatus = (id: string, status: HabitStatus) => {
// //     setHabits(currentHabits => currentHabits.map(habit => 
// //       habit.id === id ? { ...habit, status, updatedAt: DateTime.now() } : habit
// //     ));
// //   };

// //   const getFilteredHabits = (status: HabitStatus) => {
// //     return habits.filter(habit => habit.status === status);
// //   };

// //   const handleAddNote = (habitId: string, date: DateTime, note: string) => {
// //     setHabits(currentHabits => currentHabits.map(habit => {
// //       if (habit.id !== habitId) return habit;

// //       const timeSlots = [...(habit.schedule.timeSlots || [])];
// //       const slotIndex = timeSlots.findIndex(slot => 
// //         DateTime.fromISO(slot.date.toString()).hasSame(date, 'day')
// //       );

// //       if (slotIndex >= 0) {
// //         timeSlots[slotIndex] = {
// //           ...timeSlots[slotIndex],
// //           note
// //         };
// //       } else {
// //         timeSlots.push({
// //           date: date.startOf('day'),
// //           time: habit.schedule.preferredTime || DateTime.now(),
// //           duration: habit.schedule.defaultDuration || 0,
// //           completed: undefined,
// //           note
// //         });
// //       }

// //       return {
// //         ...habit,
// //         schedule: {
// //           ...habit.schedule,
// //           timeSlots
// //         },
// //         updatedAt: DateTime.now()
// //       };
// //     }));
// //   };

// //   const handleCloseDialog = () => {
// //     setIsOpen(false);
// //     setEditingHabit(null);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
// //                 <Heart className="text-rose-500" /> 
// //                 Habits & Self-Care
// //               </h1>
// //               <p className="text-gray-500 mt-1">Track and maintain your daily routines</p>
// //             </div>
// //             <button
// //               onClick={() => setIsOpen(true)}
// //               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
// //             >
// //               <PlusCircle className="w-5 h-5 mr-2" />
// //               Add Habit
// //             </button>
// //           </div>
// //         </div>

// //         {/* Active Habits */}
// //         <div className="mb-8">
// //           <h2 className="text-xl font-semibold mb-4">Active Habits</h2>
// //           <div className="space-y-4">
// //             {getFilteredHabits('active').map(habit => (
// //               <HabitCard
// //                 key={habit.id}
// //                 habit={habit}
// //                 onDelete={handleDeleteHabit}
// //                 onStatusChange={handleUpdateHabitStatus}
// //                 onTimeSlotUpdate={handleTimeSlotUpdate}
// //                 onAddNote={handleAddNote}
// //                 onEdit={() => handleStartEdit(habit)}
// //                 progress={calculateProgress(habit)}
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Paused Habits */}
// //         {getFilteredHabits('paused').length > 0 && (
// //           <div className="mb-8">
// //             <h2 className="text-xl font-semibold mb-4">Paused Habits</h2>
// //             <div className="space-y-4">
// //               {getFilteredHabits('paused').map(habit => (
// //                 <HabitCard
// //                   key={habit.id}
// //                   habit={habit}
// //                   onDelete={handleDeleteHabit}
// //                   onStatusChange={handleUpdateHabitStatus}
// //                   onTimeSlotUpdate={handleTimeSlotUpdate}
// //                   onAddNote={handleAddNote}
// //                   onEdit={() => handleStartEdit(habit)}
// //                   progress={calculateProgress(habit)}
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {habits.length === 0 && (
// //           <div className="text-center py-16">
// //             <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //             <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
// //             <p className="text-gray-500 mt-2">Start building your daily routines</p>
// //             <button
// //               onClick={() => setIsOpen(true)}
// //               className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
// //             >
// //               <PlusCircle className="w-5 h-5 mr-2" />
// //               Add Habit
// //             </button>
// //           </div>
// //         )}

// //         <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
// //           <DialogContent className="max-w-2xl">
// //             <HabitForm 
// //               onSubmit={editingHabit ? handleEditHabit : handleAddHabit}
// //               initialData={editingHabit}
// //             />
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HabitPage;



// simplest figma data structure with improved design
// 'use client'
// import React, { useState } from 'react';
// import { PlusCircle, Heart, Calendar, X } from 'lucide-react';
// import { DateTime } from 'luxon';
// import { Habit, HabitFrequency, HabitStatus } from '@/types/habitsType';
// import HabitForm from '@/components/features/habits/HabitForm';
// import { Dialog, DialogContent } from '@/components/ui/dialog';

// const HabitPage: React.FC = () => {
//   const [habits, setHabits] = useState<Habit[]>([
//     {
//       id: '1',
//       title: 'Morning Meditation',
//       description: 'Start the day with 10 minutes of mindfulness',
//       schedule: {
//         frequency: 'daily',
//         timesPerPeriod: 1,
//         defaultDuration: 10,
//         preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
//         timeSlots: []
//       },
//       progress: {
//         completedDates: [],
//         targetCompletionCount: 30,
//         actualCompletionCount: 15,
//         lastCompleted: DateTime.now()
//       },
//       status: 'active',
//       createdAt: DateTime.now(),
//       updatedAt: DateTime.now(),
//       startDate: DateTime.now()
//     },
//     {
//       id: '2',
//       title: 'Evening Workout',
//       description: 'Strength training and cardio',
//       schedule: {
//         frequency: 'weekly',
//         timesPerPeriod: 3,
//         defaultDuration: 45,
//         preferredTime: DateTime.fromObject({ hour: 18, minute: 0 }),
//         timeSlots: [],
//         weeklySchedules: [{
//           weekStartDate: DateTime.now().startOf('week'),
//           plannedDays: [1, 3, 5] // Monday, Wednesday, Friday
//         }]
//       },
//       progress: {
//         completedDates: [],
//         targetCompletionCount: 12,
//         actualCompletionCount: 8,
//         lastCompleted: DateTime.now()
//       },
//       status: 'active',
//       createdAt: DateTime.now(),
//       updatedAt: DateTime.now(),
//       startDate: DateTime.now()
//     }
//   ]);

//   const [isOpen, setIsOpen] = useState(false);
//   const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

//   const formatFrequencyText = (habit: Habit) => {
//     const time = habit.schedule.preferredTime?.toFormat('HH:mm') || '';
    
//     switch (habit.schedule.frequency) {
//       case 'daily':
//         return `${time} - daily`;
//       case 'weekly':
//         const days = habit.schedule.weeklySchedules?.[0]?.plannedDays.map(day => {
//           const date = DateTime.local().set({ weekday: day });
//           return date.toFormat('ccc');
//         }).join(', ');
//         return `${time} - every ${days}`;
//       case 'monthly':
//         const schedule = habit.schedule.monthlySchedule;
//         if (schedule?.recurrenceType === 'dayOfMonth') {
//           return `${time} - ${schedule.dayOfMonth}th of each month`;
//         } else if (schedule?.recurrenceType === 'dayOfWeek') {
//           const weekNum = schedule.weekOfMonth === 5 ? 'last' : 
//             ['first', 'second', 'third', 'fourth'][schedule.weekOfMonth! - 1];
//           const day = DateTime.local().set({ weekday: schedule.dayOfWeek! }).toFormat('cccc');
//           return `${time} - ${weekNum} ${day} of each month`;
//         }
//         return time;
//       default:
//         return time;
//     }
//   };

//   const handleAddHabit = (newHabit: Habit) => {
//     setHabits(current => [...current, newHabit]);
//     setIsOpen(false);
//     setEditingHabit(null);
//   };

//   const handleEditHabit = (updatedHabit: Habit) => {
//     setHabits(currentHabits => 
//       currentHabits.map(habit => 
//         habit.id === updatedHabit.id ? { ...updatedHabit, updatedAt: DateTime.now() } : habit
//       )
//     );
//     setIsOpen(false);
//     setEditingHabit(null);
//   };

//   const handleStartEdit = (habit: Habit) => {
//     setEditingHabit(habit);
//     setIsOpen(true);
//   };

//   const handleDeleteHabit = (id: string) => {
//     setHabits(currentHabits => currentHabits.filter(habit => habit.id !== id));
//   };

//   const handleCloseDialog = () => {
//     setIsOpen(false);
//     setEditingHabit(null);
//   };

//   const getFilteredHabits = (status: HabitStatus) => {
//     return habits.filter(habit => habit.status === status);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 <Heart className="text-rose-500" /> 
//                 Habits & Self-Care
//               </h1>
//               <p className="text-gray-500 mt-1">Track and maintain your daily routines</p>
//             </div>
//             <button
//               onClick={() => setIsOpen(true)}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
//             >
//               <PlusCircle className="w-5 h-5 mr-2" />
//               Add Habit
//             </button>
//           </div>
//         </div>

//         {/* Active Habits */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Active Habits</h2>
//           <div className="space-y-3">
//             {getFilteredHabits('active').map(habit => (
//               <div 
//                 key={habit.id}
//                 className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-1">
//                     <h3 className="font-medium text-gray-900">{habit.title}</h3>
//                     <p className="text-sm text-gray-600">{formatFrequencyText(habit)}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {/* <button
//                       onClick={() => handleStartEdit(habit)}
//                       className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
//                     >
//                       <PlusCircle className="w-5 h-5" />
//                     </button> */}
//                     <button
//                       onClick={() => handleDeleteHabit(habit.id)}
//                       className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Empty State */}
//         {habits.length === 0 && (
//           <div className="text-center py-16">
//             <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
//             <p className="text-gray-500 mt-2">Start building your daily routines</p>
//             <button
//               onClick={() => setIsOpen(true)}
//               className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//             >
//               <PlusCircle className="w-5 h-5 mr-2" />
//               Add Habit
//             </button>
//           </div>
//         )}

//         <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
//           <DialogContent className="max-w-2xl">
//             <HabitForm 
//               onSubmit={editingHabit ? handleEditHabit : handleAddHabit}
//               initialData={editingHabit}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default HabitPage;





// add simplest design of habit card
'use client'
import React, { useState } from 'react';
import { PlusCircle, Heart, Calendar, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { Habit, HabitFrequency, HabitStatus } from '@/types/habitsType';
import HabitForm from '@/components/features/habits/HabitForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import HabitItem from '@/components/features/habits/HabitCard';

const HabitPage: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      schedule: {
        frequency: 'daily',
        timesPerPeriod: 1,
        defaultDuration: 10,
        preferredTime: DateTime.fromObject({ hour: 7, minute: 0 }),
        timeSlots: []
      },
      progress: {
        completedDates: [],
        targetCompletionCount: 30,
        actualCompletionCount: 15,
        lastCompleted: DateTime.now()
      },
      status: 'active',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      startDate: DateTime.now()
    },
    {
      id: '2',
      title: 'Evening Workout',
      description: 'Strength training and cardio',
      schedule: {
        frequency: 'weekly',
        timesPerPeriod: 3,
        defaultDuration: 45,
        preferredTime: DateTime.fromObject({ hour: 18, minute: 0 }),
        timeSlots: [],
        weeklySchedules: [{
          weekStartDate: DateTime.now().startOf('week'),
          plannedDays: [1, 3, 5] // Monday, Wednesday, Friday
        }]
      },
      progress: {
        completedDates: [],
        targetCompletionCount: 12,
        actualCompletionCount: 8,
        lastCompleted: DateTime.now()
      },
      status: 'active',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      startDate: DateTime.now()
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const generateScheduledDates = (habit: Habit): DateTime[] => {
    const startDate = DateTime.now().startOf('day');
    const endDate = startDate.plus({ years: 1 });
    const dates: DateTime[] = [];
  
    let currentDate = startDate;
    while (currentDate <= endDate) {
      if (habit.schedule.frequency === 'daily') {
        dates.push(currentDate);
      } else if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
        const plannedDays = habit.schedule.weeklySchedules[0].plannedDays;
        if (plannedDays.includes(currentDate.weekday)) {
          dates.push(currentDate);
        }
      }
      currentDate = currentDate.plus({ days: 1 });
    }

      // If there's a preferred time, adjust all dates to that time
  if (habit.schedule.preferredTime) {
    const hour = habit.schedule.preferredTime.hour;
    const minute = habit.schedule.preferredTime.minute;
    return dates.map(date => 
      date.set({ hour, minute })
    );
  }

  return dates;
};



const handleToggleComplete = (id: string, isCompleting: boolean) => {
  setHabits(currentHabits => 
    currentHabits.map(habit => {
      if (habit.id === id) {
        const currentDate = DateTime.now();
        if (isCompleting) {
          // Add current date to scheduledDates if completing
          return {
            ...habit,
            scheduledDates: [...(habit.scheduledDates || []), currentDate],
            updatedAt: currentDate
          };
        } else {
          // Remove current date from scheduledDates if uncompleting
          return {
            ...habit,
            scheduledDates: (habit.scheduledDates || []).filter(date => 
              !date.hasSame(currentDate, 'day')
            ),
            updatedAt: currentDate
          };
        }
      }
      return habit;
    })
  );
};

  const handleAddHabit = (newHabit: Habit) => {
    const scheduledDates = generateScheduledDates(newHabit);
    const habitWithDates = {
      ...newHabit,
      scheduledDates,
      completedDates: [] // Initialize empty completed dates
    };
    
    setHabits(current => [...current, habitWithDates]);
    setIsOpen(false);
    setEditingHabit(null);
  };

  const handleEditHabit = (updatedHabit: Habit) => {
    setHabits(currentHabits => 
      currentHabits.map(habit => 
        habit.id === updatedHabit.id ? { ...updatedHabit, updatedAt: DateTime.now() } : habit
      )
    );
    setIsOpen(false);
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(currentHabits => currentHabits.filter(habit => habit.id !== id));
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setEditingHabit(null);
  };

  const getFilteredHabits = (status: HabitStatus) => {
    return habits.filter(habit => habit.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="text-rose-500" /> 
                Habits & Self-Care
              </h1>
              <p className="text-gray-500 mt-1">Track and maintain your daily routines</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Habit
            </button>
          </div>
        </div>


        {/* Active Habits */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Habits</h2>
          <div className="space-y-3">
            {getFilteredHabits('active').map(habit => (
            <HabitItem 
              key={habit.id}
              habit={habit}
              onDelete={handleDeleteHabit}
              onToggleComplete={handleToggleComplete}
            />
          ))}
          </div>
        </div>

        {/* Empty State */}
        {habits.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No habits yet</h3>
            <p className="text-gray-500 mt-2">Start building your daily routines</p>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Habit
            </button>
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl">
            <HabitForm 
              onSubmit={editingHabit ? handleEditHabit : handleAddHabit}
              initialData={editingHabit}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HabitPage;