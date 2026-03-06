import { Sidebar } from "@/components/sidebar";
import { PromptBar } from "@/components/prompt-bar";
import { ToolCards } from "@/components/tool-cards";
import { GalleryFeed } from "@/components/gallery-feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="ml-[76px] flex-1 px-8 pt-12 pb-6 text-zinc-400">
        <div className="flex flex-col gap-8">
          <section className="flex justify-center">
            <PromptBar />
          </section>
          <section>
            <ToolCards />
          </section>
          <section>
            <GalleryFeed />
          </section>
        </div>
      </main>
    </div>
  );
}
