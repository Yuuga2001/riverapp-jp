import fs from "fs";
import path from "path";

/**
 * Scans public/images/apps/{slug}/ for screenshot files and returns sorted paths.
 * Server-side only (uses fs module).
 */
export function getScreenshotPaths(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "apps", slug);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  const screenshotPattern = /^screenshot-(\d+)\.(png|jpg)$/;

  const screenshots = files
    .map((file) => {
      const match = file.match(screenshotPattern);
      if (!match) return null;
      return {
        index: parseInt(match[1], 10),
        path: `/images/apps/${slug}/${file}`,
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null)
    .sort((a, b) => a.index - b.index)
    .map((s) => s.path);

  return screenshots;
}
