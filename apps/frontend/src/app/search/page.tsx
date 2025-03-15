'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@snap-note/types';
import { useSelector } from 'react-redux';
import { selectSortedTasks } from '@/slices/taskSlice';

// ** COMPONENTS
import TaskList from '@/components/tasks/TaskList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '@/slices/taskSlice';
import { addNotification } from '@/slices/notificationsSlice';
import { openDrawer } from '@/slices/addTaskDrawerSlice';
import AddTaskButton from '@/components/ui/add-task-button';
import CreateTask from '@/components/tasks/CreateTask';
import { Search, X, Filter } from 'lucide-react';

export default function SearchTasks() {
  const dispatch = useDispatch();
  const allTasks: Task[] = useSelector(selectSortedTasks);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'pending'
  >('all');
  const [filterDate, setFilterDate] = useState<
    'all' | 'today' | 'upcoming' | 'past'
  >('all');

  // Handler functions
  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const handleToggleComplete = (taskId: number) => {
    dispatch(
      addNotification({
        message: 'Task completed!',
        type: 'success',
      })
    );
    dispatch(toggleTask(taskId));

    setTimeout(() => {
      dispatch(deleteTask(taskId));
    }, 2600);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter and search logic
  useEffect(() => {
    let results = [...allTasks];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (task) =>
          task.taskName.toLowerCase().includes(query) ||
          task.emoji?.includes(query)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      results = results.filter((task) =>
        filterStatus === 'completed' ? task.isCompleted : !task.isCompleted
      );
    }

    // Apply date filter
    if (filterDate !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      results = results.filter((task) => {
        const taskDate = new Date(task.date);

        if (filterDate === 'today') {
          return taskDate.toDateString() === today.toDateString();
        } else if (filterDate === 'upcoming') {
          return taskDate > today;
        } else if (filterDate === 'past') {
          return taskDate < today;
        }
        return true;
      });
    }

    setFilteredTasks(results);
  }, [searchQuery, allTasks, filterStatus, filterDate]);

  return (
    <main className="px-8 w-full flex-1 transition-all duration-200">
      <div className="w-full h-full py-8">
        <div className="flex flex-col flex-grow h-full w-full">
          <div
            className="mb-8 pl-6 border-l-4 flex items-center justify-between"
            style={{ borderColor: '#605770' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Search Tasks</h1>
              <p className="text-gray-500 mt-1">
                {filteredTasks.length} tasks found
              </p>
            </div>

            <AddTaskButton />
          </div>

          {/* Search bar */}
          <div className="mb-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10 pr-10"
                placeholder="Search by task name or emoji..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}>
                  <X size={16} />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFilters}
              className={showFilters ? 'bg-gray-100' : ''}>
              <Filter size={18} />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in-20 slide-in-from-top-5 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700">
                    Status
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('all')}>
                      All
                    </Button>
                    <Button
                      variant={
                        filterStatus === 'pending' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setFilterStatus('pending')}>
                      Pending
                    </Button>
                    <Button
                      variant={
                        filterStatus === 'completed' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setFilterStatus('completed')}>
                      Completed
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700">Date</p>
                  <div className="flex gap-2">
                    <Button
                      variant={filterDate === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterDate('all')}>
                      All
                    </Button>
                    <Button
                      variant={filterDate === 'today' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterDate('today')}>
                      Today
                    </Button>
                    <Button
                      variant={
                        filterDate === 'upcoming' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setFilterDate('upcoming')}>
                      Upcoming
                    </Button>
                    <Button
                      variant={filterDate === 'past' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterDate('past')}>
                      Past
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            handleAddTask={handleOpenDrawer}
            noTaskText="No tasks match your search"
          />

          <CreateTask />
        </div>
      </div>
    </main>
  );
}
