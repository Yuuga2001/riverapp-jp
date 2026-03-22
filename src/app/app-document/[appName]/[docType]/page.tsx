import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppDocumentParams, getAppForDocument } from "@/lib/apps";
import type {
  App,
  AboutDocument,
  ContactDocument,
  PrivacyPolicyDocument,
  TermsOfServiceDocument,
  AppDocuments,
} from "@/types/app";
import { AboutPage } from "./AboutPage";
import { ContactPage } from "./ContactPage";
import { PrivacyPolicyDocPage } from "./PrivacyPolicyDocPage";
import { TermsOfServiceDocPage } from "./TermsOfServiceDocPage";

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  return getAllAppDocumentParams();
}

/* ---------- Metadata ---------- */

const docTitles: Record<string, string> = {
  about: "",
  contact: "お問い合わせ",
  "privacy-policy": "プライバシーポリシー",
  "terms-of-service": "利用規約",
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
        <PrivacyPolicyDocPage
          app={app}
          privacy={documents["privacy-policy"]}
          documents={documents}
        />
      );
    case "terms-of-service":
      if (!documents["terms-of-service"]) notFound();
      return (
        <TermsOfServiceDocPage
          app={app}
          terms={documents["terms-of-service"]}
          documents={documents}
        />
      );
    default:
      notFound();
  }
}
