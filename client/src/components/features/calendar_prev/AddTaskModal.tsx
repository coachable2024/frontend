import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus, TaskPriority } from '@/types/tasksType';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onAddTask: (task: Task) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate: selectedDate,
      priority: 'medium' as TaskPriority,
      status: 'todo' as TaskStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">Add New Task</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md p-2"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Add Task</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 