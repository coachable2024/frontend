'use client'
import { useEffect, useState } from 'react';
import TaskCalendar from '@/components/features/calendar/Calendar';
import { PageHeader } from '@/components/layout/PageHeader';
import { mockTaskService } from '@/services/mock/mockTasks';
import { Task } from '@/types/tasksType';
import { TaskForm } from '@/components/features/task/TaskForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await mockTaskService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleTaskUpdate = async (updatedTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedTask) return;
    
    try {
      const updatedTask = await mockTaskService.updateTask(selectedTask.id, updatedTaskData);
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to update task:', error);
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
        onEditTask={handleEditTask}
      />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTask && (
            <TaskForm
              initialTask={selectedTask}
              onSubmit={handleTaskUpdate}
              onCancel={() => setIsFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}