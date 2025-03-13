export interface Task {
  id: number;
  taskName: string;
  date: string;
  isRepeating: boolean;
  repeatFrequency: string | null;
  repeatDays: number[] | null;
  emoji: string;
  isCompleted: boolean;
}
