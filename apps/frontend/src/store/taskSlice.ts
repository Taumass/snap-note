import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import type { Task } from '@snap-note/types';

type TaskState = {
  tasks: Task[];
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
      isCompleted: true,
    },
  ],
};

const selectRawTasks = (state: RootState) => state.tasks.tasks;

export const selectSortedTasks = createSelector([selectRawTasks], (tasks) =>
  tasks
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
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
  },
});

export const { addTask, toggleTask, updateRepeatDays } = taskSlice.actions;
export default taskSlice.reducer;
