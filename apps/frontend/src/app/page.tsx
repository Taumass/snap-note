'use client';

import { useState } from 'react';
import TaskList from '@/components/tasks/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: 'Faire les courses',
      date: '2025-03-12',
      isRepeating: false,
      repeatFrequency: '',
      emoji: '🛒',
      isCompleted: false,
    },
    {
      id: 2,
      taskName: 'Coder un projet React',
      date: '2025-03-13',
      isRepeating: true,
      repeatFrequency: 'Weekly',
      emoji: '💻',
      isCompleted: false,
    },
    {
      id: 3,
      taskName: 'Aller à la salle de sport',
      date: '2025-03-14',
      isRepeating: true,
      repeatFrequency: 'Daily',
      emoji: '🏋️',
      isCompleted: true,
    },
  ]);

  const onToggleComplete = (taskId: number, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: completed } : task
      )
    );
  };

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
          <TaskList tasks={tasks} onToggleComplete={onToggleComplete} />
        </div>
      </div>
    </main>
  );
}
