"use client";

import Image from "next/image";
import type { App } from "@/types/app";
import { Badge } from "@/components/shared/Badge";
import { Tag } from "@/components/shared/Tag";
import { StoreButton } from "@/components/shared/StoreButton";
import { useTranslation } from "@/i18n/context";
import { STORE_LABEL_MAP } from "@/i18n/config";

interface AppHeaderProps {
  app: App;
}

export function AppHeader({ app }: AppHeaderProps) {
  const t = useTranslation();

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-10 max-sm:px-5 max-sm:pt-8 max-sm:pb-8">
      <div className="flex items-start gap-7 max-sm:flex-col max-sm:items-start max-sm:gap-5">
        {/* Icon */}
        <Image
          src={`/images/apps/${app.slug}/icon.png`}
          alt={t("appDetail.iconAlt", { name: app.name })}
          width={96}
          height={96}
          className="w-24 h-24 rounded-[22px] shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-sm:w-[72px] max-sm:h-[72px] max-sm:rounded-[18px]"
        />

        {/* Info */}
        <div className="flex-1">
          {/* Meta: title + badge + coming soon */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-[28px] font-medium tracking-[-0.5px] text-text-primary leading-[1.2] max-sm:text-[22px]">
              {app.name}
            </h1>
            <Badge category={app.category} />
            {app.comingSoon && (
              <span
                className="font-mono text-[10px] font-medium text-text-tertiary px-2.5 py-[3px] rounded-xl tracking-[0.5px] uppercase border border-border border-thin"
              >
                {t("appDetail.comingSoon")}
              </span>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-sm text-text-secondary mb-3">{app.subtitle}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {app.detailTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {/* Store links grouped */}
          <div className="flex gap-5 flex-wrap">
            {app.storeGroupsDetail.map((group) => {
              const labelKey = STORE_LABEL_MAP[group.label];
              const translatedLabel = labelKey ? t(labelKey) : group.label;

              return (
                <div key={group.label} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-text-primary tracking-[0.3px] font-medium">
                    {translatedLabel}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {group.links.map((link) => (
                      <StoreButton
                        key={link.label}
                        link={link}
                        variant="detail"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
