// complex habitform with monthly views

// import React, { useState } from 'react';
// import { DateTime } from 'luxon';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { cn } from "@/lib/utils";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Habit, HabitFrequency, TimeSlot, MonthlyRecurrenceType } from '@/types/habitsType';

// interface HabitFormProps {
//   onSubmit: (habit: Habit) => void;
// }

// const HabitForm: React.FC<HabitFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     frequency: 'daily' as HabitFrequency,
//     defaultDuration: 30,
//     preferredTime: '',
//     startDate: DateTime.now().toFormat('yyyy-MM-dd'),
//     endDate: '',
//     goalId: '',
//     selectedDays: [] as number[],
//     monthlyRecurrenceType: 'dayOfMonth' as MonthlyRecurrenceType,
//     dayOfMonth: 1,
//     weekOfMonth: 1,
//     dayOfWeek: 1,
//   });

//   const [showEndDate, setShowEndDate] = useState(false);

//   const weekdays = [
//     { day: 'Sun', value: 0 },
//     { day: 'Mon', value: 1 },
//     { day: 'Tue', value: 2 },
//     { day: 'Wed', value: 3 },
//     { day: 'Thu', value: 4 },
//     { day: 'Fri', value: 5 },
//     { day: 'Sat', value: 6 }
//   ];

//   const toggleDay = (dayValue: number) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedDays: prev.selectedDays.includes(dayValue)
//         ? prev.selectedDays.filter(d => d !== dayValue)
//         : [...prev.selectedDays, dayValue].sort()
//     }));
//   };

//   const hours = Array.from({ length: 24 }, (_, i) => 
//     i.toString().padStart(2, '0')
//     );

//     const minutes = Array.from({ length: 12 }, (_, i) => 
//         (i * 5).toString().padStart(2, '0')
//         );

//       // Split time into hours and minutes
//     const [selectedHour, selectedMinute] = formData.preferredTime
//     ? formData.preferredTime.split(':')
//     : ['', ''];


//      // Handle time change
//   const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
//     const currentTime = formData.preferredTime ? formData.preferredTime.split(':') : ['00', '00'];
//     const newTime = type === 'hour'
//       ? `${value}:${currentTime[1] || '00'}`
//       : `${currentTime[0] || '00'}:${value}`;
    
//     setFormData(prev => ({ ...prev, preferredTime: newTime }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const timeSlots: TimeSlot[] = [];
//     if (formData.preferredTime) {
//       timeSlots.push({
//         date: formData.startDate,
//         time: formData.preferredTime,
//         duration: formData.defaultDuration,
//         note: ''
//       });
//     }

// const startDate = DateTime.fromFormat(formData.startDate, 'yyyy-MM-dd');
// const endDate = formData.endDate ? 
//   DateTime.fromFormat(formData.endDate, 'yyyy-MM-dd') : 
//   startDate.plus({ months: 1 }); // Default to one month if no end date

// let targetCompletionCount = 0;
// const days = endDate.diff(startDate, 'days').days;

// switch (formData.frequency) {
//   case 'daily':
//     targetCompletionCount = Math.ceil(days);
//     break;
//   case 'weekly':
//     const selectedDaysCount = formData.selectedDays.length || 5; // Default to 5 weekdays if none selected
//     targetCompletionCount = Math.ceil((days / 7) * selectedDaysCount);
//     break;
//   case 'monthly':
//     if (formData.monthlyRecurrenceType === 'dayOfMonth') {
//       targetCompletionCount = Math.ceil(days / 30);
//     } else {
//       // For weekOfMonth + dayOfWeek, roughly 1 occurrence per month
//       targetCompletionCount = Math.ceil(days / 30);
//     }
//     break;
//   case 'custom':
//     targetCompletionCount = 1; // Set a default for custom frequency
//     break;
// }


//     const monthlySchedule = formData.frequency === 'monthly' ? {
//         recurrenceType: formData.monthlyRecurrenceType,
//         ...(formData.monthlyRecurrenceType === 'dayOfMonth' 
//           ? { dayOfMonth: formData.dayOfMonth }
//           : {
//               weekOfMonth: formData.weekOfMonth,
//               dayOfWeek: formData.dayOfWeek
//             }
//         )
//       } : undefined;

//       const weeklySchedules = formData.frequency === 'weekly' ? [{
//         weekStartDate: DateTime.fromFormat(formData.startDate, 'yyyy-MM-dd').startOf('week'),
//         plannedDays: formData.selectedDays.length > 0 ? formData.selectedDays : [1, 2, 3, 4, 5] // Default to weekdays if none selected
//       }] : undefined;
      

//     const habit: Habit = {
//       id: crypto.randomUUID(),
//       title: formData.title,
//       description: formData.description,
//       schedule: {
//         frequency: formData.frequency,
//         defaultDuration: formData.defaultDuration,
//         preferredTime: formData.preferredTime ? 
//           DateTime.fromFormat(formData.preferredTime, 'HH:mm') : 
//           undefined,
//         timeSlots,
//         monthlySchedule,
//         weeklySchedules,
//       },
//       progress: {
//         completedDates: [],
//         targetCompletionCount,  // Now using the calculated value
//         actualCompletionCount: 0,
//         lastCompleted: undefined  // Added this missing field
//       },
//       status: 'active',
//       createdAt: DateTime.now(),
//       updatedAt: DateTime.now(),
//       startDate: DateTime.fromFormat(formData.startDate, 'yyyy-MM-dd'),
//       endDate: formData.endDate ? 
//         DateTime.fromFormat(formData.endDate, 'yyyy-MM-dd') : 
//         undefined,
//       relatedGoal: formData.goalId ? { id: formData.goalId } : undefined
//     };

//     onSubmit(habit);
//   };


//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="col-span-2">
//           <Label>Habit Title</Label>
//           <Input
//             name="title"
//             value={formData.title}
//             onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//             required
//             placeholder="Enter habit title"
//           />
//         </div>

//         <div className="col-span-2">
//           <Label>Description</Label>
//           <Input
//             name="description"
//             value={formData.description}
//             onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//             placeholder="Brief description"
//           />
//         </div>

//         <div>
//           <Label>Frequency</Label>
//           <Select 
//             value={formData.frequency}
//             onValueChange={(value: HabitFrequency) => {
//               setFormData(prev => ({ ...prev, frequency: value }));
//             }}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select frequency" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="daily">Daily</SelectItem>
//               <SelectItem value="weekly">Weekly</SelectItem>
//               <SelectItem value="monthly">Monthly</SelectItem>
//               <SelectItem value="custom">Custom</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label>Default Duration (minutes)</Label>
//           <Input
//             type="number"
//             min="1"
//             value={formData.defaultDuration}
//             onChange={(e) => setFormData(prev => ({ ...prev, defaultDuration: parseInt(e.target.value) }))}
//             required
//           />
//         </div>

//         {formData.frequency === 'weekly' && (
//           <div className="col-span-2 space-y-2">
//             <Label>Select Days</Label>
//             <div className="flex flex-wrap gap-4 mt-2">
//               {weekdays.map(({ day, value }) => (
//                 <div key={day} className="flex flex-col items-center gap-1">
//                   <button
//                     type="button"
//                     onClick={() => toggleDay(value)}
//                     className={cn(
//                       "w-8 h-8 rounded-full border transition-colors duration-200",
//                       "flex items-center justify-center",
//                       formData.selectedDays.includes(value)
//                         ? "bg-primary text-primary-foreground border-primary"
//                         : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
//                     )}
//                   >
//                     {day}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {formData.frequency === 'monthly' && (
//           <div className="col-span-2 space-y-4">
//             <Label>Monthly Recurrence Pattern</Label>
//             <RadioGroup
//               value={formData.monthlyRecurrenceType}
//               onValueChange={(value: MonthlyRecurrenceType) => 
//                 setFormData(prev => ({ ...prev, monthlyRecurrenceType: value }))
//               }
//               className="space-y-2"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="dayOfMonth" id="dayOfMonth" />
//                 <div className="flex items-center space-x-2">
//                   <Label htmlFor="dayOfMonth">On the</Label>
//                   <Select
//                     value={formData.dayOfMonth.toString()}
//                     onValueChange={(value) => 
//                       setFormData(prev => ({ ...prev, dayOfMonth: parseInt(value) }))
//                     }
//                     disabled={formData.monthlyRecurrenceType !== 'dayOfMonth'}
//                   >
//                     <SelectTrigger className="w-20">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Array.from({length: 31}, (_, i) => i + 1).map(day => (
//                         <SelectItem key={day} value={day.toString()}>
//                           {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <span>of every month</span>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="dayOfWeek" id="dayOfWeek" />
//                 <div className="flex items-center space-x-2">
//                   <Label htmlFor="dayOfWeek">On the</Label>
//                   <Select
//                     value={formData.weekOfMonth.toString()}
//                     onValueChange={(value) => 
//                       setFormData(prev => ({ ...prev, weekOfMonth: parseInt(value) }))
//                     }
//                     disabled={formData.monthlyRecurrenceType !== 'dayOfWeek'}
//                   >
//                     <SelectTrigger className="w-24">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="1">First</SelectItem>
//                       <SelectItem value="2">Second</SelectItem>
//                       <SelectItem value="3">Third</SelectItem>
//                       <SelectItem value="4">Fourth</SelectItem>
//                       <SelectItem value="5">Last</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Select
//                     value={formData.dayOfWeek.toString()}
//                     onValueChange={(value) => 
//                       setFormData(prev => ({ ...prev, dayOfWeek: parseInt(value) }))
//                     }
//                     disabled={formData.monthlyRecurrenceType !== 'dayOfWeek'}
//                   >
//                     <SelectTrigger className="w-32">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {weekdays.map(({ day, value }) => (
//                         <SelectItem key={value} value={value.toString()}>
//                           {day}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <span>of every month</span>
//                 </div>
//               </div>
//             </RadioGroup>
//           </div>
//         )}

//         <div>
//           <Label>Start Date</Label>
//           <Input
//             type="date"
//             value={formData.startDate}
//             onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
//             required
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <Switch
//             checked={showEndDate}
//             onCheckedChange={setShowEndDate}
//           />
//           <Label>Set End Date</Label>
//         </div>

//         {showEndDate && (
//           <div className="col-span-2">
//             <Label>End Date</Label>
//             <Input
//               type="date"
//               value={formData.endDate}
//               onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
//               min={formData.startDate}
//             />
//           </div>
//         )}

// <div>
//         <Label>Preferred Time</Label>
//         <div className="flex gap-2">
//           <Select
//             value={selectedHour}
//             onValueChange={(value) => handleTimeChange('hour', value)}
//           >
//             <SelectTrigger className="w-[100px]">
//               <SelectValue placeholder="Hour" />
//             </SelectTrigger>
//             <SelectContent>
//               {hours.map(hour => (
//                 <SelectItem key={hour} value={hour}>
//                   {hour}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select
//             value={selectedMinute}
//             onValueChange={(value) => handleTimeChange('minute', value)}
//           >
//             <SelectTrigger className="w-[100px]">
//               <SelectValue placeholder="Minute" />
//             </SelectTrigger>
//             <SelectContent>
//               {minutes.map(minute => (
//                 <SelectItem key={minute} value={minute}>
//                   :{minute}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       </div>

//       <div className="flex justify-end space-x-4 mt-6">
//         <Button type="submit">Create Habit</Button>
//       </div>
//     </form>
//   );
// };

// export default HabitForm;


// import React, { useState } from 'react';
// import { DateTime } from 'luxon';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Habit, HabitFrequency } from '@/types/habitsType';

// interface HabitFormProps {
//   onSubmit: (habit: Habit) => void;
//   initialData?: Habit;
// }

// const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialData }) => {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || '',
//     description: initialData?.description || '',
//     frequency: initialData?.schedule.frequency || 'daily' as HabitFrequency,
//     preferredTime: initialData?.schedule.preferredTime?.toFormat('HH:mm') || '',
//     selectedDays: initialData?.schedule.weeklySchedules?.[0]?.plannedDays || [],
//   });

//   const weekdays = [
//     { day: 'Mon', value: 1 },
//     { day: 'Tue', value: 2 },
//     { day: 'Wed', value: 3 },
//     { day: 'Thu', value: 4 },
//     { day: 'Fri', value: 5 },
//     { day: 'Sat', value: 6 },
//     { day: 'Sun', value: 7 }
//   ];

//   const toggleDay = (dayValue: number) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedDays: prev.selectedDays.includes(dayValue)
//         ? prev.selectedDays.filter(d => d !== dayValue)
//         : [...prev.selectedDays, dayValue].sort()
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const habit: Habit = {
//       id: initialData?.id || crypto.randomUUID(),
//       title: formData.title,
//       description: formData.description,
//       schedule: {
//         frequency: formData.frequency,
//         preferredTime: formData.preferredTime ? 
//           DateTime.fromFormat(formData.preferredTime, 'HH:mm') : 
//           undefined,
//         weeklySchedules: formData.frequency === 'weekly' ? [{
//           weekStartDate: DateTime.now().startOf('week'),
//           plannedDays: formData.selectedDays.length > 0 ? formData.selectedDays : [1, 2, 3, 4, 5]
//         }] : undefined
//       },
//       status: 'active',
//       createdAt: initialData?.createdAt || DateTime.now(),
//       updatedAt: DateTime.now(),
//       startDate: DateTime.now()
//     };

//     onSubmit(habit);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label>Habit Title</Label>
//         <Input
//           value={formData.title}
//           onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//           required
//           placeholder="Enter habit title"
//         />
//       </div>

//       <div>
//         <Label>Description</Label>
//         <Input
//           value={formData.description}
//           onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//           placeholder="Brief description"
//         />
//       </div>

//       <div>
//         <Label>Frequency</Label>
//         <Select 
//           value={formData.frequency}
//           onValueChange={(value: HabitFrequency) => {
//             setFormData(prev => ({ ...prev, frequency: value }));
//           }}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select frequency" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="daily">Daily</SelectItem>
//             <SelectItem value="weekly">Weekly</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {formData.frequency === 'weekly' && (
//         <div className="space-y-2">
//           <Label>Select Days</Label>
//           <div className="flex gap-2">
//             {weekdays.map(({ day, value }) => (
//               <button
//                 key={day}
//                 type="button"
//                 onClick={() => toggleDay(value)}
//                 className={`px-3 py-2 rounded-md transition-colors ${
//                   formData.selectedDays.includes(value)
//                     ? 'bg-primary text-primary-foreground'
//                     : 'bg-secondary hover:bg-secondary/80'
//                 }`}
//               >
//                 {day}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       <div>
//         <Label>Preferred Time</Label>
//         <Input
//           type="time"
//           value={formData.preferredTime}
//           onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
//         />
//       </div>

//       <div className="flex justify-end space-x-4 pt-4">
//         <Button type="submit">
//           {initialData ? 'Update' : 'Create'} Habit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default HabitForm;

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

export default HabitForm;