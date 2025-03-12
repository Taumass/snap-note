import React from 'react';
import './CheckBox.css';

interface CheckBoxType {
  onToggleComplete: () => void;
  isCompleted: boolean;
}

const CheckBox = ({ onToggleComplete, isCompleted }: CheckBoxType) => {
  return (
    <div className="checkbox-wrapper-57">
      <label className="container">
        <input
          type="checkbox"
          onChange={onToggleComplete}
          checked={isCompleted}
        />
        <div className="checkmark"></div>
      </label>
    </div>
  );
};

export default CheckBox;
