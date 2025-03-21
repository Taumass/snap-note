'use client';

import React, { useState, useEffect } from 'react';
import CheckBox from './CheckBox';
import FormatedDate from '../ui/formated-date';
import useSound from 'use-sound';
import Link from 'next/link';

import type { Task } from '@snap-note/types';
import { useRouter } from 'next/navigation';

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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isInAnimation, setIsInAnimation] = useState(true);
  const [isAppearing, setIsAppearing] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState('0.5s');
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const itemLink = `task/${id}`;

  const redirectToItem = () => {
    router.push(itemLink);
  };

  const [play] = useSound('/sounds/task-completed.mp3', {
    volume: 0.5,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsAppearing(true);
    }, 10);
    setTimeout(() => {
      setIsInAnimation(false);
    }, 1000);
  }, []);

  const handleCheck = () => {
    if (!isCompleted) {
      play();
      setTransitionDuration('2.5s');
      setIsFadingOut(true);
      setIsInAnimation(true);
      onToggleComplete();
    } else {
      onToggleComplete();
    }
  };

  return (
    <div
      className={`w-full rounded-xl flex items-center justify-between transition-all ease-in-out shadow-lg hover:shadow-xl
    ${isFadingOut ? 'opacity-0 scale-50 max-h-0 -mb-1 py-0 px-0 overflow-hidden' : 'max-h-[200px] mb-4 p-6'}
    ${isAppearing && !isFadingOut ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
    ${!isInAnimation ? 'hover:scale-[1.02]' : ''}`}
      style={{
        backgroundColor: 'white',
        border: `2px solid #EDCB96`,
        transitionDuration,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <CheckBox
        key={id}
        onToggleComplete={handleCheck}
        isCompleted={isCompleted}
      />

      <div
        className={`flex-grow transition-all ${isFadingOut ? 'px-0' : 'px-4'}`}
        style={{ transitionDuration }}>
        <div
          className={`font-semibold text-2xl transition-colors cursor-pointer hover:underline ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
          }`}
          style={{ color: isCompleted ? '#9E7682' : '#4D4861' }}
          onClick={redirectToItem}>
          {taskName}
        </div>

        <div
          className={`flex items-center text-sm space-x-6 transition-all cursor-pointer ${
            isFadingOut ? '-mt-3' : 'mt-3'
          }`}
          style={{ transitionDuration }}
          onClick={redirectToItem}>
          <div
            className={`flex items-center rounded-full bg-[#F7C4A5]/20 shadow-sm border border-[#F7C4A5]/40 transition-all ${
              isFadingOut ? 'px-0 py-0' : 'px-4 py-2'
            }`}
            style={{ transitionDuration }}>
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

          {isRepeating && (
            <div
              className={`flex items-center rounded-full bg-[#EDCB96]/30 shadow-sm border border-[#EDCB96]/40 transition-all cursor-pointer ${
                isFadingOut ? 'px-0 py-0' : 'px-4 py-2'
              }`}
              style={{ transitionDuration }}
              onClick={redirectToItem}>
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
        className={`flex items-center transition-opacity duration-300 ${
          isHovered && !isFadingOut ? 'opacity-100' : 'opacity-0'
        }`}>
        <Link href={`/task/${id}`}>
          <button
            className="flex items-center justify-center bg-[#9E7682]/10 hover:bg-[#9E7682]/20 rounded-full p-2 mr-4 transition-all cursor-pointer hover:scale-110"
            aria-label="Éditer la tâche">
            <svg
              className="w-5 h-5 text-[#4D4861]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </button>
        </Link>
      </div>

      <div
        className={`flex-shrink-0 text-4xl rounded-full shadow-md bg-[#9E7682]/20 border border-[#9E7682]/10 transition-all hover:scale-110 ${
          isFadingOut ? 'ml-0 p-0' : 'p-4'
        }`}
        style={{
          boxShadow:
            'inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1)',
          transitionDuration,
        }}>
        {emoji}
      </div>
    </div>
  );
};

export default TaskItem;
