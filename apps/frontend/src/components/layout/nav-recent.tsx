'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavRecentProps {
  items: {
    id: number;
    title: string;
    date: string;
    emoji: string;
  }[];
}

export function NavRecent({ items }: NavRecentProps) {
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
            transition={{ duration: 0.2 }}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="#"
                  className="flex items-center justify-between w-full group">
                  <div className="flex items-center gap-2">
                    <span className="text-lg w-5 text-center">
                      {item.emoji}
                    </span>
                    <span className="text-[#4D4861] group-hover:text-[#605770] transition-colors">
                      {item.title}
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </SidebarMenu>
  );
}
