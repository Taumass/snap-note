import type { Metadata } from 'next';
import TasksPage from '@/pages/TasksPage';

export const metadata: Metadata = {
  title: 'SnapNote | Tasks',
};

export default function Home() {
  return <TasksPage />;
}
