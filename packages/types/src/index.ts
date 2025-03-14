export interface Task {
  id: number;
  taskName: string;
  date: Date;
  isRepeating: boolean;
  repeatFrequency: string | null;
  repeatDays: number[] | null;
  emoji: string;
  isCompleted: boolean;
}
