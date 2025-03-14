'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    id: number;
    title: string;
    url?: string;
    icon: LucideIcon;
    isActive?: boolean;
    className?: string;
    onClick?: () => void; // Permet de gérer un clic personnalisé
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.id}>
          {item.onClick ? (
            <SidebarMenuButton
              onClick={item.onClick}
              isActive={item.isActive}
              className={item.className}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              asChild
              isActive={item.isActive}
              className={item.className}>
              <a
                href={item.url}
                className={cn('flex items-center gap-2', item.className)}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
