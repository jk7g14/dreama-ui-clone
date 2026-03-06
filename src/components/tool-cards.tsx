"use client";

import { Layout, ImagePlus, Video, UserCircle, Move } from "lucide-react";

type ToolCard = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  disabled?: boolean;
};

const cards: ToolCard[] = [
  {
    title: "캔버스",
    subtitle: "무한 창작 공간",
    icon: <Layout className="h-5 w-5 text-white/90" />,
    gradient: "from-violet-600/80 via-purple-600/80 to-indigo-700/80",
  },
  {
    title: "AI 이미지",
    subtitle: "Seedream 4.1",
    icon: <ImagePlus className="h-5 w-5 text-white/90" />,
    gradient: "from-blue-500/80 via-blue-600/80 to-cyan-700/80",
  },
  {
    title: "AI 동영상",
    subtitle: "Seedance 1.5 Pro",
    icon: <Video className="h-5 w-5 text-white/90" />,
    gradient: "from-emerald-500/80 via-green-600/80 to-teal-700/80",
  },
  {
    title: "AI 아바타",
    subtitle: "OmniHuman",
    icon: <UserCircle className="h-5 w-5 text-white/90" />,
    gradient: "from-orange-500/80 via-amber-500/80 to-yellow-600/80",
  },
  {
    title: "모션",
    subtitle: "출시 예정",
    icon: <Move className="h-5 w-5 text-white/90" />,
    gradient: "from-zinc-600/80 via-zinc-700/80 to-zinc-800/80",
    disabled: true,
  },
];

export function ToolCards() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`
              flex-1 relative flex flex-row items-center gap-3 rounded-xl px-4
              bg-gradient-to-br ${card.gradient}
              transition-all duration-200
              ${
                card.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:brightness-110 hover:scale-[1.01]"
              }
            `}
            style={{ height: "76px", minWidth: 0 }}
          >
            {/* Left icon */}
            <div className="flex-shrink-0 flex items-center justify-center rounded-lg bg-white/10 p-1.5">
              {card.icon}
            </div>

            {/* Right text */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-white leading-tight">{card.title}</h3>
                <p className="text-xs text-white/70 truncate leading-tight mt-0.5">{card.subtitle}</p>
                <p className="text-[10px] text-white/50 mt-1 leading-tight">
                  {card.disabled ? "출시 예정" : "지금 사용해 보기"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
