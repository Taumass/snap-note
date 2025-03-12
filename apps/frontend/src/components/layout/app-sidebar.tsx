'use client';

import * as React from 'react';
import {
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavRecent } from '@/components/layout/nav-recent';
import { NavMain } from '@/components/layout/nav-main';
import { NavSecondary } from '@/components/layout/nav-secondary';
import { TeamSwitcher } from '@/components/layout/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { title } from 'process';

interface Task {
  id: number;
  taskName: string;
  date: string;
  emoji: string;
}

const data = {
  user: {
    name: 'Thomas S.',
    email: 'thomas@example.com',
    avatar: undefined, // Avatar will use initials by default
  },
  navMain: [
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Home',
      url: '#',
      icon: Home,
    },
    {
      title: 'Today',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      badge: '0',
    },
    {
      title: 'Create new task',
      url: '#',
      icon: Plus,
      className:
        'bg-[#EDCB96] hover:bg-[#F7C4A5] text-[#4D4861] rounded-md px-4 py-2 mt-1 shadow-sm transition-colors w-full justify-center font-medium',
    },
  ],
  navSecondary: [
    {
      title: 'Help',
      url: '#',
      icon: MessageCircleQuestion,
    },
  ],
  recentTasks: [] as { title: string; date: string; emoji: string }[],
};

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const tasks: Task[] = useSelector((state: RootState) =>
    [...state.tasks.tasks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );
  const recentTasks = tasks.map((task) => {
    return {
      title: task.taskName,
      date: task.date,
      emoji: task.emoji,
    };
  });

  data.recentTasks = recentTasks;

  return (
    <Sidebar className={cn('border-r-0 bg-[#EDCB96]/5', className)} {...props}>
      <SidebarHeader>
        <TeamSwitcher user={data.user} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <NavRecent items={data.recentTasks} />
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <div className="px-4 py-3 text-xs text-[#605770] border-t border-[#F7C4A5]/20">
          <p className="text-center">
            Made with ❤️ by Thomas
            <br />
            <span className="opacity-75">v1.0.0</span>
          </p>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
