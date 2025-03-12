import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: number;
  taskName: string;
  date: string;
  isRepeating: boolean;
  repeatFrequency: string;
  emoji: string;
  isCompleted: boolean;
};

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [
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
  ],
};

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
  },
});

export const { addTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
