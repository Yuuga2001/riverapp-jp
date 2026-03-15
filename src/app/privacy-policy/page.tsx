import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー — riverapp.jp",
  description: "riverapp.jp のプライバシーポリシー",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "2026年3月15日";

const SECTIONS = [
  {
    title: "はじめに",
    body: "riverapp.jp（以下「当サイト」）は、個人開発アプリのポートフォリオサイトです。本ページでは、当サイトにおける個人情報の取り扱いについて説明します。なお、当サイトに掲載されている各アプリには、それぞれ個別のプライバシーポリシーが定められている場合があります。各アプリのプライバシーポリシーは、各アプリの詳細ページからご確認ください。",
  },
  {
    title: "収集する情報",
    body: "当サイトでは、サービス改善を目的として以下の情報を自動的に収集する場合があります。",
    bullets: [
      "アクセスログ（IPアドレス、ブラウザ情報、参照元URL、閲覧ページ等）",
      "Vercel Analytics によるサイト利用状況データ（匿名化済み）",
    ],
  },
  {
    title: "Cookie の使用",
    body: "当サイトでは、アクセス解析のために Cookie を使用する場合があります。Cookie はブラウザの設定により無効にすることができますが、一部の機能が正常に動作しなくなる可能性があります。",
  },
  {
    title: "個人情報の利用目的",
    body: "収集した情報は、以下の目的で利用します。",
    bullets: [
      "サイトの利用状況の分析・改善",
      "お問い合わせへの対応",
    ],
  },
  {
    title: "第三者への提供",
    body: "法令に基づく場合を除き、収集した情報を第三者に提供することはありません。",
  },
  {
    title: "プライバシーポリシーの変更",
    body: "本ポリシーは予告なく変更される場合があります。変更後のポリシーは、当ページに掲載した時点で効力を生じるものとします。",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        プライバシーポリシー
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-10">
        riverapp.jp
      </p>

      {SECTIONS.map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
            {section.title}
          </h2>
          <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
            {section.body}
          </p>
          {"bullets" in section && section.bullets && (
            <ul className="text-[14px] font-light text-text-secondary leading-[1.8] pl-5 mt-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="mb-1">
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Contact */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          お問い合わせ
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本ポリシーに関するご質問は、
          <Link
            href="/#about"
            className="text-text-secondary underline"
          >
            お問い合わせ窓口
          </Link>
          よりご連絡ください。
        </p>
      </div>

      <p className="font-mono text-[11px] text-text-tertiary tracking-[0.3px] mt-12">
        最終更新日: {LAST_UPDATED}
      </p>
    </section>
  );
}
