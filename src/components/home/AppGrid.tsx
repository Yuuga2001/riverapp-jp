"use client";

import type { App } from "@/types/app";
import { AppCard } from "./AppCard";
import { useTranslation } from "@/i18n/context";

interface AppGridProps {
  apps: App[];
  showComingSoon: boolean;
}

export function AppGrid({ apps, showComingSoon }: AppGridProps) {
  const t = useTranslation();

  return (
    <section className="max-w-[960px] mx-auto max-sm:px-5" style={{ padding: "0 32px 80px" }}>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-3">
        {apps.map((app, index) => (
          <AppCard key={app.slug} app={app} index={index} />
        ))}
        {showComingSoon && (
          <div
            className="flex items-center justify-center bg-bg cursor-default rounded-2xl min-h-[200px] opacity-0 animate-fade-up-card border border-solid border-border border-thin"
            style={{
              animationDelay: `${(apps.length + 1) * 0.05}s`,
            }}
          >
            <div className="font-mono text-xs text-text-tertiary tracking-[0.3px] text-center">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-text-tertiary mr-2 animate-pulse-dot" />
              {t("appGrid.developing")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
