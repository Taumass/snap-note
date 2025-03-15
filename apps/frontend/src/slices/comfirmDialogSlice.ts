import { createSlice, configureStore } from '@reduxjs/toolkit';
import { deleteTask } from './taskSlice';

const comfirmDialogSlice = createSlice({
  name: 'alertDialog',
  initialState: {
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel',

    confirmActionType: null,
    confirmActionPayload: null,
    cancelActionType: null,
    cancelActionPayload: null,
  },
  reducers: {
    showDialog: (state, action) => {
      return {
        ...state,
        isOpen: true,
        ...action.payload,
      };
    },
    hideDialog: (state) => {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
});

export const { showDialog, hideDialog } = comfirmDialogSlice.actions;

export default comfirmDialogSlice.reducer;
