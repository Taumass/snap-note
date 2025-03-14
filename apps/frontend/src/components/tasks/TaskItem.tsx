import React from 'react';
import CheckBox from './CheckBox';
import FormatedDate from '../ui/formated-date';

import type { Task } from '@snap-note/types';

type TaskItemProps = Omit<Task, 'repeatDays'> & {
  onToggleComplete: () => void;
};

const TaskItem = ({
  id,
  taskName = 'Untitled Task',
  date,
  isRepeating,
  repeatFrequency,
  emoji,
  isCompleted,
  onToggleComplete,
}: TaskItemProps) => {
  const colors = {
    beige: '#EDCB96',
    peach: '#F7C4A5',
    mauve: '#9E7682',
    purple: '#605770',
    darkPurple: '#4D4861',
  };

  return (
    <div
      className={`w-full rounded-xl p-6 mb-4 flex items-center justify-between transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-[1.02] ${
        isCompleted ? 'opacity-50' : ''
      }`}
      style={{
        backgroundColor: 'white',
        border: `2px solid ${colors.beige}`,
      }}>
      <CheckBox
        key={id}
        onToggleComplete={onToggleComplete}
        isCompleted={isCompleted}
      />

      <div className="flex-grow px-4">
        <div
          className={`font-semibold text-2xl transition-colors ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
          }`}
          style={{ color: isCompleted ? colors.mauve : colors.darkPurple }}>
          {taskName}
        </div>

        <div className="flex items-center mt-3 text-sm space-x-6">
          {/* Date */}
          <div className="flex items-center px-4 py-2 rounded-full bg-[#F7C4A5]/20 shadow-sm border border-[#F7C4A5]/40">
            <svg
              className="w-5 h-5 mr-2 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="font-medium">
              <FormatedDate date={date} />
            </span>
          </div>

          {/* Répétition */}
          {isRepeating && (
            <div className="flex items-center px-4 py-2 rounded-full bg-[#EDCB96]/30 shadow-sm border border-[#EDCB96]/40">
              <svg
                className="w-5 h-5 mr-2 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span className="font-medium">Repeat {repeatFrequency}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex-shrink-0 ml-6 text-4xl p-4 rounded-full shadow-md bg-[#9E7682]/20 border border-[#9E7682]/10 transition-all hover:scale-110"
        style={{
          boxShadow:
            'inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1)',
        }}>
        {emoji}
      </div>
    </div>
  );
};

export default TaskItem;
