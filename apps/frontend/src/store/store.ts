import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import addTaskDrawerReducer from './addTaskDrawerSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    addTaskDrawer: addTaskDrawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
