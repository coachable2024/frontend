// // // // // simplest design of habit card 
// // // "use client"
// // // import React from 'react';
// // // import { X } from 'lucide-react';
// // // import { DateTime } from 'luxon';
// // // import { Habit } from '@/types/habitsType';

// // // interface HabitItemProps {
// // //   habit: Habit;
// // //   onDelete: (id: string) => void;
// // // }

// // // const HabitItem = ({ habit, onDelete }: HabitItemProps) => {
// // //   const formatFrequencyText = (habit: Habit) => {
// // //     const time = habit.schedule.preferredTime?.toFormat('HH:mm') || '';
    
// // //     if (habit.schedule.frequency === 'daily') {
// // //       return `${time} - daily`;
// // //     }
    
// // //     if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
// // //       const days = habit.schedule.weeklySchedules[0].plannedDays.map(day => {
// // //         const date = DateTime.local().set({ weekday: day });
// // //         return date.toFormat('ccc');
// // //       }).join(', ');
// // //       return `${time} - every ${days}`;
// // //     }
    
// // //     return time;
// // //   };

// // //   return (
// // //     <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
// // //       <div className="flex justify-between items-start">
// // //         <div className="space-y-1">
// // //           <h3 className="font-medium text-gray-900">{habit.title}</h3>
// // //           <p className="text-sm text-gray-600">{formatFrequencyText(habit)}</p>
// // //         </div>
// // //         <div className="flex items-center">
// // //           <button
// // //             onClick={() => onDelete(habit.id)}
// // //             className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
// // //           >
// // //             <X className="w-5 h-5" />
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HabitItem;

// // import React from 'react';
// // import { X, Check, Circle } from 'lucide-react';
// // import { DateTime } from 'luxon';
// // import { Habit } from '@/types/habitsType';

// // interface HabitItemProps {
// //   habit: Habit;
// //   onDelete: (id: string) => void;
// //   onComplete: (id: string) => void;
// // }

// // const HabitItem = ({ habit, onDelete, onComplete }: HabitItemProps) => {
// //   const formatFrequencyText = (habit: Habit) => {
// //     const time = habit.schedule.preferredTime?.toFormat('HH:mm') || '';
// //     if (habit.schedule.frequency === 'daily') {
// //       return `${time} - daily`;
// //     }
// //     if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
// //       const days = habit.schedule.weeklySchedules[0].plannedDays.map(day => {
// //         const date = DateTime.local().set({ weekday: day });
// //         return date.toFormat('ccc');
// //       }).join(', ');
// //       return `${time} - every ${days}`;
// //     }
// //     return time;
// //   };

// //   const isCompletedToday = habit.completedDates?.some(date => 
// //     date.hasSame(DateTime.now(), 'day')
// //   );

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
// //       <div className="flex justify-between items-start">
// //         <div className="space-y-1">
// //           <h3 className="font-medium text-gray-900">{habit.title}</h3>
// //           <p className="text-sm text-gray-600">{formatFrequencyText(habit)}</p>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <button
// //             onClick={() => onComplete(habit.id)}
// //             className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
// //               isCompletedToday 
// //                 ? 'bg-green-100 text-green-600 hover:bg-green-200' 
// //                 : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
// //             }`}
// //             aria-label={isCompletedToday ? "Mark as incomplete" : "Mark as complete"}
// //           >
// //             {isCompletedToday ? (
// //               <Check className="w-5 h-5 animate-appear" />
// //             ) : (
// //               <Circle className="w-5 h-5" />
// //             )}
// //           </button>
// //           <button
// //             onClick={() => onDelete(habit.id)}
// //             className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HabitItem;

// import React, { useState } from 'react';
// import { X, CheckCircle } from 'lucide-react';
// import { DateTime } from 'luxon';
// import { Habit } from '@/types/habitsType';

// interface HabitItemProps {
//   habit: Habit;
//   onDelete: (id: string) => void;
//   onComplete: (id: string) => void;
// }

// const HabitItem = ({ habit, onDelete, onComplete }: HabitItemProps) => {
//   const [isCompleting, setIsCompleting] = useState(false);

//   const formatFrequencyText = (habit: Habit) => {
//     const time = habit.schedule.preferredTime?.toFormat('HH:mm') || '';
//     if (habit.schedule.frequency === 'daily') {
//       return `${time} - daily`;
//     }
//     if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
//       const days = habit.schedule.weeklySchedules[0].plannedDays.map(day => {
//         const date = DateTime.local().set({ weekday: day });
//         return date.toFormat('ccc');
//       }).join(', ');
//       return `${time} - every ${days}`;
//     }
//     return time;
//   };

//   const isCompletedToday = habit.scheduledDates?.some(date => 
//     date.hasSame(DateTime.now(), 'day')
//   );

//   const handleComplete = () => {
//     setIsCompleting(true);
//     onComplete(habit.id);
//     setTimeout(() => setIsCompleting(false), 300);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={handleComplete}
//             disabled={isCompletedToday}
//             className={`transition-all duration-300 ${
//               isCompleting ? 'scale-110' : 'scale-100'
//             } ${
//               isCompletedToday 
//                 ? 'text-green-500 hover:text-green-600' 
//                 : 'text-gray-300 hover:text-green-500'
//             }`}
//           >
//             <CheckCircle className={`w-6 h-6 ${isCompletedToday ? 'fill-green-500' : ''}`} />
//           </button>
//           <div className="space-y-1">
//             <h3 className="font-medium text-gray-900">{habit.title}</h3>
//             <p className="text-sm text-gray-600">{formatFrequencyText(habit)}</p>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <button
//             onClick={() => onDelete(habit.id)}
//             className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HabitItem;


import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { DateTime } from 'luxon';
import { Habit } from '@/types/habitsType';

interface HabitItemProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, isCompleting: boolean) => void;
}

const HabitItem = ({ habit, onDelete, onToggleComplete }: HabitItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const formatFrequencyText = (habit: Habit) => {
    const time = habit.schedule.preferredTime?.toFormat('HH:mm') || '';
    if (habit.schedule.frequency === 'daily') {
      return `${time} - daily`;
    }
    if (habit.schedule.frequency === 'weekly' && habit.schedule.weeklySchedules?.[0]) {
      const days = habit.schedule.weeklySchedules[0].plannedDays.map(day => {
        const date = DateTime.local().set({ weekday: day });
        return date.toFormat('ccc');
      }).join(', ');
      return `${time} - every ${days}`;
    }
    return time;
  };

  const isCompletedToday = habit.scheduledDates?.some(date => 
    date.hasSame(DateTime.now(), 'day')
  );

  const handleToggleComplete = () => {
    setIsAnimating(true);
    onToggleComplete(habit.id, !isCompletedToday);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleComplete}
            className={`transition-all duration-300 ${
              isAnimating ? 'scale-110' : 'scale-100'
            } ${
              isCompletedToday 
                ? 'text-green-500 hover:text-gray-400' 
                : 'text-gray-300 hover:text-green-500'
            }`}
          >
            <CheckCircle className={`w-6 h-6 ${isCompletedToday ? 'fill-green-500' : ''}`} />
          </button>
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">{habit.title}</h3>
            <p className="text-sm text-gray-600">{formatFrequencyText(habit)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;