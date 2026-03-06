"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  SparklesIcon,
  ArrowUpIcon,
  ImagePlusIcon,
  MoveIcon,
  SquareIcon,
  TypeIcon,
  UserCircleIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import {
  PromptInput,
  PromptInputProvider,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputBody,
  PromptInputHeader,
  usePromptInputAttachments,
  usePromptInputController,
} from "@/components/ai-elements/prompt-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

// ============================================================================
// Dreamina design tokens (extracted via agent-browser getComputedStyle)
// ============================================================================

const DT = {
  card: {
    bg: "rgba(32,33,39,0.72)",
    borderRadius: 24,
    backdrop: "blur(80px)",
  },
  layout: {
    padding: "14px 16px 16px",
    gap: 12, // between content row and toolbar
  },
  content: {
    gap: 12, // between references, textarea, submit
    height: 96,
  },
  upload: {
    bg: "rgba(204,221,255,0.08)",
    bgHover: "rgba(204,221,255,0.12)",
    border: "1px dotted rgba(204,221,255,0.06)",
    borderRadius: 2,
    iconColor: "rgba(224,245,255,0.35)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    itemWidth: 48,
    itemHeight: 64,
    containerWidth: 64,
    containerHeight: 80,
  },
  toolbar: {
    height: 36,
    gap: 12, // between left and right
    settingsGap: 4, // between toolbar items
    settingsPadding: "8px 0px",
    btnBorder: "1px solid rgba(204,221,255,0.06)",
    btnRadius: 8,
    btnHoverBg: "rgba(204,221,255,0.08)",
    transition: "0.1s linear",
  },
  select: {
    viewPadding: "0px 12px",
    viewRadius: 8,
    hoverBg: "rgba(204,221,255,0.08)",
    teal: "rgb(0,202,224)",
  },
  submit: {
    bg: "rgba(204,221,255,0.16)",
    color: "rgba(224,245,255,0.2)",
    enabledBg: "rgb(0,202,224)",
    enabledHover: "#00b1cc",
    size: 36,
  },
  counter: {
    color: "rgba(224,245,255,0.6)",
    fontSize: 12,
  },
  divider: {
    bg: "rgba(204,221,255,0.06)",
  },
} as const;

// ============================================================================
// Static data
// ============================================================================

const TOOLS = [
  { id: "agent", label: "AI 에이전트", icon: SparklesIcon },
  { id: "image", label: "AI 이미지", icon: ImagePlusIcon },
  { id: "video", label: "AI 동영상", icon: VideoIcon },
  { id: "avatar", label: "AI 아바타", icon: UserCircleIcon },
  { id: "motion", label: "모션 복제", icon: MoveIcon },
];

const AI_TYPE_OPTIONS = [
  { value: "agent", label: "AI 에이전트", icon: SparklesIcon },
  { value: "image", label: "AI 이미지", icon: ImagePlusIcon },
  { value: "video", label: "AI 동영상", icon: VideoIcon },
  { value: "avatar", label: "AI 아바타", icon: UserCircleIcon },
  { value: "motion", label: "모션 복제", icon: MoveIcon },
];

const MODEL_OPTIONS = [
  { value: "image5lite", label: "Image 5.0 Lite", desc: "최신 고품질 모델" },
  { value: "image46", label: "Image 4.6", desc: "안정적인 고품질" },
  { value: "image45", label: "이미지 4.5", desc: "빠른 생성 속도" },
  { value: "image41", label: "Image 4.1", desc: "균형 잡힌 성능" },
  { value: "image40", label: "Image 4.0", desc: "클래식 모델" },
  { value: "nanobanana", label: "Nano Banana", desc: "경량 모델" },
  { value: "image31", label: "Image 3.1", desc: "레거시" },
  { value: "image30", label: "Image 3.0", desc: "레거시" },
];

const ASPECT_RATIOS = [
  { value: "auto", label: "자동" },
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
];

const QUALITY_OPTIONS = [
  { value: "high2k", label: "높음 2K" },
  { value: "standard", label: "표준" },
];

// Select trigger shared styles — Dreamina: no border on container, inner view has 8px radius
const selectTriggerCls =
  "!h-9 gap-1 border-0 bg-transparent text-xs shadow-none focus-visible:ring-0 rounded-lg px-3 hover:bg-[rgba(204,221,255,0.08)] text-[rgb(0,202,224)] [&_svg]:text-[rgb(0,202,224)] transition-[background-color] duration-100";

// ============================================================================
// Tilted image stack — Dreamina style
// Default: stacked (pile), Hover on group: expanded (spread out)
// Each item hover: lifts up + scales
// ============================================================================

const REF_ITEM_W = 48;
const REF_ITEM_GAP = 4;
const REF_ROTATIONS = [8, -6, 5, -8, 4, -5, 7, -4, 6, -7];
const MAX_IMAGES = 10;

function TiltedImageStack({
  files,
  onRemove,
  onAddMore,
}: {
  files: { id: string; url?: string; filename?: string }[];
  onRemove: (id: string) => void;
  onAddMore: () => void;
}) {
  const [removingIds, setRemovingIds] = React.useState<Set<string>>(new Set());
  // Track live files (includes exiting items until animation completes)
  const [displayFiles, setDisplayFiles] = React.useState(files);

  // Sync display files when external files change (after removal completes)
  React.useEffect(() => {
    setDisplayFiles((prev) => {
      // Keep exiting items + merge new items
      const exitingItems = prev.filter((f) => removingIds.has(f.id) && !files.find((ff) => ff.id === f.id));
      const merged = [...files, ...exitingItems];
      return merged;
    });
  }, [files, removingIds]);

  const handleRemove = React.useCallback((id: string) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    // After exit animation (300ms), actually remove
    setTimeout(() => {
      onRemove(id);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  }, [onRemove]);

  if (displayFiles.length === 0) return null;

  // Visible (non-exiting) count for layout
  const visibleFiles = displayFiles.filter((f) => !removingIds.has(f.id));
  const isFull = visibleFiles.length >= MAX_IMAGES;
  const expandedWidth = (visibleFiles.length + (isFull ? 0 : 1)) * (REF_ITEM_W + REF_ITEM_GAP);

  // Compute index-in-group for each item (exiting items keep their position)
  let visibleIdx = 0;

  return (
    <div
      className="group/stack relative"
      style={{
        width: REF_ITEM_W + 16,
        height: DT.upload.containerHeight,
        transition: "width 0.35s cubic-bezier(0.15, 0.75, 0.3, 1)",
      }}
    >
      <style>{`
        .group\\/stack:hover {
          width: ${expandedWidth}px !important;
        }
      `}</style>

      {displayFiles.map((file, mapIdx) => {
        const isExiting = removingIds.has(file.id);
        const idx = isExiting ? -1 : visibleIdx++;
        const rotation = REF_ROTATIONS[mapIdx % REF_ROTATIONS.length];
        const xPos = idx >= 0 ? idx * (REF_ITEM_W + REF_ITEM_GAP) : 0;

        return (
          <div
            key={file.id}
            data-ref-id={file.id}
            className="absolute group/img"
            style={{
              width: REF_ITEM_W,
              height: DT.upload.itemHeight,
              top: 10,
              left: 8,
              transform: isExiting
                ? `translateX(${xPos}px) scale(0.2) rotate(${rotation}deg)`
                : `rotate(${rotation}deg)`,
              opacity: isExiting ? 0 : 1,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: isExiting ? 0 : displayFiles.length - idx,
              pointerEvents: isExiting ? "none" : "auto",
            } as React.CSSProperties}
          >
            {/* Expanded state transforms via CSS (only for non-exiting items) */}
            {!isExiting && (
              <style>{`
                .group\\/stack:hover > [data-ref-id="${file.id}"] {
                  transform: translateX(${xPos}px) rotate(${rotation}deg) !important;
                  opacity: 1 !important;
                }
                .group\\/stack:hover > [data-ref-id="${file.id}"]:hover {
                  transform: translateX(${xPos}px) translateY(-8px) scale(1.125) rotate(${rotation}deg) !important;
                }
                .group\\/stack:hover > [data-ref-id="${file.id}"]:active {
                  transform: translateX(${xPos}px) translateY(-8px) scale(0.98) rotate(${rotation}deg) !important;
                }
              `}</style>
            )}
            <div
              className="w-full h-full cursor-pointer"
            >
              {file.url ? (
                <img
                  src={file.url}
                  alt={file.filename || "Image"}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: DT.upload.borderRadius }}
                />
              ) : (
                <div
                  className="w-full h-full bg-zinc-700 flex items-center justify-center"
                  style={{ borderRadius: DT.upload.borderRadius }}
                >
                  <ImagePlusIcon className="w-4 h-4 text-zinc-500" />
                </div>
              )}
              {/* X button — visible on individual item hover */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(file.id);
                }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-800/90 border border-zinc-600 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10"
              >
                <XIcon className="w-3 h-3 text-zinc-300" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Add more (+) button — appears at end when expanded, hidden at max */}
      {visibleFiles.length < MAX_IMAGES && <div
        className="absolute opacity-0 group-hover/stack:opacity-100"
        style={{
          width: REF_ITEM_W,
          height: DT.upload.itemHeight,
          top: 10,
          left: 8,
          transform: `translateX(${visibleFiles.length * (REF_ITEM_W + REF_ITEM_GAP)}px)`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          type="button"
          onClick={onAddMore}
          className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-[rgba(204,221,255,0.12)]"
          style={{
            backgroundColor: DT.upload.bg,
            border: DT.upload.border,
            borderRadius: DT.upload.borderRadius,
            transform: "rotate(-8deg)",
            transition: DT.upload.transition,
          }}
        >
          <PlusIcon style={{ width: 16, height: 16, color: DT.upload.iconColor }} />
        </button>
      </div>}
    </div>
  );
}

// ============================================================================
// Inner content (must be inside PromptInput + PromptInputProvider)
// ============================================================================

function PromptBarInner({
  activeTool,
  setActiveTool,
  aiType,
  setAiType,
  model,
  setModel,
  aspectRatio,
  setAspectRatio,
  quality,
  setQuality,
}: {
  activeTool: string;
  setActiveTool: (v: string) => void;
  aiType: string;
  setAiType: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  aspectRatio: string;
  setAspectRatio: (v: string) => void;
  quality: string;
  setQuality: (v: string) => void;
}) {
  const controller = usePromptInputController();
  const attachments = usePromptInputAttachments();

  const hasText = controller.textInput.value.trim().length > 0;
  const qualityLabel = quality === "high2k" ? "높음(2K)" : "표준";
  const aspectLabel = ASPECT_RATIOS.find((r) => r.value === aspectRatio)?.label ?? "자동";

  const aiTypeOption = AI_TYPE_OPTIONS.find((o) => o.value === aiType);
  const AiTypeIcon = aiTypeOption?.icon ?? ImagePlusIcon;

  const imageCount = attachments.files.length;

  return (
    <>
      {/* Tool tab bar — above the card */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-zinc-500">만드는 데 이용할 도구</span>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "flex items-center gap-1.5 text-xs transition-colors py-0.5",
                  isActive
                    ? "font-bold text-white border-b-2 border-violet-500"
                    : "font-normal text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className="size-3.5" />
                {tool.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt card */}
      <div
        className="w-full overflow-hidden border border-transparent shadow-none"
        style={{
          backgroundColor: DT.card.bg,
          borderRadius: DT.card.borderRadius,
          backdropFilter: DT.card.backdrop,
          WebkitBackdropFilter: DT.card.backdrop,
        }}
      >
        <PromptInput
          accept="image/*"
          multiple
          globalDrop
          maxFiles={10}
          onSubmit={({ text, files }) => {
            console.log("submit", { text, files });
          }}
          className="rounded-[24px] border-0 bg-transparent p-0 shadow-none ring-0"
        >
          {/* Inner layout — flex-column, padding 14px 16px 16px, gap 12px */}
          <div className="flex w-full flex-col" style={{ padding: DT.layout.padding, gap: DT.layout.gap }}>
            {/* Row 1: Content — flex-row, gap 12px, height 96px */}
            <PromptInputBody>
              <div
                className="flex flex-row items-start w-full"
                style={{ gap: DT.content.gap, minHeight: DT.content.height }}
              >
                {/* Left: references area — upload + attached images */}
                <div
                  className="flex-shrink-0 relative"
                  style={{
                    width: DT.upload.containerWidth,
                    minHeight: DT.upload.containerHeight,
                  }}
                >
                  {/* Attached images as tilted cards */}
                  {attachments.files.length > 0 ? (
                    <TiltedImageStack
                      files={attachments.files.map((f) => ({
                        id: f.id,
                        url: f.type === "file" ? f.url : undefined,
                        filename: f.filename,
                      }))}
                      onRemove={(id) => attachments.remove(id)}
                      onAddMore={() => attachments.openFileDialog()}
                    />
                  ) : (
                    /* Upload "+" button — Dreamina: tilted card, hover lifts + scales */
                    <div
                      className="absolute cursor-pointer hover:-translate-y-2 hover:scale-[1.125] active:scale-[0.98]"
                      style={{
                        width: DT.upload.itemWidth,
                        height: DT.upload.itemHeight,
                        top: 10,
                        left: 8,
                        transition: DT.upload.transition,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => attachments.openFileDialog()}
                        className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-[rgba(204,221,255,0.12)]"
                        style={{
                          backgroundColor: DT.upload.bg,
                          border: DT.upload.border,
                          borderRadius: DT.upload.borderRadius,
                          transform: "rotate(-8deg)",
                          transition: DT.upload.transition,
                        }}
                        aria-label="이미지 업로드"
                      >
                        <PlusIcon style={{ width: 16, height: 16, color: DT.upload.iconColor }} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Center: Textarea — flex-1, 14px, lineHeight 24px, height 96px */}
                <PromptInputTextarea
                  placeholder="상상하고 있는 이미지를 설명하세요"
                  className="flex-1 text-[rgb(245,251,255)] placeholder:text-[rgb(0,202,224)] bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 focus-visible:border-0"
                  style={{
                    minHeight: DT.content.height,
                    padding: "0px 4px 0px 0px",
                    fontSize: 14,
                    lineHeight: "24px",
                  }}
                />
              </div>
            </PromptInputBody>

            {/* Row 2: Toolbar — height 36px, flex, justify-between */}
            <PromptInputFooter
              className="!px-0 !pb-0 !pt-0 mt-0 justify-between items-center"
              style={{ height: DT.toolbar.height, gap: DT.toolbar.gap }}
            >
              {/* Left: toolbar settings — padding 8px 0, gap 4px */}
              <PromptInputTools
                className="flex-wrap items-center"
                style={{ gap: DT.toolbar.settingsGap, padding: DT.toolbar.settingsPadding }}
              >
                {/* AI Type select — borderRadius 8px on view */}
                <Select value={aiType} onValueChange={setAiType}>
                  <SelectTrigger size="sm" className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    className="bg-zinc-900 border-zinc-700 text-zinc-300"
                  >
                    {AI_TYPE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          {opt.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                {/* Model select — no chevron arrow (original has none) */}
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger
                    size="sm"
                    className={cn(selectTriggerCls, "[&>svg.lucide-chevron-down]:hidden")}
                  >
                    <SparklesIcon className="h-4 w-4" />
                    <span className="text-xs">
                      {MODEL_OPTIONS.find((o) => o.value === model)?.label}
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    className="bg-zinc-900 border-zinc-700 text-zinc-300 min-w-[200px]"
                  >
                    {MODEL_OPTIONS.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                      >
                        <div className="flex flex-col">
                          <span>{opt.label}</span>
                          <span className="text-xs text-zinc-500">{opt.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Ratio / Quality button — border, rounded-lg (8px) */}
                <Popover>
                  <PopoverTrigger asChild>
                    <PromptInputButton
                      className="h-9 bg-transparent text-[12px] text-[rgb(245,251,255)] hover:bg-[rgba(204,221,255,0.08)] focus-visible:ring-0"
                      style={{
                        border: DT.toolbar.btnBorder,
                        borderRadius: DT.toolbar.btnRadius,
                        padding: "0px 14px 0px 12px",
                        transition: DT.toolbar.transition,
                      }}
                      size="sm"
                    >
                      <SquareIcon className="h-4 w-4" />
                      <span className="flex items-center">
                        {aspectLabel}
                        <span
                          className="mx-2 inline-block"
                          style={{ width: 1, height: 10, backgroundColor: DT.divider.bg }}
                        />
                        {qualityLabel}
                      </span>
                    </PromptInputButton>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 bg-zinc-800 border-zinc-700 text-zinc-200 p-4"
                    align="start"
                    side="bottom"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-zinc-300">비율</span>
                        <ToggleGroup
                          type="single"
                          value={aspectRatio}
                          onValueChange={(v) => v && setAspectRatio(v)}
                          className="flex flex-wrap gap-1"
                        >
                          {ASPECT_RATIOS.map((r) => (
                            <ToggleGroupItem
                              key={r.value}
                              value={r.value}
                              className="h-7 rounded-full px-2.5 text-xs border border-zinc-600 bg-zinc-700 text-zinc-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white data-[state=on]:border-violet-600 hover:bg-zinc-600"
                            >
                              {r.label}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-zinc-300">품질</span>
                        <ToggleGroup
                          type="single"
                          value={quality}
                          onValueChange={(v) => v && setQuality(v)}
                          className="flex gap-1"
                        >
                          {QUALITY_OPTIONS.map((q) => (
                            <ToggleGroupItem
                              key={q.value}
                              value={q.value}
                              className="h-7 rounded-full px-2.5 text-xs border border-zinc-600 bg-zinc-700 text-zinc-300 data-[state=on]:bg-violet-600 data-[state=on]:text-white data-[state=on]:border-violet-600 hover:bg-zinc-600"
                            >
                              {q.label}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* T format button — 36x36, icon-only */}
                <PromptInputButton
                  className="h-9 w-9 bg-transparent text-[rgb(245,251,255)] hover:bg-[rgba(204,221,255,0.08)] focus-visible:ring-0 p-0"
                  style={{
                    border: DT.toolbar.btnBorder,
                    borderRadius: DT.toolbar.btnRadius,
                    transition: DT.toolbar.transition,
                  }}
                  size="icon-sm"
                  tooltip="서식"
                >
                  <TypeIcon className="h-4 w-4" />
                </PromptInputButton>
              </PromptInputTools>

              {/* Right: counter + submit — gap 12px */}
              <div className="flex items-center" style={{ gap: DT.toolbar.gap }}>
                {/* Counter */}
                <div
                  className="flex items-center gap-1"
                  style={{ fontSize: DT.counter.fontSize, color: DT.counter.color }}
                >
                  <SparklesIcon style={{ width: 12, height: 12 }} />
                  <span>{imageCount}/{MAX_IMAGES}</span>
                </div>

                {/* Submit — 36x36, circle */}
                <PromptInputSubmit
                  disabled={!hasText && imageCount === 0}
                  className={cn(
                    "rounded-full border-0 shadow-none",
                    hasText || imageCount > 0
                      ? "text-white hover:bg-[#00b1cc]"
                      : "cursor-not-allowed"
                  )}
                  style={{
                    width: DT.submit.size,
                    height: DT.submit.size,
                    backgroundColor:
                      hasText || imageCount > 0 ? DT.submit.enabledBg : DT.submit.bg,
                    color: hasText || imageCount > 0 ? "#fff" : DT.submit.color,
                    transition: DT.toolbar.transition,
                  }}
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </PromptInputSubmit>
              </div>
            </PromptInputFooter>
          </div>
        </PromptInput>
      </div>
    </>
  );
}

// ============================================================================
// Public export
// ============================================================================

export function PromptBar() {
  const [activeTool, setActiveTool] = React.useState("image");
  const [aiType, setAiType] = React.useState("image");
  const [model, setModel] = React.useState("image5lite");
  const [aspectRatio, setAspectRatio] = React.useState("auto");
  const [quality, setQuality] = React.useState("high2k");

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-3">
      <PromptInputProvider>
        <PromptBarInner
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          aiType={aiType}
          setAiType={setAiType}
          model={model}
          setModel={setModel}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          quality={quality}
          setQuality={setQuality}
        />
      </PromptInputProvider>
    </div>
  );
}
