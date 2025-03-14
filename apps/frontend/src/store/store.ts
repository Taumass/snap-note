import { configureStore } from '@reduxjs/toolkit';

// Import the slice reducers
import taskReducer from '../slices/taskSlice';
import addTaskDrawerReducer from '../slices/addTaskDrawerSlice';
import notificationReducer from '../slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    addTaskDrawer: addTaskDrawerReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
