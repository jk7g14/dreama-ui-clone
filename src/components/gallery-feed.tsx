"use client";

import { Heart, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// ---------------------------------------------------------------------------
// Banner data
// ---------------------------------------------------------------------------

const banners = [
  {
    title: "AI Design Campaign",
    subtitle: "Visual Lab 01: Icon Bank",
    gradient: "from-violet-700 via-purple-800 to-indigo-900",
    picsumSeed: "banner1",
  },
  {
    title: "Dreamina Creative Partner Program 2.0",
    subtitle: "크리에이터와 함께 성장하는 파트너십",
    gradient: "from-blue-700 via-blue-800 to-cyan-900",
    picsumSeed: "banner2",
  },
  {
    title: "105th ADC Awards: AI Visual Design",
    subtitle: "$30K Call for Entries",
    gradient: "from-emerald-700 via-green-800 to-teal-900",
    picsumSeed: "banner3",
  },
];

// ---------------------------------------------------------------------------
// Masonry grid items — deterministic, no Math.random
// ---------------------------------------------------------------------------

const HEIGHTS = [220, 300, 260, 180, 340, 200, 280, 240, 320, 160, 380, 210, 250, 290, 170, 350, 230, 270, 190, 310, 400, 215, 265, 185, 335, 205, 245, 375, 195, 355];

type GridItem = {
  id: number;
  height: number;
  likes: number;
  views: number;
};

const gridItems: GridItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  height: HEIGHTS[i % HEIGHTS.length],
  likes: Math.floor((i * 397 + 50) % 2000) + 50,
  views: Math.floor((i * 1031 + 200) % 10000) + 200,
}));

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BannerCard({
  title,
  subtitle,
  gradient,
  picsumSeed,
}: {
  title: string;
  subtitle: string;
  gradient: string;
  picsumSeed: string;
}) {
  return (
    <div className="relative flex h-40 w-full flex-col justify-end rounded-xl overflow-hidden select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${picsumSeed}/800/200`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-70`} />
      <div className="relative z-10 p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-1">
          Featured
        </p>
        <h3 className="text-base font-bold leading-snug text-white">{title}</h3>
        <p className="mt-1 text-xs text-white/70">{subtitle}</p>
      </div>
    </div>
  );
}

function GalleryItem({ item }: { item: GridItem }) {
  return (
    <div
      className="group relative mb-3 w-full overflow-hidden rounded-lg cursor-pointer"
      style={{ height: item.height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/img${item.id}/400/${item.height}`}
        alt={`Gallery item ${item.id}`}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-200 group-hover:brightness-110"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-3 text-xs text-white/90">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3 fill-white/80" />
            {item.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {item.views.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function MasonryGrid({ items }: { items: GridItem[] }) {
  return (
    <div
      className="w-full"
      style={{
        columns: 6,
        columnGap: "12px",
      }}
    >
      {items.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function GalleryFeed() {
  return (
    <div className="w-full px-4 space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="popular">
        <TabsList variant="line" className="border-b border-zinc-800 w-full rounded-none justify-start h-auto pb-0">
          <TabsTrigger
            value="popular"
            className="pb-3 text-sm font-medium"
          >
            인기
          </TabsTrigger>
          <TabsTrigger
            value="shorts"
            className="pb-3 text-sm font-medium"
          >
            AI 짧은 동영상
          </TabsTrigger>
        </TabsList>

        {/* Popular tab content */}
        <TabsContent value="popular" className="mt-6 space-y-6">
          {/* Banner carousel */}
          <div className="relative px-10">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-3">
                {banners.map((banner) => (
                  <CarouselItem key={banner.title} className="pl-3 md:basis-1/2 lg:basis-1/3">
                    <BannerCard {...banner} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white" />
              <CarouselNext className="right-0 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white" />
            </Carousel>
          </div>

          {/* Masonry grid */}
          <MasonryGrid items={gridItems} />
        </TabsContent>

        {/* Shorts tab content */}
        <TabsContent value="shorts" className="mt-6">
          <MasonryGrid items={gridItems.slice(0, 12)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
