"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/context";

const LAST_UPDATED = "2026-03-15";

export default function PrivacyPolicyPage() {
  const t = useTranslation();

  // Get sections from translation
  const sections = (() => {
    try {
      // Access raw sections array from translations
      const raw = t("privacyPolicy.sections");
      if (raw === "privacyPolicy.sections") return [];
      return [];
    } catch {
      return [];
    }
  })();

  // Use individual section access pattern
  const sectionData = [
    {
      title: t("privacyPolicy.sections.0.title"),
      body: t("privacyPolicy.sections.0.body"),
    },
    {
      title: t("privacyPolicy.sections.1.title"),
      body: t("privacyPolicy.sections.1.body"),
      bullets: [
        t("privacyPolicy.sections.1.bullets.0"),
        t("privacyPolicy.sections.1.bullets.1"),
      ],
    },
    {
      title: t("privacyPolicy.sections.2.title"),
      body: t("privacyPolicy.sections.2.body"),
    },
    {
      title: t("privacyPolicy.sections.3.title"),
      body: t("privacyPolicy.sections.3.body"),
      bullets: [
        t("privacyPolicy.sections.3.bullets.0"),
        t("privacyPolicy.sections.3.bullets.1"),
      ],
    },
    {
      title: t("privacyPolicy.sections.4.title"),
      body: t("privacyPolicy.sections.4.body"),
    },
    {
      title: t("privacyPolicy.sections.5.title"),
      body: t("privacyPolicy.sections.5.body"),
    },
  ];

  // Format date
  const [y, m, d] = LAST_UPDATED.split("-");
  const formattedDate = `${y}/${parseInt(m)}/${parseInt(d)}`;

  // Filter out sections where the key wasn't found
  void sections;

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        {t("privacyPolicy.title")}
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-10">
        riverapp.jp
      </p>

      {sectionData.map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
            {section.title}
          </h2>
          <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
            {section.body}
          </p>
          {section.bullets && (
            <ul className="text-[14px] font-light text-text-secondary leading-[1.8] pl-5 mt-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="mb-1">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Contact */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          {t("privacyPolicy.contactTitle")}
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          {t("privacyPolicy.contactBody")}
          <Link
            href="/#about"
            className="text-text-secondary underline"
          >
            {t("privacyPolicy.contactLink")}
          </Link>
          {t("privacyPolicy.contactBodyEnd")}
        </p>
      </div>

      <p className="font-mono text-[11px] text-text-tertiary tracking-[0.3px] mt-12">
        {t("privacyPolicy.lastUpdated", { date: formattedDate })}
      </p>
    </section>
  );
}
