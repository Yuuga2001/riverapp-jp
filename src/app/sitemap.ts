import type { MetadataRoute } from "next";
import { getAllApps, getAllAppDocumentParams } from "@/lib/apps";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://riverapp.jp";

  const home: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const appPages: MetadataRoute.Sitemap = getAllApps()
    .filter((app) => !app.comingSoon)
    .map((app) => ({
      url: `${baseUrl}/apps/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const docPages: MetadataRoute.Sitemap = getAllAppDocumentParams().map(
    ({ appName, docType }) => ({
      url: `${baseUrl}/app-document/${encodeURIComponent(appName)}/${docType}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

  const privacyPolicy: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  };

  return [home, privacyPolicy, ...appPages, ...docPages];
}
