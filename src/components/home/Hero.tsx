"use client";

import { AppCountAnimation } from "./AppCountAnimation";
import { useTranslation } from "@/i18n/context";

interface HeroProps {
  appCount: number;
}

export function Hero({ appCount }: HeroProps) {
  const t = useTranslation();

  return (
    <section
      className="max-w-[960px] mx-auto grid grid-cols-2 gap-12 items-end opacity-0 animate-fade-up max-sm:grid-cols-1 max-sm:gap-8 max-sm:px-5 max-sm:pt-12 max-sm:pb-10"
      style={{ animationDelay: "0.05s", padding: "80px 32px 64px" }}
    >
      <div>
        <p className="font-mono text-[11px] font-normal text-text-tertiary tracking-[1.5px] uppercase mb-5">
          {t("hero.label")}
        </p>
        <h1 className="text-[36px] font-normal leading-[1.35] tracking-[-0.8px] text-text-primary mb-5 max-sm:text-[26px]">
          {t("hero.heading1")}
          <br />
          {t("hero.heading2")}
          <br />
          <em className="not-italic text-text-tertiary">{t("hero.heading3")}</em>
        </h1>
        <p className="text-sm text-text-secondary leading-[1.8] max-w-[360px]">
          {t("hero.description")}
        </p>
      </div>
      <div className="flex flex-col items-end gap-3 pb-1 max-sm:flex-row max-sm:items-start max-sm:gap-6">
        <div className="text-right">
          <div className="font-mono text-[40px] font-light text-text-primary leading-none tracking-[-2px] max-sm:text-[28px]">
            <AppCountAnimation target={appCount} />
          </div>
          <div className="font-mono text-[11px] text-text-tertiary tracking-[0.5px] mt-1">
            apps
          </div>
        </div>
        <div
          className="bg-border max-sm:h-[0.5px] max-sm:w-6"
          style={{ width: "0.5px", height: "24px" }}
        />
        <div className="text-right">
          <div className="font-mono text-[40px] font-light text-text-primary leading-none tracking-[-2px] max-sm:text-[28px]">
            &infin;
          </div>
          <div className="font-mono text-[11px] text-text-tertiary tracking-[0.5px] mt-1">
            ideas
          </div>
        </div>
      </div>
    </section>
  );
}
