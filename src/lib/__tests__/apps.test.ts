import { describe, it, expect } from "vitest";
import {
  getAllApps,
  getApp,
  getAppSlugs,
  getAppByDisplayName,
  getAllAppDocumentParams,
  getAppForDocument,
} from "@/lib/apps";

describe("getAllApps", () => {
  it("全10件のアプリを返す", () => {
    const apps = getAllApps();
    expect(apps).toHaveLength(10);
    expect(Array.isArray(apps)).toBe(true);
  });
});

describe("getApp", () => {
  it("slug で正しいアプリを返す", () => {
    const app = getApp("hexlide");
    expect(app.slug).toBe("hexlide");
    expect(app.name).toBe("HEXLIDE");
    expect(app.category).toBe("game");
  });

  it("存在しない slug で例外を throw する", () => {
    expect(() => getApp("nonexistent")).toThrow("App not found: nonexistent");
  });
});

describe("getAppSlugs", () => {
  it("全10件の slug を返す", () => {
    const slugs = getAppSlugs();
    expect(slugs).toHaveLength(10);
    expect(slugs).toContain("hexlide");
    expect(slugs).toContain("widgetmemo");
  });
});

describe("getAppByDisplayName", () => {
  it("表示名で該当アプリを返す", () => {
    const app = getAppByDisplayName("HEXLIDE");
    expect(app).toBeDefined();
    expect(app!.slug).toBe("hexlide");
  });

  it("存在しない表示名で undefined を返す", () => {
    const app = getAppByDisplayName("存在しない");
    expect(app).toBeUndefined();
  });
});

describe("getAllAppDocumentParams", () => {
  it("ドキュメントパラメータ配列を返す", () => {
    const params = getAllAppDocumentParams();
    expect(params.length).toBeGreaterThan(0);
    expect(params[0]).toHaveProperty("appName");
    expect(params[0]).toHaveProperty("docType");
  });

  it("MemoNow の about/contact/privacy-policy を含む", () => {
    const params = getAllAppDocumentParams();
    const quickNoteParams = params.filter((p) => p.appName === "MemoNow");
    expect(quickNoteParams).toHaveLength(3);
    const docTypes = quickNoteParams.map((p) => p.docType);
    expect(docTypes).toContain("about");
    expect(docTypes).toContain("contact");
    expect(docTypes).toContain("privacy-policy");
  });
});

describe("getAppForDocument", () => {
  it("正しい app + document ペアを返す", () => {
    const result = getAppForDocument("MemoNow", "about");
    expect(result).toBeDefined();
    expect(result!.app.slug).toBe("widgetmemo");
    expect(result!.documents.about).toBeDefined();
  });

  it("無効な docType で undefined を返す", () => {
    const result = getAppForDocument("MemoNow", "invalid");
    expect(result).toBeUndefined();
  });

  it("無効な appName で undefined を返す", () => {
    const result = getAppForDocument("NonExistent", "about");
    expect(result).toBeUndefined();
  });
});
