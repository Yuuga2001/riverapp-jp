import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppDocumentParams, getAppForDocument } from "@/lib/apps";

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  return getAllAppDocumentParams();
}

/* ---------- Metadata ---------- */

const docTitles: Record<string, string> = {
  about: "",
  contact: "お問い合わせ",
  "privacy-policy": "プライバシーポリシー",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appName: string; docType: string }>;
}): Promise<Metadata> {
  const { appName, docType } = await params;
  const decodedAppName = decodeURIComponent(appName);
  const result = getAppForDocument(decodedAppName, docType);
  if (!result) return {};

  const displayName = result.document.appDisplayName;
  const docTitle = docTitles[docType];

  const title = docTitle
    ? `${docTitle} — ${displayName}`
    : `${displayName} — riverapp.jp`;

  const description = docTitle
    ? `${displayName} の${docTitle}`
    : `${displayName} — 「ちょっとメモ。」そんな時に、これだけでいい。`;

  return { title, description };
}

/* ---------- Page ---------- */

export default async function AppDocumentPage({
  params,
}: {
  params: Promise<{ appName: string; docType: string }>;
}) {
  const { appName, docType } = await params;
  const decodedAppName = decodeURIComponent(appName);
  const result = getAppForDocument(decodedAppName, docType);
  if (!result) {
    notFound();
  }

  const { app } = result;

  switch (docType) {
    case "about":
      return <AboutPage app={app} />;
    case "contact":
      return <ContactPage app={app} />;
    case "privacy-policy":
      return <PrivacyPolicyPage app={app} />;
    default:
      notFound();
  }
}

/* ============================================================
   About page
   ============================================================ */

function AboutPage({ app }: { app: { slug: string; name: string } }) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <Image
          src={`/images/apps/${app.slug}/icon.png`}
          alt={`${app.name} アイコン`}
          width={80}
          height={80}
          className="rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] max-sm:w-16 max-sm:h-16 max-sm:rounded-[14px]"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-[22px] font-medium text-text-primary max-sm:text-[19px]">
            {app.name}
          </h1>
          <span className="font-mono text-[11px] text-text-tertiary tracking-[0.3px]">
            by riverapp.jp
          </span>
        </div>
      </div>

      {/* Catchcopy */}
      <p className="text-[18px] font-normal text-text-primary leading-[1.8] mb-3 max-sm:text-[16px]">
        「ちょっとメモ。」そんな時に、これだけでいい。
      </p>
      <p className="text-[14px] font-light text-text-secondary leading-[1.9] mb-10">
        たった一枚の、最もシンプルでわかりやすいメモアプリ。
        <br />
        ホーム画面ウィジェットやロック画面ウィジェットに常時表示して、瞬時に確認。タップすれば瞬時に開いて、瞬時に書き換え。
        <br />
        買い物リスト、電話番号、合言葉——忘れたくない「ちょっとしたこと」を、いつでも目に留まる場所に。
      </p>

      {/* Features */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] lowercase mb-4">
        features
      </h2>
      <ul className="flex flex-col mb-10">
        {[
          {
            name: "一枚メモ",
            desc: "余計なものは何もない。画面全体がメモ帳。タップしてすぐ入力",
          },
          {
            name: "ウィジェット常時表示",
            desc: "メモ内容をホーム画面・ロック画面にいつでも表示。Small / Medium / Large / ロック画面対応",
          },
          {
            name: "フォントサイズ調整",
            desc: "10pt〜48ptの範囲でスライダー調整",
          },
          {
            name: "カラーカスタマイズ",
            desc: "背景色・文字色をカラーピッカーで自由に設定",
          },
          {
            name: "グラデーション背景",
            desc: "設定色に基づいた上部濃・下部淡の美しいグラデーション",
          },
          {
            name: "リアルタイム同期",
            desc: "書いた瞬間にウィジェットへ反映。アプリを閉じても即時更新",
          },
        ].map((feature, i, arr) => (
          <li
            key={feature.name}
            className={`flex items-baseline gap-3 py-3.5 max-sm:flex-col max-sm:gap-1 ${
              i === 0
                ? "border-t border-b border-border"
                : "border-b border-border"
            }`}
          >
            <span className="text-[14px] font-normal text-text-primary min-w-[140px] shrink-0 max-sm:min-w-0">
              {feature.name}
            </span>
            <span className="text-[13px] font-light text-text-secondary">
              {feature.desc}
            </span>
          </li>
        ))}
      </ul>

      {/* Info */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] mb-4">
        info
      </h2>
      <ul className="mb-10">
        {[
          { key: "対応OS", value: "iOS 17.0 以降" },
          { key: "価格", value: "無料" },
          { key: "カテゴリ", value: "仕事効率化" },
          { key: "開発", value: "riverapp.jp" },
        ].map((item, i) => (
          <li
            key={item.key}
            className={`flex items-baseline gap-3 py-2.5 text-[13px] max-sm:flex-col max-sm:gap-0.5 ${
              i === 0
                ? "border-t border-b border-border"
                : "border-b border-border"
            } border-thin`}
          >
            <span className="font-normal text-text-secondary min-w-[120px] shrink-0">
              {item.key}
            </span>
            <span className="font-light text-text-primary">{item.value}</span>
          </li>
        ))}
      </ul>

      {/* Links */}
      <h2 className="font-mono text-[12px] text-text-tertiary tracking-[0.5px] mb-4">
        links
      </h2>
      <ul>
        <li>
          <Link
            href="/app-document/QuickNote/privacy-policy"
            className="flex items-center justify-between py-3.5 no-underline text-text-primary text-[14px] font-normal border-t border-b border-border transition-colors duration-150 hover:text-text-secondary group border-thin"
          >
            <span>プライバシーポリシー</span>
            <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </li>
        <li>
          <a
            href="https://riverapp.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-3.5 no-underline text-text-primary text-[14px] font-normal border-b border-border transition-colors duration-150 hover:text-text-secondary group border-thin"
          >
            <span>riverapp.jp</span>
            <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}

/* ============================================================
   Contact page
   ============================================================ */

function ContactPage({ app }: { app: { name: string } }) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        お問い合わせ
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-4">
        {app.name}
      </p>
      <p className="text-[14px] font-light text-text-secondary leading-[1.8] mb-10">
        {app.name}{" "}
        に関するご質問、不具合の報告、ご要望などがございましたら、以下のいずれかの方法でお気軽にお問い合わせください。
      </p>

      <ul>
        <li>
          <a
            href="https://forms.gle/68uVrDj6ACmN9PNu8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-[18px] no-underline text-text-primary border-t border-b border-border transition-colors duration-150 hover:text-text-secondary group border-thin"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-normal">
                お問い合わせフォーム
              </span>
              <span className="text-[12px] font-light text-text-tertiary">
                Google フォームから送信
              </span>
            </div>
            <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </li>
        <li>
          <a
            href="mailto:riverapp.jp@gmail.com"
            className="flex items-center justify-between py-[18px] no-underline text-text-primary border-b border-border transition-colors duration-150 hover:text-text-secondary group border-thin"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-normal">
                メールで問い合わせ
              </span>
              <span className="text-[12px] font-light text-text-tertiary">
                riverapp.jp@gmail.com
              </span>
            </div>
            <span className="text-[13px] text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}

/* ============================================================
   Privacy Policy page
   ============================================================ */

function PrivacyPolicyPage({ app }: { app: { name: string } }) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-12 pb-16 max-sm:px-5 max-sm:pt-8 max-sm:pb-12 animate-fade-up">
      <h1 className="font-sans text-[22px] font-medium text-text-primary mb-2 max-sm:text-[19px]">
        プライバシーポリシー
      </h1>
      <p className="font-mono text-[12px] text-text-tertiary tracking-[0.3px] mb-10">
        {app.name}
      </p>

      {/* はじめに */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          はじめに
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本プライバシーポリシーは、{app.name}
          （以下「本アプリ」）における個人情報の取り扱いについて説明するものです。本アプリは、お客様のプライバシーを尊重し、個人情報の保護に努めます。
        </p>
      </div>

      {/* 収集する情報 */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          収集する情報
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本アプリは、個人情報を一切収集しません。
        </p>
        <ul className="text-[14px] font-light text-text-secondary leading-[1.8] pl-5 mt-2">
          <li className="mb-1">
            メモの内容はお使いの端末内にのみ保存され、外部サーバーへの送信は行いません
          </li>
          <li className="mb-1">
            フォントサイズ、背景色、文字色などの設定情報も端末内にのみ保存されます
          </li>
          <li className="mb-1">アカウント登録やログインは不要です</li>
        </ul>
      </div>

      {/* データの保存 */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          データの保存
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本アプリのすべてのデータは、端末の UserDefaults（App
          Groups）にローカル保存されます。データはインターネットを通じて送信されることはなく、開発者がアクセスすることもできません。アプリを削除すると、すべてのデータが端末から完全に削除されます。
        </p>
      </div>

      {/* 第三者への提供 */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          第三者への提供
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本アプリは、お客様のデータを第三者に提供、販売、共有することはありません。
        </p>
      </div>

      {/* 分析ツール・広告 */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          分析ツール・広告
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本アプリは、分析ツールや広告 SDK を一切使用していません。
        </p>
      </div>

      {/* お子様のプライバシー */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          お子様のプライバシー
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本アプリは個人情報を収集しないため、年齢を問わず安心してご利用いただけます。
        </p>
      </div>

      {/* プライバシーポリシーの変更 */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          プライバシーポリシーの変更
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本プライバシーポリシーは、必要に応じて更新されることがあります。変更があった場合は、本ページにて最新の内容を掲載します。
        </p>
      </div>

      {/* お問い合わせ */}
      <div className="mb-8">
        <h2 className="font-sans text-[15px] font-medium text-text-primary mb-2.5">
          お問い合わせ
        </h2>
        <p className="text-[14px] font-light text-text-secondary leading-[1.8]">
          本プライバシーポリシーに関するご質問やお問い合わせは、
          <Link
            href="/app-document/QuickNote/contact"
            className="text-text-secondary underline"
          >
            お問い合わせページ
          </Link>
          よりご連絡ください。
        </p>
      </div>

      {/* Date */}
      <p className="font-mono text-[11px] text-text-tertiary tracking-[0.3px] mt-12">
        最終更新日: 2025年3月15日
      </p>
    </section>
  );
}
