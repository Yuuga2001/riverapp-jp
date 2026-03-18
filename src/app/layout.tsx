import type { Metadata } from "next";
import { DM_Mono, Noto_Sans_JP } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riverapp.jp"),
  title: "riverapp.jp — アプリ個人開発",
  description:
    "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。アイデアをカタチにする、10個以上のオリジナルアプリを紹介。",
  keywords: ["個人開発", "アプリ", "ゲーム", "Web", "iOS", "Android", "ポートフォリオ"],
  authors: [{ name: "riverapp.jp" }],
  openGraph: {
    title: "riverapp.jp — アプリ個人開発",
    description:
      "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。アイデアをカタチにする、10個以上のオリジナルアプリを紹介。",
    url: "https://riverapp.jp",
    siteName: "riverapp.jp",
    locale: "ja_JP",
    type: "website",
    images: ["/apple-touch-icon.png"],
  },
  twitter: {
    card: "summary",
    title: "riverapp.jp — アプリ個人開発",
    description:
      "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。",
    images: ["/apple-touch-icon.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${dmMono.variable} ${notoSansJP.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "riverapp.jp",
              url: "https://riverapp.jp",
              description:
                "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。",
              inLanguage: "ja",
            }),
          }}
        />
        <Navbar />
        {children}
        <div id="root-footer">
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
