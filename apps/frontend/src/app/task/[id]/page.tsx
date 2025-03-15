'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '@/slices/notificationsSlice';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import EmojiPicker from '@/components/ui/emoji-picker';
import FormatedDate from '@/components/ui/formated-date';
import { DatePicker } from '@/components/ui/date-picker';

import { editTask, getTaskById } from '@/slices/taskSlice';
import { RootState } from '@/store/store';
import AlertDialog from '@/components/notifications/AlertDialog';
import { showDialog } from '@/slices/comfirmDialogSlice';

const TaskEditPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = useParams() as { id: string | string[] };
  const taskId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id ?? '0', 10);

  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskEmoji, setTaskEmoji] = useState('');
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('Daily');
  const [repeatDays, setRepeatDays] = useState<number[]>([]);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const task = useSelector((state: RootState) => getTaskById(taskId)(state));
  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setTaskDate(new Date(task.date));
      setTaskEmoji(task.emoji);
      setIsRepeating(task.isRepeating);
      setRepeatFrequency(task.repeatFrequency ?? 'Daily');
      setRepeatDays(task.repeatDays ?? []);
    }
  }, [task]);

  const redirectToHome = () => {
    router.push('/');
  };

  const handleSave = () => {
    if (!id) return;
    setIsSaving(true);

    let date = `${taskDate.getFullYear()}-${(taskDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${taskDate.getDate().toString().padStart(2, '0')}`;
    try {
      dispatch(
        editTask({
          taskId,
          updatedTask: {
            taskName,
            date,
            emoji: taskEmoji,
            isRepeating,
            repeatFrequency,
            repeatDays,
          },
        })
      );
      redirectToHome();
      dispatch(
        addNotification({
          message: 'Task Edited Sucessfully',
          type: 'success',
        })
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    dispatch(
      showDialog({
        title: 'Delete Note',
        description:
          'Are you sure you want to delete this note? This action cannot be undone.',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        confirmActionType: 'CUSTOM_DELETE_TASK',
        confirmActionPayload: { id: taskId },
      })
    );
  };

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Task Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops, we couldn't find the task you were looking for.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-[#9E7682] text-white rounded-md hover:bg-[#8C6773] transition-colors cursor-pointer">
          Go Back to Tasks
        </button>
      </div>
    );
  }

  function handleToggleDay(index: number): void {
    setRepeatDays((prevDays) =>
      prevDays.includes(index)
        ? prevDays.filter((day) => day !== index)
        : [...prevDays, index]
    );
  }
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <AlertDialog />
          <button
            className="flex items-center text-[#4D4861] hover:text-[#9E7682] transition-colors cursor-pointer"
            onClick={redirectToHome}>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to Tasks
          </button>

          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#EDCB96] text-[#4D4861] rounded-md hover:bg-[#E3BD80] transition-colors flex items-center cursor-pointer">
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center cursor-pointer"
                  onClick={handleDelete}>
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  disabled={isSaving}>
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#9E7682] text-white rounded-md hover:bg-[#8C6773] transition-colors flex items-center cursor-pointer"
                  disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      Save
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-[#EDCB96] relative">
          <div className="flex items-start justify-between mb-6">
            <div
              className="flex-shrink-0 text-4xl rounded-full shadow-md bg-[#9E7682]/20 border border-[#9E7682]/10 p-4 mr-6"
              style={{
                boxShadow:
                  'inset 2px 2px 5px rgba(255,255,255,0.4), inset -2px -2px 5px rgba(0,0,0,0.1)',
              }}>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger className="text-4xl hover:scale-110 transition-transform cursor-pointer">
                    {taskEmoji || '😀'}
                  </PopoverTrigger>
                  <PopoverContent className="absolute z-10 mt-2">
                    <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
                      <EmojiPicker emoji={taskEmoji} setEmoji={setTaskEmoji} />
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                task.emoji
              )}
            </div>

            <div className="flex-grow">
              {isEditing ? (
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full text-3xl font-semibold text-[#4D4861] bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9E7682]/50"
                  placeholder="Nom de la tâche"
                />
              ) : (
                <h1
                  className={`text-3xl font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-[#4D4861]'}`}>
                  {task.taskName}
                </h1>
              )}

              <div className="flex items-center mt-2">
                {isEditing ? (
                  <DatePicker date={taskDate} setDate={setTaskDate} />
                ) : (
                  <span className="font-medium">
                    <FormatedDate date={taskDate} />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#4D4861] mb-3">
              Repetitions
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isRepeating"
                    checked={isRepeating}
                    onChange={() => setIsRepeating(!isRepeating)}
                    className="w-4 h-4 text-[#9E7682] rounded focus:ring-[#9E7682]"
                  />
                  <label htmlFor="isRepeating" className="ml-2 text-gray-700">
                    Reccurent Task
                  </label>
                </div>

                {isRepeating && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Frequency
                      </label>
                      <select
                        value={repeatFrequency}
                        onChange={(e) => setRepeatFrequency(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9E7682]/50">
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Weekly">Biweekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Monthly">Yearly</option>
                      </select>
                    </div>

                    {repeatFrequency === 'Weekly' && (
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Days of the weeks
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {daysOfWeek.map((day, index) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleToggleDay(index)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                repeatDays.includes(index)
                                  ? 'bg-[#9E7682] text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}>
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-4">
                {task.isRepeating ? (
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 mr-2"
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
                      <span>
                        <span className="font-medium">
                          {task.repeatFrequency}
                        </span>
                      </span>
                    </div>

                    {task.repeatFrequency === 'Weekly' &&
                      task.repeatDays &&
                      task.repeatDays.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-7">
                          {task.repeatDays.map((dayIndex) => (
                            <span
                              key={dayIndex}
                              className="text-sm bg-[#EDCB96]/30 text-[#4D4861] px-2 py-1 rounded-full">
                              {daysOfWeek[dayIndex]}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No Repetitions</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskEditPage;

function setIsSaving(arg0: boolean) {
  throw new Error('Function not implemented.');
}
