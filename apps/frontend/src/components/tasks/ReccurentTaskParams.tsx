import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RecurrentTaskParamsProps {
  recurrence: string;
  repeatDays: Set<number>;
  setRecurrence: (value: string) => void;
  setRepeatDays: (value: Set<number>) => void;
}

export default function RecurrentTaskParams({
  recurrence,
  repeatDays,
  setRecurrence,
  setRepeatDays,
}: RecurrentTaskParamsProps) {
  return (
    <div className="space-y-4 bg-[#EDCB96]/20 p-4 rounded-lg">
      {/* Sélection de la récurrence */}
      <Select onValueChange={setRecurrence} value={recurrence}>
        <SelectTrigger className="w-[200px] bg-[#F7C4A5]/10 text-[#4D4861] border-[#9E7682]">
          <SelectValue placeholder="Select recurrence" />
        </SelectTrigger>
        <SelectContent className="bg-[#F7C4A5]/80 text-[#4D4861]">
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="biweekly">Biweekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>

      {(recurrence === 'weekly' || recurrence === 'biweekly') && (
        <div className="mt-4">
          <ToggleGroup
            type="multiple"
            value={[...repeatDays].map(String)}
            onValueChange={(values) =>
              setRepeatDays(new Set(values.map(Number)))
            }
            className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day, index) => (
                <ToggleGroupItem
                  key={index}
                  value={index.toString()}
                  className={`w-12 h-12 text-sm font-medium rounded-lg transition-all
              ${
                repeatDays.has(index)
                  ? 'bg-[#000]/20 text-white border-2 border-[#605770]/20 shadow-lg scale-105'
                  : 'bg-[#fff]/70 text-[#4D4861] hover:bg-[#EDCB96]-200'
              }`}>
                  {day}
                </ToggleGroupItem>
              )
            )}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
}
