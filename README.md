# riverapp.jp

個人開発アプリのポートフォリオサイト。

https://riverapp.jp

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router / SSG)
- **言語**: TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **ホスティング**: Vercel
- **テスト**: Vitest + Testing Library + Playwright

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（SSG） |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint 実行 |
| `npm test` | ユニットテスト実行 |
| `npm run test:watch` | テスト（watchモード） |
| `npm run test:e2e` | E2Eテスト（Playwright） |
| `npm run test:all` | 全テスト実行 |

## アプリの追加方法

1. `public/images/apps/{slug}/` にアイコン（`icon.png`）とスクリーンショット（`screenshot-1.png`, ...）を配置
2. `src/data/apps/{slug}.json` を作成
3. 完了 — ページは自動生成されます

詳細は [docs/adding-apps.md](docs/adding-apps.md) を参照してください。

## ドキュメント

| ドキュメント | 内容 |
|------------|------|
| [docs/adding-apps.md](docs/adding-apps.md) | アプリ追加ガイド（JSONフィールド、テンプレート、チェックリスト） |
| [docs/architecture.md](docs/architecture.md) | アーキテクチャ（データフロー、ページ構成、スタイリング） |
| [docs/testing.md](docs/testing.md) | テストガイド（3層テスト構成、実行方法、テストの書き方） |
| [docs/i18n.md](docs/i18n.md) | 国際化ガイド（翻訳の仕組み、追加方法） |

## ディレクトリ構成

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ (/)
│   ├── apps/[slug]/page.tsx      # アプリ詳細ページ
│   └── app-document/             # ドキュメントページ (about/contact/privacy)
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Hero, AppCard, FilterSection
│   ├── app-detail/               # AppHeader, ScreenshotCarousel, etc.
│   └── shared/                   # Badge, Tag, StoreButton, icons
├── data/
│   └── apps/{slug}.json          # アプリごとのデータ（一元管理）
├── lib/                          # ヘルパー関数
└── types/                        # 型定義
public/
└── images/apps/{slug}/           # アプリ画像
```

## デプロイ

`main` ブランチへの push で Vercel が自動デプロイします。

```bash
git push origin main
```
