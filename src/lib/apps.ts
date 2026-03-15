import fs from "fs";
import path from "path";
import type { App, AppDocuments } from "@/types/app";

const appsDir = path.join(process.cwd(), "src/data/apps");

let _cache: App[] | null = null;

function loadApps(): App[] {
  if (_cache) return _cache;

  const files = fs
    .readdirSync(appsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  _cache = files.map((file) => {
    const raw = fs.readFileSync(path.join(appsDir, file), "utf-8");
    return JSON.parse(raw) as App;
  });

  return _cache;
}

export function getAllApps(): App[] {
  return loadApps();
}

export function getApp(slug: string): App {
  const app = loadApps().find((a) => a.slug === slug);
  if (!app) {
    throw new Error(`App not found: ${slug}`);
  }
  return app;
}

export function getAppSlugs(): string[] {
  return loadApps().map((a) => a.slug);
}

export function getAppByDisplayName(displayName: string): App | undefined {
  return loadApps().find((a) => a.name === displayName);
}

export function getAllAppDocumentParams(): {
  appName: string;
  docType: string;
}[] {
  const params: { appName: string; docType: string }[] = [];
  for (const app of loadApps()) {
    if (app.documents) {
      const docs = app.documents;
      const docTypes = ["about", "contact", "privacy-policy"] as const;
      for (const dt of docTypes) {
        if (docs[dt]) {
          params.push({
            appName: docs.appDisplayName,
            docType: dt,
          });
        }
      }
    }
  }
  return params;
}

export function getAppForDocument(
  appName: string,
  docType: string
): { app: App; documents: AppDocuments } | undefined {
  for (const app of loadApps()) {
    if (app.documents && app.documents.appDisplayName === appName) {
      const dt = docType as keyof Omit<AppDocuments, "appDisplayName">;
      if (app.documents[dt]) {
        return { app, documents: app.documents };
      }
    }
  }
  return undefined;
}
