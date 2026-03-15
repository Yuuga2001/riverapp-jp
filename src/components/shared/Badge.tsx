import type { AppCategory } from "@/types/app";

const BADGE_STYLES: Record<AppCategory, string> = {
  game: "bg-badge-game-bg text-badge-game-text",
  app: "bg-badge-app-bg text-badge-app-text",
};

export function Badge({ category }: { category: AppCategory }) {
  return (
    <span className={`font-mono text-[10px] px-[7px] py-[2px] rounded tracking-[0.3px] shrink-0 ${BADGE_STYLES[category]}`}>
      {category}
    </span>
  );
}
