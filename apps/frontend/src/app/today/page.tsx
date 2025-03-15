import type { Metadata } from 'next';
import TasksPage from '@/pages/TodayTasksPage';

export const metadata: Metadata = {
  title: 'Your Tasks for Todays',
};

export default function Home() {
  return <TasksPage />;
}
