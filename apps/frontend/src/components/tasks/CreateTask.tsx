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
  DrawerTrigger,
} from '@/components/ui/drawer';

import EmojiPicker from '@/components/ui/emoji-picker';
import ReccurentTaskParams from './ReccurentTaskParams';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addTask, selectSortedTasks } from '@/store/taskSlice';
import { closeDrawer, setDrawerState } from '@/store/addTaskDrawerSlice';

export default function DrawerDemo() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectSortedTasks);
  const isOpen = useSelector((state: RootState) => state.addTaskDrawer.isOpen);

  const [date, setDate] = React.useState<Date>(new Date());
  const [title, setTitle] = React.useState('');
  const [emoji, setEmoji] = React.useState('📝');
  const [isRepeating, setIsRepeating] = React.useState(false);
  const [recurrence, setRecurrence] = React.useState<string>('');
  const [repeatDays, setRepeatDays] = React.useState<Set<number>>(new Set());

  const handleOpen = () => {
    setEmoji('📝');
    setTitle('');
    setDate(new Date());
    setIsRepeating(false);
  };

  const handleSubmit = () => {
    // Vérification des champs requis
    if (!title.trim()) {
      alert('Task name is required!');
      return;
    }
    if (!date) {
      alert('Please select a date!');
      return;
    }
    if (isRepeating && !recurrence) {
      alert('Please select a recurrence type!');
      return;
    }
    if (isRepeating && recurrence === 'weekly' && repeatDays.size === 0) {
      alert('Please select at least one day for weekly recurrence!');
      return;
    }

    // Génération d'un nouvel ID
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    // Création de la nouvelle tâche
    const newTask = {
      id: newId,
      taskName: title,
      date: date.toISOString(),
      isRepeating,
      repeatFrequency: isRepeating ? recurrence : null,
      repeatDays: isRepeating ? [...repeatDays] : null,
      emoji,
      isCompleted: false,
    };

    console.log(newTask);

    dispatch(addTask(newTask));

    dispatch(closeDrawer());
  };
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(state) => dispatch(setDrawerState(state))}>
      <DrawerTrigger asChild>
        <Button variant="outline" size={'icon'} onClick={handleOpen}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col items-center justify-center mx-auto w-full max-w-sm text-center">
          <DrawerHeader>
            <DrawerTitle>Create a Task</DrawerTitle>
            <DrawerDescription>
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
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="flex-1"
                />
                <EmojiPicker emoji={emoji} setEmoji={setEmoji} />
              </div>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <RefreshCcw />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Repeat This Task
                </p>
              </div>
              <Switch checked={isRepeating} onCheckedChange={setIsRepeating} />
            </div>
            <div className="flex items-center space-x-4">
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
          </div>
          <DrawerFooter className="w-full flex justify-between">
            <Button onClick={handleSubmit}>Create</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
