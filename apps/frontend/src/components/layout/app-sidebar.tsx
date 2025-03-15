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
import { showDialog } from '@/slices/comfirmDialogSlice';
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

  const handleDelete = (taskId: number) => {
    dispatch(
      showDialog({
        title: 'Delete Note',
        description:
          'Are you sure you want to delete this note? This action cannot be undone.',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        confirmActionType: 'CUSTOM_DELETE_TASK',
        confirmActionPayload: { id: taskId },
      })
    );
  };

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
        url: '/',
        icon: Home,
      },
      {
        title: 'Today',
        url: '/today',
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
        url: '#',
        onClick: handleOpenDrawer,
        className:
          'bg-[#EDCB96] hover:bg-[#F7C4A5] text-[#4D4861] rounded-md px-4 py-2 mt-1 shadow-sm transition-colors w-full justify-center font-medium cursor-pointer',
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
        url: `task/${task.id}`,
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
          <NavRecent items={recentTasks} onDelete={handleDelete} />
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
