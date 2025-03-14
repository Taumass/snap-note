'use client';

import * as React from 'react';
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  isSameWeek,
  differenceInCalendarDays,
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FormatedDate from './formated-date';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const getFormattedDate = (date: Date | null) => {
    if (!date) return 'Pick a date';
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';

    const currentDate = new Date();

    if (isSameWeek(date, currentDate)) {
      const dayDifference = differenceInCalendarDays(date, currentDate);

      if (dayDifference < 0) {
        return `Last ${format(date, 'EEEE')}`;
      } else {
        return `${format(date, 'EEEE')}`;
      }
    }

    return format(date, 'PPP');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[200px] flex justify-start text-left font-normal pl-4 border-[#9E7682] bg-[#EDCB96]/50 text-[#4D4861] hover:bg-[#F7C4A5] hover:border-[#605770] transition-all',
            !date && 'text-muted-foreground'
          )}>
          <CalendarIcon className="mr-2 text-[#4D4861]" />
          <div className="flex justify-center w-full -ml-5">
            <FormatedDate date={date} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex justify-center bg-[#fef9f6] border-[#9E7682] rounded-md shadow-md">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => day && setDate(day)}
          initialFocus
          className="text-[#4D4861]"
        />
      </PopoverContent>
    </Popover>
  );
}
