"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n/context";

export function AboutSection() {
  const t = useTranslation();

  const CONTACT_LINKS = [
    {
      label: t("about.contactForm"),
      description: t("about.contactFormDesc"),
      href: "https://forms.gle/ViY1GUM7m2dvTNh58",
    },
    {
      label: t("about.email"),
      description: "riverapp.jp@gmail.com",
      href: "mailto:riverapp.jp@gmail.com",
    },
    {
      label: "X (Twitter)",
      description: t("about.twitterDesc"),
      href: "https://x.com/riverappjp?s=21&t=rxmNAbxxmw8o6ALQKsDg0g",
    },
  ];

  return (
    <section
      className="max-w-[960px] mx-auto grid grid-cols-[1fr_2fr] gap-12 items-start opacity-0 animate-fade-up max-sm:grid-cols-1 max-sm:gap-6 max-sm:px-5 max-sm:py-10"
      style={{
        borderTopWidth: "0.5px",
        borderTopStyle: "solid",
        borderTopColor: "var(--color-border)",
        padding: "64px 32px",
        animationDelay: "0.2s",
      }}
      id="about"
    >
      {/* Left column — Profile */}
      <div className="flex flex-col gap-3 max-sm:flex-row max-sm:items-center max-sm:gap-4">
        <Image
          src="/apple-touch-icon.png"
          alt={t("about.profileAlt")}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-medium text-text-primary">
            {t("about.name")}
          </span>
          <div className="flex flex-col gap-0.5 max-sm:flex-row max-sm:gap-2">
            <span className="font-mono text-[11px] text-text-tertiary tracking-[0.3px]">
              {t("about.role1")}
            </span>
            <span className="font-mono text-[11px] text-text-tertiary tracking-[0.3px]">
              {t("about.role2")}
            </span>
            <span className="font-mono text-[11px] text-text-tertiary tracking-[0.3px]">
              {t("about.role3")}
            </span>
          </div>
        </div>
      </div>

      {/* Right column — Bio + Contact */}
      <div>
        <div className="text-sm text-text-secondary leading-[1.9]">
          <p>{t("about.bio1")}</p>
          <p className="mt-4">{t("about.bio2")}</p>
          <p className="mt-4">{t("about.bio3")}</p>
        </div>

        {/* Contact links */}
        <div className="mt-10">
          <h3 className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase mb-4 font-normal">
            contact
          </h3>
          <ul className="list-none">
            {CONTACT_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex justify-between items-center py-[14px] no-underline transition-all duration-150 border-b border-border border-b-thin ${
                    i === 0 ? "border-t border-t-thin" : ""
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-normal text-text-secondary transition-colors duration-150 group-hover:text-text-primary">
                      {link.label}
                    </span>
                    <span className="text-[12px] font-light text-text-tertiary">
                      {link.description}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-text-tertiary transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
