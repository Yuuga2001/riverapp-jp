import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppDocumentParams, getAppForDocument } from "@/lib/apps";
import type {
  App,
  AboutDocument,
  ContactDocument,
  PrivacyPolicyDocument,
  AppDocuments,
} from "@/types/app";

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  return getAllAppDocumentParams();
}

/* ---------- Metadata ---------- */

const docTitles: Record<string, string> = {
  about: "",
  contact: "お問い合わせ",
  "privacy-policy": "プライバシーポリシー",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appName: string; docType: string }>;
}): Promise<Metadata> {
  const { appName, docType } = await params;
  const decodedAppName = decodeURIComponent(appName);
  const result = getAppForDocument(decodedAppName, docType);
  if (!result) return {};

  const { app, documents } = result;
  const displayName = documents.appDisplayName;
  const docTitle = docTitles[docType];

  const title = docTitle
    ? `${docTitle} — ${displayName}`
    : `${displayName} — riverapp.jp`;

  const description = docTitle
    ? `${displayName} の${docTitle}`
    : app.ogDescription ?? app.shortDescription;

  const ogImage = `/images/apps/${app.slug}/icon.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/app-document/${appName}/${docType}`,
    },
    openGraph: {
      title,
      description,
      url: `/app-document/${appName}/${docType}`,
      siteName: "riverapp.jp",
      locale: "ja_JP",
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ---------- Page ---------- */

export default async function AppDocumentPage({
  params,
}: {
  params: Promise<{ appName: string; docType: string }>;
}) {
  const { appName, docType } = await params;
  const decodedAppName = decodeURIComponent(appName);
  const result = getAppForDocument(decodedAppName, docType);
  if (!result) {
    notFound();
  }

  const { app, documents } = result;

  switch (docType) {
    case "about":
      if (!documents.about) notFound();
      return <AboutPage app={app} about={documents.about} documents={documents} />;
    case "contact":
      if (!documents.contact) notFound();
      return <ContactPage app={app} contact={documents.contact} />;
    case "privacy-policy":
      if (!documents["privacy-policy"]) notFound();
      return (
        <PrivacyPolicyPage
          app={app}
          privacy={documents["privacy-policy"]}
          documents={documents}
        />
      );
    default:
      notFound();
  }
}

/* ============================================================
   About page
   ============================================================ */

function AboutPage({
  app,
  about,
  documents,
}: {
  app: App;
  about: AboutDocument;
  documents: AppDocuments;
}) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <Image
          src={`/images/apps/${app.slug}/icon.png`}
          alt={`${app.name} アイコン`}
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

/* ============================================================
   Contact page
   ============================================================ */

function ContactPage({
  app,
  contact,
}: {
  app: App;
  contact: ContactDocument;
}) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        お問い合わせ
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-4">
        {app.name}
      </p>
      <p className="text-[14px] font-light text-text-secondary leading-[1.8] mb-10">
        {app.name}{" "}
        に関するご質問、不具合の報告、ご要望などがございましたら、以下のいずれかの方法でお気軽にお問い合わせください。
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

/* ============================================================
   Privacy Policy page
   ============================================================ */

function PrivacyPolicyPage({
  app,
  privacy,
  documents,
}: {
  app: App;
  privacy: PrivacyPolicyDocument;
  documents: AppDocuments;
}) {
  const displayName = documents.appDisplayName;

  // Format lastUpdated: "2026-03-15" → "2026年3月15日"
  const [y, m, d] = privacy.lastUpdated.split("-");
  const formattedDate = `${y}年${parseInt(m)}月${parseInt(d)}日`;

  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        プライバシーポリシー
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-10">
        {app.name}
      </p>

      {privacy.sections.map((section) => {
        // Replace {appName} template variable
        const body = section.body.replace(/\{appName\}/g, app.name);

        // Special handling for last section (お問い合わせ) — add link to contact page
        const isContactSection = section.title === "お問い合わせ";

        return (
          <div key={section.title} className="mb-8">
            <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
              {section.title}
            </h2>
            {isContactSection && documents.contact ? (
              <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
                本プライバシーポリシーに関するご質問やお問い合わせは、
                <Link
                  href={`/app-document/${displayName}/contact`}
                  className="text-text-secondary underline"
                >
                  お問い合わせページ
                </Link>
                よりご連絡ください。
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
        最終更新日: {formattedDate}
      </p>
    </section>
  );
}
