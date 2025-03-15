'use client';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { hideDialog } from '@/slices/comfirmDialogSlice';
import { deleteTask } from '@/slices/taskSlice';
import { addNotification } from '@/slices/notificationsSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CustomizeAlertDialog({}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isOpen,
    title,
    description,
    confirmLabel,
    cancelLabel,
    confirmActionType,
    confirmActionPayload,
    cancelActionType,
    cancelActionPayload,
  } = useSelector((state: any) => state.alertDialog);

  const handleConfirm = () => {
    dispatch(hideDialog());

    switch (confirmActionType) {
      case 'CUSTOM_DELETE_TASK':
        dispatch(deleteTask(confirmActionPayload.id));
        dispatch(
          addNotification({
            message: 'Task Deleted Sucessfully',
            type: 'success',
          })
        );
        router.push('/');
        break;

      default:
        console.warn('Unknown action type:', confirmActionType);
    }
  };

  const handleCancel = () => {
    dispatch(hideDialog());

    if (!cancelActionType) return;

    switch (cancelActionType) {
      default:
        console.warn('Unknown action type:', cancelActionType);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => dispatch(hideDialog())}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelLabel || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmLabel || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
