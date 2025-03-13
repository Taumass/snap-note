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
    <div className="space-y-4">
      {/* Sélection de la récurrence */}
      <Select onValueChange={setRecurrence} value={recurrence}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select recurrence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="biweekly">Biweekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>

      {/* Sélection des jours (uniquement si Weekly est choisi) */}
      {recurrence === 'weekly' && (
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
                        ? 'bg-blue-600 text-white border-2 border-blue-800 shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
