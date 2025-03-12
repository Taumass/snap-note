"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavRecentProps {
  items: {
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
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a
              href="#"
              className="flex items-center justify-between w-full group">
              <div className="flex items-center gap-2">
                <span className="text-lg w-5 text-center">{item.emoji}</span>
                <span className="text-[#4D4861] group-hover:text-[#605770] transition-colors">
                  {item.title}
                </span>
              </div>
              <span className="text-xs font-medium bg-[#F7C4A5]/20 text-[#605770] px-2 py-0.5 rounded-full">
                {item.date}
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
