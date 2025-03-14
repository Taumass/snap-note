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

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortedTasks } from '@/slices/taskSlice';
import { openDrawer } from '@/slices/addTaskDrawerSlice';
import { Task } from '@snap-note/types';

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(selectSortedTasks);

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  const navMain = useMemo(
    () => [
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
        id: 4,
        title: 'Inbox',
        url: '#',
        icon: Inbox,
        badge: '0',
      },
      {
        title: 'Create new task',
        icon: Plus,
        onClick: handleOpenDrawer,
        className:
          'bg-[#EDCB96] hover:bg-[#F7C4A5] text-[#4D4861] rounded-md px-4 py-2 mt-1 shadow-sm transition-colors w-full justify-center font-medium',
      },
    ],
    []
  );

  const navSecondary = useMemo(
    () => [
      {
        title: 'Help',
        url: '#',
        icon: MessageCircleQuestion,
      },
    ],
    []
  );

  const recentTasks = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.id,
        title: task.taskName,
        date: task.date.toISOString().split('T')[0],
        emoji: task.emoji,
      })),
    [tasks]
  );

  return (
    <Sidebar className={cn('border-r-0 bg-[#EDCB96]/5', className)} {...props}>
      <SidebarHeader>
        <TeamSwitcher
          user={{
            name: 'Thomas S.',
            email: 'thomas@example.com',
            avatar: undefined,
          }}
        />
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto ml-2">
          <NavRecent items={recentTasks} />
        </div>
        <NavSecondary items={navSecondary} className="mt-auto" />
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
