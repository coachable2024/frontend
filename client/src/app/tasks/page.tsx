'use client';

import { useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/types/tasksType';
import { TaskCard } from '@/components/features/task/TaskCard';
import { TaskForm } from '@/components/features/task/TaskForm';
import { taskService } from '@/services';


interface TasksPageProps {
  isMainExpanded?: boolean;  
}

const TasksPage = ({ isMainExpanded = true }: TasksPageProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [relationFilter, setRelationFilter] = useState<'all' | 'related' | 'independent'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating task:', taskData);
      const newTask = await taskService.createTask(taskData);
      console.log('Response:', newTask);
      setTasks([...tasks, newTask]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleEditTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' ? true : task.status === statusFilter;
    const relationMatch = relationFilter === 'all' ? true : 
      relationFilter === 'related' ? task.relatedToGoal : !task.relatedToGoal;
    return statusMatch && relationMatch;
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
            className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mr-2">Task Type:</label>
        <select
          value={relationFilter}
          onChange={(e) => setRelationFilter(e.target.value as 'all' | 'related' | 'independent')}
          className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Tasks</option>
          <option value="related">Goals Related</option>
          <option value="independent">Independent Tasks</option>
        </select>
      </div>
    </div>

      {(isFormOpen || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            <TaskForm
              initialTask={editingTask || undefined}
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

        <div className={`
          grid gap-4 auto-rows-fr
          grid-cols-1
          ${isMainExpanded ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}
        `}>
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

      {filteredTasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks found. Click "Add Task" to create one.
        </div>
      )}
    </div>
  );
}

export default TasksPage;