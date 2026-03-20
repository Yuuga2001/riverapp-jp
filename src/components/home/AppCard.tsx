"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { App } from "@/types/app";
import { Badge } from "@/components/shared/Badge";
import { Tag } from "@/components/shared/Tag";
import { StoreButton } from "@/components/shared/StoreButton";
import { useTranslation, useLocalizedApp } from "@/i18n/context";

interface AppCardProps {
  app: App;
  index: number;
}

export function AppCard({ app: rawApp, index }: AppCardProps) {
  const router = useRouter();
  const t = useTranslation();
  const app = useLocalizedApp(rawApp);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    router.push(`/apps/${app.slug}`);
  };

  return (
    <div
      className={`group bg-surface flex flex-col cursor-pointer transition-all duration-150 no-underline text-inherit rounded-2xl hover:bg-card-hover hover:border-border-hover opacity-0 animate-fade-up-card max-sm:p-6 border border-solid border-border border-thin ${
        app.comingSoon ? "relative overflow-hidden" : ""
      }`}
      style={{
        padding: "28px",
        animationDelay: `${(index + 1) * 0.05}s`,
      }}
      role="link"
      tabIndex={0}
      aria-label={t("appCard.viewDetail", { name: app.name })}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/apps/${app.slug}`);
        }
      }}
    >
      {app.comingSoon && (
        <div
          className="absolute font-mono text-[9px] font-medium tracking-[0.8px] uppercase z-[1]"
          style={{
            top: "14px",
            right: "-44px",
            background: "var(--color-text-tertiary)",
            color: "var(--color-bg)",
            padding: "5px 48px 5px 112px",
            transform: "rotate(45deg)",
          }}
        >
          Coming Soon
        </div>
      )}
      <Image
        src={`/images/apps/${app.slug}/icon.png`}
        alt={app.name}
        width={52}
        height={52}
        className="rounded-[14px] mb-4 shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      />
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[15px] font-medium text-text-primary tracking-[-0.2px]">
          {app.name}
        </span>
        <Badge category={app.category} />
      </div>
      <p className="text-[13px] text-text-secondary leading-[1.7] flex-1 min-h-0 line-clamp-4 max-sm:line-clamp-3">
        {app.shortDescription}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {app.tags.map((tag) => (
          <Tag key={tag} label={tag} compact />
        ))}
      </div>
      <div className="flex justify-between items-center mt-5 shrink-0">
        <div className="flex gap-1.5 flex-wrap">
          {app.storeLinksCard.map((link) => (
            <StoreButton key={link.label} link={link} />
          ))}
        </div>
        <span className="font-mono text-sm text-text-tertiary transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary">
          ↗
        </span>
      </div>
    </div>
  );
}
