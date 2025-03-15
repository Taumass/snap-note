'use client';

import * as React from 'react';
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
          onSelect={(day) => {
            day && setDate(day);
          }}
          initialFocus
          className="text-[#4D4861]"
        />
      </PopoverContent>
    </Popover>
  );
}
