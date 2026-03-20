"use client";

import type { App, ContactDocument } from "@/types/app";
import { useTranslation, useLocalizedApp } from "@/i18n/context";

export function ContactPage({
  app: rawApp,
  contact: jaContact,
}: {
  app: App;
  contact: ContactDocument;
}) {
  const t = useTranslation();
  const app = useLocalizedApp(rawApp);
  const contact = app.documents?.contact ?? jaContact;

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        {t("appDocument.contact")}
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-4">
        {app.name}
      </p>
      <p className="text-[14px] font-light text-text-secondary leading-[1.8] mb-10">
        {app.name}{" "}
        {t("appDocument.contactIntro")}
      </p>

      <ul>
        {contact.methods.map((method, i) => (
          <li key={method.label}>
            <a
              href={method.url}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-between py-[18px] no-underline text-text-primary ${
                i === 0
                  ? "border-t border-b border-border"
                  : "border-b border-border"
              } transition-colors duration-150 hover:text-text-secondary group border-thin`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-normal">{method.label}</span>
                <span className="text-[12px] font-light text-text-tertiary">
                  {method.description}
                </span>
              </div>
              <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
