import { Footer } from "@/components/layout/Footer";
import { getAppForDocument } from "@/lib/apps";
import { notFound } from "next/navigation";

export default async function AppDocumentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ appName: string; docType: string }>;
}) {
  const { appName, docType } = await params;
  const result = getAppForDocument(decodeURIComponent(appName), docType);
  if (!result) {
    notFound();
  }

  const displayName = result.documents.appDisplayName;

  return (
    <>
      <style>{`#root-footer { display: none; }`}</style>
      {children}
      <Footer
        privacyHref={`/app-document/${displayName}/privacy-policy`}
        contactHref={`/app-document/${displayName}/contact`}
      />
    </>
  );
}
