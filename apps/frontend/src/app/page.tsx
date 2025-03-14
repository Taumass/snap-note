'use client';

import type { Task } from '@snap-note/types';

// ** COMPONENTS
import TaskList from '@/components/tasks/TaskList';
import CreateTask from '@/components/tasks/CreateTask';
import AddTaskButton from '@/components/ui/add-task-button';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTask } from '@/store/taskSlice';
import { selectSortedTasks } from '@/store/taskSlice';

export default function Home() {
  const dispatch = useDispatch();

  const handleToggleComplete = (taskId: number) => {
    dispatch(toggleTask(taskId));
  };
  const tasks: Task[] = useSelector(selectSortedTasks);

  return (
    <main className="px-8 w-full flex-1 transition-all duration-200">
      <div className="w-full h-full py-8">
        <div className="flex flex-col flex-grow h-full w-full">
          <div
            className="mb-8 pl-6 border-l-4 flex items-center justify-between"
            style={{ borderColor: '#605770' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
              <p className="text-gray-500 mt-1">
                {tasks.filter((t) => !t.isCompleted).length} tasks remaining
              </p>
            </div>

            <AddTaskButton />
          </div>

          <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />

          <CreateTask />
        </div>
      </div>
    </main>
  );
}
