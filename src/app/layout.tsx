import type { Metadata } from "next";
import { DM_Mono, Noto_Sans_JP } from "next/font/google";
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
  title: "riverapp.jp — アプリ個人開発",
  description:
    "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。",
  keywords: ["個人開発", "アプリ", "ゲーム", "Web", "iOS", "Android", "ポートフォリオ"],
  authors: [{ name: "riverapp.jp" }],
  openGraph: {
    title: "riverapp.jp — アプリ個人開発",
    description:
      "個人開発アプリのポートフォリオサイト。ゲーム・ユーティリティなど、Web・iOS・Android向けアプリを公開しています。",
    url: "https://riverapp.jp",
    siteName: "riverapp.jp",
    locale: "ja_JP",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
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
        <Navbar />
        {children}
        <div id="root-footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
