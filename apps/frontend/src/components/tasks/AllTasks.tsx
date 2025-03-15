import React, { useMemo, useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import type { Task } from '@snap-note/types';
import FormatedDate from '../ui/formated-date';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  handleAddTask: () => void;
  noTaskText: string;
}

// Fonction d'aide pour formater la date comme clé de groupe
const formatDateKey = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  handleAddTask,
  noTaskText,
}) => {
  const [fadingSections, setFadingSections] = useState<Record<string, boolean>>(
    {}
  );
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>(
    {}
  );

  const tasksByDay = useMemo(() => {
    const grouped: Record<string, Task[]> = {};

    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedTasks.forEach((task) => {
      const dateKey = formatDateKey(task.date.toISOString());
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });

    return grouped;
  }, [tasks]);

  const checkIfSectionDisapear = (taskId: number) => {
    Object.keys(tasksByDay).forEach((dateKey) => {
      const remainingTasks = tasksByDay[dateKey].filter(
        (task) => task.id !== taskId
      );

      if (remainingTasks.length === 0) {
        setFadingSections((prev) => ({ ...prev, [dateKey]: true }));

        setTimeout(() => {
          setHiddenSections((prev) => ({ ...prev, [dateKey]: true }));
        }, 2500);
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full gap-0">
      {Object.entries(tasksByDay).map(([dateKey, dateTasks]) => {
        if (hiddenSections[dateKey]) return null;

        return (
          <div
            key={dateKey}
            className={`flex flex-col transition-all duration-[2500ms] ${
              fadingSections[dateKey]
                ? 'opacity-0 -mt-17.5'
                : 'opacity-100 mt-0'
            }`}>
            <div
              className={`sticky top-0 py-3 mb-4 border-b-2 border-gray-200 flex transition-all duration-[2500ms] ${
                fadingSections[dateKey]
                  ? 'translate-x-[-100%]'
                  : 'translate-x-10'
              }`}>
              <h2 className="text-lg font-bold text-gray-800">
                <FormatedDate date={dateTasks[0].date} />
              </h2>
              <span className="ml-3 text-sm text-gray-500 font-medium">
                {dateTasks.length} {dateTasks.length > 1 ? 'tasks' : 'task'}
              </span>
            </div>

            <div className="flex flex-col w-full">
              {dateTasks.map((task) => (
                <TaskItem
                  id={task.id}
                  key={task.id}
                  taskName={task.taskName}
                  date={task.date}
                  isRepeating={task.isRepeating}
                  repeatFrequency={task.repeatFrequency}
                  emoji={task.emoji}
                  isCompleted={task.isCompleted}
                  onToggleComplete={() => {
                    onToggleComplete(task.id);
                    checkIfSectionDisapear(task.id);
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-lg">
            {noTaskText} Relax or{' '}
            <button
              onClick={handleAddTask}
              className="text-blue-500 hover:underline cursor-pointer">
              add another
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
