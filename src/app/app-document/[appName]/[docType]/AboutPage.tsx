"use client";

import Image from "next/image";
import Link from "next/link";
import type { App, AboutDocument, AppDocuments } from "@/types/app";
import { useTranslation, useLocalizedApp } from "@/i18n/context";

export function AboutPage({
  app: rawApp,
  about: jaAbout,
  documents,
}: {
  app: App;
  about: AboutDocument;
  documents: AppDocuments;
}) {
  const t = useTranslation();
  const app = useLocalizedApp(rawApp);
  const about = app.documents?.about ?? jaAbout;
  void documents;

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <Image
          src={`/images/apps/${app.slug}/icon.png`}
          alt={t("appDetail.iconAlt", { name: app.name })}
          width={80}
          height={80}
          className="rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] max-sm:w-16 max-sm:h-16 max-sm:rounded-[14px]"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-[22px] font-medium text-text-primary max-sm:text-[19px]">
            {app.name}
          </h1>
          <span className="font-mono text-[11px] text-text-tertiary tracking-[0.3px]">
            by riverapp.jp
          </span>
        </div>
      </div>

      {/* Catchcopy */}
      <p className="text-[18px] font-normal text-text-primary leading-[1.8] mb-3 max-sm:text-[16px]">
        {about.catchcopy}
      </p>
      <p className="text-[14px] font-light text-text-secondary leading-[1.9] mb-10 whitespace-pre-line">
        {about.subcopy}
      </p>

      {/* Features */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] lowercase mb-4">
        features
      </h2>
      <ul className="flex flex-col mb-10">
        {about.features.map((feature, i) => (
          <li
            key={feature.name}
            className={`flex items-baseline gap-3 py-3.5 max-sm:flex-col max-sm:gap-1 ${
              i === 0
                ? "border-t border-b border-border"
                : "border-b border-border"
            }`}
          >
            <span className="text-[14px] font-normal text-text-primary min-w-[140px] shrink-0 max-sm:min-w-0">
              {feature.name}
            </span>
            <span className="text-[13px] font-light text-text-secondary">
              {feature.desc}
            </span>
          </li>
        ))}
      </ul>

      {/* Info */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] mb-4">
        info
      </h2>
      <ul className="mb-10">
        {about.info.map((item, i) => (
          <li
            key={item.key}
            className={`flex items-baseline gap-3 py-2.5 text-[13px] max-sm:flex-col max-sm:gap-0.5 ${
              i === 0
                ? "border-t border-b border-border"
                : "border-b border-border"
            } border-thin`}
          >
            <span className="font-normal text-text-secondary min-w-[120px] shrink-0">
              {item.key}
            </span>
            <span className="font-light text-text-primary">{item.value}</span>
          </li>
        ))}
      </ul>

      {/* Links */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] mb-4">
        links
      </h2>
      <ul>
        {about.links.map((link, i) => {
          const borderClass =
            i === 0
              ? "border-t border-b border-border"
              : "border-b border-border";

          if (link.internal) {
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between py-3.5 no-underline text-text-primary text-[14px] font-normal ${borderClass} transition-colors duration-150 hover:text-text-secondary group border-thin`}
                >
                  <span>{link.label}</span>
                  <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between py-3.5 no-underline text-text-primary text-[14px] font-normal ${borderClass} transition-colors duration-150 hover:text-text-secondary group border-thin`}
              >
                <span>{link.label}</span>
                <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
