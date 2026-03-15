# riverapp.jp ポートフォリオサイト

## サイト概要
- Next.js + TypeScript + React + Tailwind CSS
- 個人開発アプリのカタログ/ポートフォリオ
- ホスト: Vercel (riverapp.jp)
- リポジトリ: GitHub `Yuuga2001/riverapp-jp`、ブランチ `main`

## ディレクトリ構成
```
riverapp-jp/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # ルートレイアウト (nav, footer)
│   │   ├── page.tsx                            # トップページ (/)
│   │   ├── globals.css                         # Tailwind + カスタムCSS
│   │   ├── apps/[slug]/page.tsx                # アプリ詳細 (/apps/{slug})
│   │   └── app-document/[appName]/[docType]/   # ドキュメント
│   ├── components/
│   │   ├── layout/    Navbar.tsx, Footer.tsx
│   │   ├── home/      Hero.tsx, AppsContainer.tsx, AppCard.tsx, etc.
│   │   ├── app-detail/ Breadcrumb.tsx, AppHeader.tsx, ScreenshotCarousel.tsx, etc.
│   │   └── shared/    Badge.tsx, Tag.tsx, StoreButton.tsx, icons/
│   ├── data/
│   │   ├── apps/{slug}.json                    # アプリごとのJSONデータ（一元管理）
│   │   └── tags.ts                             # タグカテゴリ定義
│   ├── lib/
│   │   ├── apps.ts                             # getApp, getAllApps ヘルパー
│   │   └── screenshots.ts                     # ビルド時スクリーンショット列挙
│   └── types/
│       └── app.ts                              # App, Platform等の型定義
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── images/apps/{slug}/icon.png, screenshot-{n}.png
```

## アプリ追加手順
1. `public/images/apps/{slug}/` にアイコンとスクリーンショットを配置
2. `src/data/apps/{slug}.json` を作成（全掲載情報をJSON1ファイルで管理）
3. 完了（ページは自動生成される）

### JSONファイルの構造
- 基本情報: slug, name, category, platforms, shortDescription, subtitle, promoText
- タグ: tags, detailTags
- ストアリンク: storeLinksCard, storeGroupsDetail
- 説明文: description（Markdown形式、react-markdownでレンダリング）
- ドキュメントページ（任意）: documents（about/contact/privacy-policy）

## フィルターシステム
- **2段階ANDフィルター**: カテゴリ（type） × プラットフォーム（platform）
- カテゴリ: `all` / `game` / `app`
- プラットフォーム: `all` / `web` / `ios` / `android`

## バッジシステム
- `game` — 緑（`#EAF3DE` / `#3B6D11`）
- `app` — 青（`#E6F1FB` / `#185FA5`）

## 現在の掲載アプリ一覧

| アプリ名 | slug | カテゴリ | プラットフォーム | 状態 |
|---------|------|---------|-----------------|------|
| HEXLIDE | hexlide | game | web, ios, android | 公開中 |
| TileOut | tileout | game | web | 公開中 |
| CELLS | cells | game | web | 公開中 |
| パズルパネル | puzzlepanel | game | web | 公開中 |
| CircleTactics | circletactics | game | web | 公開中 |
| BombCountdown | bombcountdown | game | web | 公開中 |
| Git Branch Name Generator | branchnamegenerator | app | web | 公開中 |
| X Video Downloader | xvideodownloader | app | web | 公開中 |
| SakaMap | sakamap | app | web, ios, android | 公開中 |
| MemoNow | memonow | app | ios | Coming Soon |
