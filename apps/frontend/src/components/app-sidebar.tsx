"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { NavRecent } from "@/components/nav-recent";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Thomas S.",
    email: "thomas@example.com",
    avatar: undefined, // Avatar will use initials by default
  },
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Today",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "0",
    },
    {
      title: "Create new task",
      url: "#",
      icon: Plus,
      className:
        "bg-[#EDCB96] hover:bg-[#F7C4A5] text-[#4D4861] rounded-md px-4 py-2 mt-1 shadow-sm transition-colors w-full justify-center font-medium",
    },
  ],
  navSecondary: [
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  recentTasks: [
    {
      title: "Finish client presentation",
      date: "2h",
      emoji: "📊",
    },
    {
      title: "Design team meeting",
      date: "1d",
      emoji: "👥",
    },
    {
      title: "Update documentation",
      date: "2d",
      emoji: "📝",
    },
    {
      title: "Review code PR-128",
      date: "3d",
      emoji: "💻",
    },
  ],
};

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className={cn("border-r-0", className)} {...props}>
      <SidebarHeader>
        <TeamSwitcher user={data.user} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavRecent items={data.recentTasks} />
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
