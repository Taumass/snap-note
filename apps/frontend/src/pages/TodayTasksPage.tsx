'use client';

import type { Task } from '@snap-note/types';

// ** COMPONENTS
import TaskList from '@/components/tasks/TaskList';
import CreateTask from '@/components/tasks/CreateTask';
import AddTaskButton from '@/components/ui/add-task-button';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTask, deleteTask } from '@/slices/taskSlice';
import { addNotification } from '@/slices/notificationsSlice';
import { todayTasksSelector } from '@/slices/taskSlice';
import { openDrawer } from '@/slices/addTaskDrawerSlice';

export default function Home() {
  const dispatch = useDispatch();

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
  const tasks: Task[] = useSelector(todayTasksSelector);

  return (
    <main className="px-8 w-full flex-1 transition-all duration-200">
      <div className="w-full h-full py-8">
        <div className="flex flex-col flex-grow h-full w-full">
          <div
            className="mb-8 pl-6 border-l-4 flex items-center justify-between"
            style={{ borderColor: '#605770' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Your Tasks for Today
              </h1>
              <p className="text-gray-500 mt-1">
                {tasks.filter((t) => !t.isCompleted).length} tasks remaining
              </p>
            </div>

            <AddTaskButton />
          </div>

          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            handleAddTask={handleOpenDrawer}
            noTaskText="All your tasks for today are done!"
          />

          <CreateTask />
        </div>
      </div>
    </main>
  );
}
