'use client'

import { useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/types/tasksType';
import { TaskCard } from '@/components/features/task/TaskCard';
import { TaskForm } from '@/components/features/task/TaskForm';
import { taskService } from '@/services';
import { 
  PlusCircle, 
  Loader2,
  ClipboardList,
  CheckSquare
} from 'lucide-react';

// Define the component as a proper Next.js page component
export default function Page() {
  const [isMainExpanded, setIsMainExpanded] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [relationFilter, setRelationFilter] = useState<'all' | 'related' | 'independent'>('all');
  const [showFilters, setShowFilters] = useState(true);

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
      const newTask = await taskService.createTask(taskData);
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
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading your tasks...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <CheckSquare className="text-blue-600" />
                Tasks
              </h1>
              <p className="text-gray-500 mt-1">
                Manage and track your progress
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>

          {/* Filters Section */}
          <div className="mt-6">
            <div className="mt-4 flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
                <select
                  value={relationFilter}
                  onChange={(e) => setRelationFilter(e.target.value as 'all' | 'related' | 'independent')}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Tasks</option>
                  <option value="related">Goals Related</option>
                  <option value="independent">Independent Tasks</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className={`
          grid gap-6
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
          <div className="text-center py-16">
            <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first task</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {(isFormOpen || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
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
    </div>
  );
}