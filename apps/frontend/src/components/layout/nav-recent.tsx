'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TrashIcon } from '@heroicons/react/24/outline';

interface NavRecentProps {
  items: {
    id: number;
    title: string;
    url: string;
    emoji: string;
  }[];
  onDelete: (id: number) => void;
}

export function NavRecent({ items, onDelete }: NavRecentProps) {
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null);

  return (
    <SidebarMenu>
      <div className="px-4 py-2 text-sm font-medium text-[#605770]">
        Recent tasks
      </div>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center justify-between w-full">
                  <a href={item.url} className="flex items-center gap-2">
                    <span className="text-lg w-5 text-center">
                      {item.emoji}
                    </span>
                    <span className="text-[#4D4861] transition-colors hover:under">
                      {item.title}
                    </span>
                  </a>
                  {hoveredItem === item.id && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </SidebarMenu>
  );
}
