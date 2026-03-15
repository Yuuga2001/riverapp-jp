import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import { getScreenshotPaths } from "@/lib/screenshots";

vi.mock("fs");

const mockedFs = vi.mocked(fs);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getScreenshotPaths", () => {
  it("ディレクトリが存在しない場合は空配列を返す", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getScreenshotPaths("nonexistent")).toEqual([]);
  });

  it("screenshot ファイルをインデックス順にソートして返す", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["screenshot-3.png", "screenshot-1.png", "screenshot-2.png"] as unknown as fs.Dirent[]
    );

    const paths = getScreenshotPaths("hexlide");
    expect(paths).toEqual([
      "/images/apps/hexlide/screenshot-1.png",
      "/images/apps/hexlide/screenshot-2.png",
      "/images/apps/hexlide/screenshot-3.png",
    ]);
  });

  it("screenshot 以外のファイルを除外する", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(
      ["icon.png", "screenshot-1.png", "IMG_9466.jpeg", "screenshot-2.jpg"] as unknown as fs.Dirent[]
    );

    const paths = getScreenshotPaths("test");
    expect(paths).toEqual([
      "/images/apps/test/screenshot-1.png",
      "/images/apps/test/screenshot-2.jpg",
    ]);
  });
});
