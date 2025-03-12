'use client';

import TaskList from '@/components/tasks/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTask } from '@/store/taskSlice';

export default function Home() {
  const dispatch = useDispatch();

  const handleToggleComplete = (taskId: number) => {
    dispatch(toggleTask(taskId)); // Dispatcher l'action Redux
  };
  const tasks = useSelector((state: RootState) =>
    [...state.tasks.tasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  );

  return (
    <main className="px-8 w-full flex-1 transition-all duration-200">
      <div className="w-full h-full py-8">
        <div className="flex flex-col flex-grow h-full w-full">
          <div
            className="mb-8 pl-6 border-l-4"
            style={{ borderColor: '#605770' }}>
            <h1 className="text-3xl font-bold text-gray-800">
              My Tasks
              <span className="ml-2" style={{ color: '#605770' }}>
                ✓
              </span>
            </h1>
            <p className="text-gray-500 mt-1">
              {tasks.filter((t) => !t.isCompleted).length} tasks remaining
            </p>
          </div>
          <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
        </div>
      </div>
    </main>
  );
}
