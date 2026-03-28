# アーキテクチャ

riverapp.jp のシステム設計と全体構成のドキュメントです。

---

## 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 16.x | フレームワーク（App Router, SSG） |
| React | 19.x | UI ライブラリ |
| TypeScript | 5.x | 型安全 |
| Tailwind CSS | 4.x | スタイリング |
| react-markdown | 10.x | Markdown レンダリング |
| Vercel | - | ホスティング・デプロイ |

---

## ディレクトリ構成

```
src/
├── app/                              # Next.js App Router（ページ）
│   ├── layout.tsx                    # ルートレイアウト（Navbar, Footer, I18nProvider）
│   ├── page.tsx                      # トップページ（/）
│   ├── globals.css                   # Tailwind + カスタムCSS・アニメーション
│   ├── sitemap.ts                    # サイトマップ自動生成
│   ├── robots.ts                     # robots.txt 自動生成
│   ├── not-found.tsx                 # 404 ページ
│   ├── privacy-policy/page.tsx       # サイト全体のプライバシーポリシー
│   ├── apps/[slug]/page.tsx          # アプリ詳細ページ（動的ルート）
│   └── app-document/[appName]/[docType]/
│       ├── page.tsx                  # ドキュメントページ（ディスパッチャー）
│       ├── layout.tsx                # ドキュメントレイアウト
│       ├── AboutPage.tsx             # About 表示
│       ├── ContactPage.tsx           # Contact 表示
│       ├── PrivacyPolicyDocPage.tsx  # プライバシーポリシー表示
│       └── TermsOfServiceDocPage.tsx # 利用規約表示
│
├── components/
│   ├── layout/                       # レイアウト系
│   │   ├── Navbar.tsx                # グローバルナビ（sticky）
│   │   ├── Footer.tsx                # フッター
│   │   └── LanguageSwitcher.tsx      # 言語切り替えボタン（ja/en）
│   ├── home/                         # トップページ用
│   │   ├── Hero.tsx                  # ヒーローセクション
│   │   ├── AppCountAnimation.tsx     # アプリ数カウントアップ
│   │   ├── AppsContainer.tsx         # フィルター状態管理 + アプリ一覧
│   │   ├── FilterSection.tsx         # フィルターボタン群
│   │   ├── AppGrid.tsx              # アプリカードグリッド
│   │   ├── AppCard.tsx              # 個別アプリカード
│   │   └── AboutSection.tsx         # プロフィール・コンタクト
│   ├── app-detail/                   # アプリ詳細ページ用
│   │   ├── Breadcrumb.tsx           # パンくずリスト
│   │   ├── AppHeader.tsx            # アイコン + 名前 + バッジ + ストアグループ
│   │   ├── PromoSection.tsx         # プロモーションテキスト
│   │   ├── ScreenshotCarousel.tsx   # スクリーンショット無限スクロール
│   │   ├── DescriptionSection.tsx   # Markdown 説明文
│   │   └── LinksSection.tsx         # ドキュメント + 外部リンク
│   └── shared/                       # 共有コンポーネント
│       ├── Badge.tsx                # カテゴリバッジ（game: 緑 / app: 青）
│       ├── Tag.tsx                  # タグ（翻訳対応）
│       ├── StoreButton.tsx          # ストアボタン（3種 + disabled 対応）
│       └── icons/                   # SVG アイコン（Apple, GooglePlay, Web）
│
├── data/
│   ├── apps/{slug}.json             # アプリメタデータ（全情報を1ファイルで管理）
│   ├── content/                     # サイトコンテンツ
│   └── tags.ts                      # タグカテゴリ定義
│
├── i18n/
│   ├── config.ts                    # ロケール設定・翻訳キーマッピング
│   ├── context.tsx                  # I18nProvider・翻訳フック
│   └── translations/
│       ├── ja.json                  # 日本語翻訳（デフォルト）
│       └── en.json                  # 英語翻訳（動的ロード）
│
├── lib/
│   ├── apps.ts                      # アプリデータ読み込み・検索ヘルパー
│   └── screenshots.ts              # スクリーンショットパス列挙
│
├── types/
│   └── app.ts                       # App, Platform, StoreLink 等の型定義
│
└── test/
    └── setup.tsx                    # Vitest セットアップ（モック定義）
```

---

## データフロー

### 全体像

```
src/data/apps/*.json
        │
        ▼
  lib/apps.ts（読み込み・キャッシュ）
        │
        ├──▶ トップページ ── getAllApps() ──▶ AppsContainer ──▶ AppCard[]
        │
        ├──▶ 詳細ページ ──── getApp(slug) ──▶ AppHeader, Description, Links...
        │
        └──▶ ドキュメント ── getAppForDocument() ──▶ AboutPage, ContactPage...

  lib/screenshots.ts（ファイルシステム走査）
        │
        └──▶ 詳細ページ ── getScreenshotPaths(slug) ──▶ ScreenshotCarousel
```

### JSON がページになるまで

1. **ビルド時**: `loadApps()` が `src/data/apps/` の全 JSON を読み込みキャッシュ
2. **静的生成**: `generateStaticParams()` が全 slug / ドキュメントパラメータを列挙
3. **ページ生成**: 各ページコンポーネントが `getApp()` 等でデータ取得 → React コンポーネントに渡す
4. **クライアント側**: `useLocalizedApp()` が locale に応じて `en` フィールドをマージ

---

## ページ構成

### トップページ（`/`）

```
Hero
  └─ AppCountAnimation（アプリ数カウントアップ）

AppsContainer（Client Component — フィルター状態管理）
  ├─ FilterSection（カテゴリ × プラットフォーム × ソート）
  └─ AppGrid
       └─ AppCard[]（アイコン、説明、タグ、ストアボタン）

AboutSection（プロフィール・コンタクト）
```

**フィルターシステム**: 2段階 AND フィルター
- カテゴリ: `all` | `game` | `app`
- プラットフォーム: `all` | `web` | `ios` | `android`
- ソート: `oldest` | `newest`（createdAt 基準）

### アプリ詳細ページ（`/apps/[slug]`）

```
Breadcrumb（トップ > apps > アプリ名）

AppHeader（アイコン + 名前 + バッジ + Coming Soon + ストアグループ）

PromoSection（プロモーションテキスト + カード用ストアボタン）

ScreenshotCarousel（スクリーンショットが存在する場合のみ表示）

DescriptionSection（Markdown → react-markdown）

LinksSection（documents があればドキュメントリンク + 外部リンク）
```

**SEO 出力**:
- OGP（OpenGraph）メタデータ
- Twitter Card メタデータ
- JSON-LD: `SoftwareApplication` + `BreadcrumbList`

### ドキュメントページ（`/app-document/[appName]/[docType]`）

`docType` に応じて4つのコンポーネントにディスパッチ:

| docType | コンポーネント |
|---------|--------------|
| `about` | AboutPage |
| `contact` | ContactPage |
| `privacy-policy` | PrivacyPolicyDocPage |
| `terms-of-service` | TermsOfServiceDocPage |

---

## ルートレイアウト

```
<html lang="ja">
  <head>
    Fonts: DM Mono, Noto Sans JP（Google Fonts）
    Metadata（OGP, Twitter, Icons）
    JSON-LD（WebSite schema）
  </head>
  <body>
    <I18nProvider>
      <Navbar />        ← sticky, 言語切り替えボタン付き
      {children}        ← ページコンテンツ
      <Footer />
    </I18nProvider>
    <SpeedInsights />   ← Vercel パフォーマンス計測
  </body>
</html>
```

---

## 静的生成（SSG）

すべてのページがビルド時に静的生成されます。

| ページ | 生成元 |
|--------|--------|
| `/` | 固定 |
| `/apps/[slug]` | `getAppSlugs()` → 全 slug |
| `/app-document/[appName]/[docType]` | `getAllAppDocumentParams()` → documents 定義のある全組み合わせ |
| `/privacy-policy` | 固定 |
| `/sitemap.xml` | `sitemap.ts` で自動生成 |
| `/robots.txt` | `robots.ts` で自動生成 |

---

## スタイリング

### テーマカラー（globals.css の @theme）

| 変数 | 値 | 用途 |
|------|-----|------|
| `--color-bg` | `#FAFAF8` | 背景色 |
| `--color-surface` | `#FFFFFF` | カード等の表面色 |
| `--color-text-primary` | `#1A1A18` | メインテキスト |
| `--color-text-secondary` | `#6B6860` | サブテキスト |
| `--color-badge-game-bg/text` | `#EAF3DE` / `#3B6D11` | ゲームバッジ（緑） |
| `--color-badge-app-bg/text` | `#E6F1FB` / `#185FA5` | アプリバッジ（青） |

### カスタムアニメーション

| 名前 | 用途 |
|------|------|
| `fadeUp` | カード等のフェードインアニメーション |
| `pulseDot` | パルスアニメーション |
| `scroll-left` | スクリーンショットカルーセル |

`prefers-reduced-motion: reduce` でアニメーション無効化に対応。

---

## セキュリティ

`next.config.ts` でセキュリティヘッダーを設定:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## デプロイ

- **ホスト**: Vercel
- **ドメイン**: riverapp.jp
- **自動デプロイ**: `main` ブランチへの push で CI → デプロイ
- **環境変数**（GitHub Secrets）: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- ソースコード内に `process.env` の参照なし（環境変数不要のフルSSG）
