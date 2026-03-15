import { apps } from "@/data/apps";
import type { App, AppDocument } from "@/types/app";

export function getAllApps(): App[] {
  return apps;
}

export function getApp(slug: string): App {
  const app = apps.find((a) => a.slug === slug);
  if (!app) {
    throw new Error(`App not found: ${slug}`);
  }
  return app;
}

export function getAppSlugs(): string[] {
  return apps.map((a) => a.slug);
}

export function getAppByDisplayName(displayName: string): App | undefined {
  return apps.find((a) => a.name === displayName);
}

export function getAllAppDocumentParams(): {
  appName: string;
  docType: string;
}[] {
  const params: { appName: string; docType: string }[] = [];
  for (const app of apps) {
    if (app.documents) {
      for (const doc of app.documents) {
        params.push({
          appName: doc.appDisplayName,
          docType: doc.type,
        });
      }
    }
  }
  return params;
}

export function getAppForDocument(
  appName: string,
  docType: string
): { app: App; document: AppDocument } | undefined {
  for (const app of apps) {
    if (app.documents) {
      const doc = app.documents.find(
        (d) => d.appDisplayName === appName && d.type === docType
      );
      if (doc) {
        return { app, document: doc };
      }
    }
  }
  return undefined;
}
