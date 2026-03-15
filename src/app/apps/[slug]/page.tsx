import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApp, getAppSlugs } from "@/lib/apps";
import { getScreenshotPaths } from "@/lib/screenshots";
import { Breadcrumb } from "@/components/app-detail/Breadcrumb";
import { AppHeader } from "@/components/app-detail/AppHeader";
import { PromoSection } from "@/components/app-detail/PromoSection";
import { ScreenshotCarousel } from "@/components/app-detail/ScreenshotCarousel";
import { DescriptionSection } from "@/components/app-detail/DescriptionSection";
import { LinksSection } from "@/components/app-detail/LinksSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let app;
  try {
    app = getApp(slug);
  } catch {
    return {};
  }

  const title = `${app.name} — riverapp.jp`;
  const description = app.ogDescription ?? app.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`https://riverapp.jp/images/apps/${slug}/icon.png`],
      url: `https://riverapp.jp/apps/${slug}`,
      type: "website",
    },
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let app;
  try {
    app = getApp(slug);
  } catch {
    notFound();
  }

  const screenshots = getScreenshotPaths(slug);

  return (
    <>
      <Breadcrumb appName={app.name} />
      <AppHeader app={app} />
      <PromoSection text={app.promoText} />

      {screenshots.length > 0 && (
        <ScreenshotCarousel paths={screenshots} />
      )}

      <DescriptionSection slug={slug} />

      {app.links && app.links.length > 0 && (
        <LinksSection links={app.links} />
      )}
    </>
  );
}
