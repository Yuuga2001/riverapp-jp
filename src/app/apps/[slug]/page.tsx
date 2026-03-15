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
    alternates: {
      canonical: `/apps/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [`/images/apps/${slug}/icon.png`],
      url: `/apps/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`/images/apps/${slug}/icon.png`],
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

  const platformMap: Record<string, string> = {
    web: "Web",
    ios: "iOS",
    android: "Android",
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.ogDescription ?? app.shortDescription,
    applicationCategory:
      app.category === "game" ? "GameApplication" : "UtilitiesApplication",
    operatingSystem: app.platforms.map((p) => platformMap[p] ?? p).join(", "),
    author: { "@type": "Person", name: "riverapp.jp", url: "https://riverapp.jp" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    image: `https://riverapp.jp/images/apps/${slug}/icon.png`,
    url: `https://riverapp.jp/apps/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "トップ",
        item: "https://riverapp.jp",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "apps",
        item: "https://riverapp.jp/#apps",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: app.name,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb appName={app.name} />
      <AppHeader app={app} />
      <PromoSection text={app.promoText} />

      {screenshots.length > 0 && (
        <ScreenshotCarousel paths={screenshots} />
      )}

      <DescriptionSection slug={slug} />

      <LinksSection
        links={app.links}
        documentLinks={
          app.documents
            ? [
                ...(app.documents.about
                  ? [{ label: `${app.name} について`, href: `/app-document/${app.slug}/about` }]
                  : []),
                ...(app.documents["privacy-policy"]
                  ? [{ label: "プライバシーポリシー", href: `/app-document/${app.slug}/privacy-policy` }]
                  : []),
                ...(app.documents.contact
                  ? [{ label: "お問い合わせ", href: `/app-document/${app.slug}/contact` }]
                  : []),
              ]
            : undefined
        }
      />
    </>
  );
}
