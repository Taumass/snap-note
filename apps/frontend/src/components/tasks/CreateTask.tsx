'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { RefreshCcw } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import EmojiPicker from '@/components/ui/emoji-picker';
import ReccurentTaskParams from './ReccurentTaskParams';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addTask, selectSortedTasks } from '@/slices/taskSlice';
import { closeDrawer, setDrawerState } from '@/slices/addTaskDrawerSlice';
import { addNotification } from '@/slices/notificationsSlice';
import { set } from 'date-fns';

export default function DrawerDemo() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectSortedTasks);
  const isOpen = useSelector((state: RootState) => state.addTaskDrawer.isOpen);

  const [titleError, setTitleError] = React.useState(false);

  const [date, setDate] = React.useState<Date>(new Date());
  const [title, setTitle] = React.useState('');
  const [emoji, setEmoji] = React.useState('📝');
  const [isRepeating, setIsRepeating] = React.useState(false);
  const [recurrence, setRecurrence] = React.useState<string>('');
  const [repeatDays, setRepeatDays] = React.useState<Set<number>>(new Set());

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError(true);
      dispatch(addNotification({ message: 'Title is missing', type: 'error' }));
      return;
    }
    if (!date) {
      dispatch(
        addNotification({ message: 'Please select a date', type: 'error' })
      );
      return;
    }
    if (isRepeating && !recurrence) {
      dispatch(
        addNotification({
          message: 'Please select a recurrence type!',
          type: 'error',
        })
      );
      return;
    }

    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    const newTask = {
      id: newId,
      taskName: title,
      date: date.toISOString().split('T')[0],
      isRepeating,
      repeatFrequency: isRepeating ? recurrence : null,
      repeatDays: isRepeating ? [...repeatDays] : null,
      emoji,
      isCompleted: false,
    };

    dispatch(addTask(newTask));

    dispatch(
      addNotification({
        message: `Task "${title}" created successfully!`,
        type: 'success',
      })
    );

    dispatch(closeDrawer());
  };
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(state) => {
        dispatch(setDrawerState(state));
        setEmoji('📝');
        setTitle('');
        setDate(new Date());
        setIsRepeating(false);
        setRecurrence('');
        setRepeatDays(new Set());
        setTitleError(false);
      }}>
      <DrawerContent className="bg-[#FFFFFC] text-[#4D4861] rounded-t-2xl shadow-lg">
        <div className="flex flex-col items-center justify-center mx-auto w-full max-w-sm text-center">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-[#4D4861]">
              Create a Task
            </DrawerTitle>
            <DrawerDescription className="text-[#605770]">
              Every great achievement starts with a single task.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mb-4 w-full flex items-center justify-center">
            <DatePicker date={date} setDate={setDate} />
          </div>

          <div className="p-4 pb-0 w-full">
            <div className="mb-4 w-full">
              <div className="flex items-center mt-1 w-full gap-2">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError) setTitleError(false); // Supprime l'erreur si l'utilisateur tape
                  }}
                  placeholder="Enter title"
                  className={`flex-1 bg-[#FFFFFC] border ${
                    titleError ? 'border-red-500' : 'border-[#9E7682]'
                  } text-[#4D4861] focus:ring-2 focus:ring-[#9E7682] rounded-md`}
                />
                <EmojiPicker emoji={emoji} setEmoji={setEmoji} />
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md border p-4 bg-[#FFFFFC] border-[#9E7682]">
              <RefreshCcw className="text-[#4D4861]" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none text-[#4D4861]">
                  Repeat This Task
                </p>
              </div>
              <Switch
                checked={isRepeating}
                onCheckedChange={setIsRepeating}
                className="bg-[#9E7682] border-[#4D4861]"
              />
            </div>

            {isRepeating && (
              <div className="flex-1 space-y-1 mt-4">
                <ReccurentTaskParams
                  recurrence={recurrence}
                  repeatDays={repeatDays}
                  setRecurrence={setRecurrence}
                  setRepeatDays={setRepeatDays}
                />
              </div>
            )}
          </div>

          <DrawerFooter className="w-full flex justify-between p-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#9E7682]/50 text-[#4D4861] px-6 py-2 rounded-md hover:bg-[#9E7682]/70 transition">
              Create
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="border-[#4D4861] text-[#4D4861] hover:bg-[#EDCB96] hover:border-[#9E7682] transition">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
