import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import type { Task } from '@snap-note/types';

import { addNotification } from './notificationsSlice';

interface TaskData extends Omit<Task, 'date'> {
  date: string;
}

type TaskState = {
  tasks: TaskData[];
};

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      taskName: 'Do the groceries',
      date: '2025-03-12',
      isRepeating: false,
      repeatFrequency: null,
      repeatDays: null,
      emoji: '🛒',
      isCompleted: false,
    },
    {
      id: 2,
      taskName: 'Code a React project',
      date: '2025-03-13',
      isRepeating: true,
      repeatFrequency: 'Weekly',
      repeatDays: [1, 3, 5],
      emoji: '💻',
      isCompleted: false,
    },
    {
      id: 3,
      taskName: 'Go to the gym',
      date: '2025-03-14',
      isRepeating: true,
      repeatFrequency: 'Daily',
      repeatDays: null,
      emoji: '🏋️',
      isCompleted: false,
    },
  ],
};

const selectRawTasks = (state: RootState) => state.tasks.tasks;

export const selectSortedTasks = createSelector([selectRawTasks], (tasks) =>
  tasks
    .map((task) => ({
      ...task,
      date: new Date(task.date),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
);

export const todayTasksSelector = createSelector([selectSortedTasks], (tasks) =>
  tasks.filter((task) => {
    const today = new Date();
    return task.date.toDateString() === today.toDateString();
  })
);

export const getTaskById = (
  taskId: number
): ((state: RootState) => TaskData | undefined) =>
  createSelector([selectRawTasks], (tasks) =>
    tasks.find((task) => task.id === taskId)
  );

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskData>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateRepeatDays: (
      state,
      action: PayloadAction<{ taskId: number; repeatDays: number[] | null }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.repeatDays = action.payload.repeatDays;
      }
    },
    editTask: (
      state,
      action: PayloadAction<{ taskId: number; updatedTask: Partial<TaskData> }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.taskId
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...action.payload.updatedTask,
        };
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, updateRepeatDays, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
