"use client";

import Link from "next/link";
import type { App, TermsOfServiceDocument, AppDocuments } from "@/types/app";
import { useTranslation, useLocale, useLocalizedApp } from "@/i18n/context";

export function TermsOfServiceDocPage({
  app: rawApp,
  terms: jaTerms,
  documents,
}: {
  app: App;
  terms: TermsOfServiceDocument;
  documents: AppDocuments;
}) {
  const t = useTranslation();
  const { locale } = useLocale();
  const app = useLocalizedApp(rawApp);
  const terms = app.documents?.["terms-of-service"] ?? jaTerms;

  // Format lastUpdated based on locale
  const formattedDate = (() => {
    const [y, m, d] = terms.lastUpdated.split("-");
    try {
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(parseInt(y), parseInt(m) - 1, parseInt(d)));
    } catch {
      return `${y}/${parseInt(m)}/${parseInt(d)}`;
    }
  })();

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        {t("appDocument.termsOfService")}
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-10">
        {app.name}
      </p>

      {terms.sections.map((section) => {
        // Replace {appName} template variable
        const body = section.body.replace(/\{appName\}/g, app.name);

        // Special handling for contact section
        const isContactSection = section.title === "お問い合わせ" || section.title === "Contact";

        return (
          <div key={section.title} className="mb-8">
            <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
              {section.title}
            </h2>
            {isContactSection && documents.contact ? (
              <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
                {t("appDocument.termsContactBody")}
                <Link
                  href={`/app-document/${app.slug}/contact`}
                  className="text-text-secondary underline"
                >
                  {t("appDocument.termsContactLink")}
                </Link>
                {t("appDocument.termsContactBodyEnd")}
              </p>
            ) : (
              <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
                {body}
              </p>
            )}
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
        );
      })}

      {/* Date */}
      <p className="font-mono text-[11px] text-text-tertiary tracking-[0.3px] mt-12">
        {t("appDocument.lastUpdated", { date: formattedDate })}
      </p>
    </section>
  );
}
