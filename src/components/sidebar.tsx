"use client";

import {
  Sparkles,
  Home,
  PenTool,
  FolderOpen,
  Layout,
  Coins,
  Bell,
  Code,
  Settings,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

function SidebarIcon({
  icon,
  label,
  active,
}: NavItem) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            active
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          }`}
        >
          {active && (
            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-violet-500" />
          )}
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[76px] flex-col items-center bg-zinc-900 py-3">
      {/* Logo */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
        <Sparkles className="h-5 w-5 text-white" />
      </div>

      {/* Top nav */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        <SidebarIcon icon={<Home className="h-5 w-5" />} label="살펴보기" active />
        <SidebarIcon icon={<PenTool className="h-5 w-5" />} label="만들기" />
        <SidebarIcon icon={<FolderOpen className="h-5 w-5" />} label="애셋" />
        <SidebarIcon icon={<Layout className="h-5 w-5" />} label="캔버스" />
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-1">
        {/* Credits */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100">
              <Coins className="h-5 w-5" />
              <span className="text-[9px] leading-tight">0 업그레이드</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            크레딧
          </TooltipContent>
        </Tooltip>

        <SidebarIcon icon={<Bell className="h-5 w-5" />} label="알림" />
        <SidebarIcon icon={<Code className="h-5 w-5" />} label="API" />
        <SidebarIcon icon={<Settings className="h-5 w-5" />} label="설정" />

        {/* Profile avatar */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-white">
              <User className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            프로필
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
