import React from 'react';
import './add-task-button.css';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/slices/addTaskDrawerSlice';

const AddTaskButton = () => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  return (
    <button className="button-26" role="button" onClick={handleOpenDrawer}>
      <div className="button-26__content">
        <span className="button-26__text text">Add Task</span>
      </div>
    </button>
  );
};

export default AddTaskButton;
