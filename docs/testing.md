# テストガイド

riverapp.jp のテスト構成と実行方法のドキュメントです。

---

## テストの3層構成

| 層 | ツール | 対象 | ファイルパターン | 設定ファイル |
|----|--------|------|-----------------|-------------|
| ユニットテスト | Vitest | ヘルパー関数・データ検証 | `src/**/*.test.ts` | `vitest.config.ts` |
| コンポーネントテスト | Vitest + Testing Library | React コンポーネント | `src/**/*.spec.tsx` | `vitest.config.components.ts` |
| E2E テスト | Playwright | ブラウザ上のユーザーフロー | `e2e/*.spec.ts` | `playwright.config.ts` |

---

## テストの実行

```bash
# 全テストを順番に実行
npm run test:all

# 個別実行
npm run test:unit          # ユニットテストのみ
npm run test:components    # コンポーネントテストのみ
npm run test:e2e           # E2Eテストのみ

# 開発中のウォッチモード
npm run test:watch
```

E2E テストは開発サーバーが必要です。`npm run test:e2e` を実行すると、ポート 3100 で自動的にサーバーが起動します。

---

## 各テストファイルの内容

### ユニットテスト

#### `src/lib/__tests__/apps.test.ts`
アプリデータの読み込み・検索関数のテスト。

| テスト内容 |
|-----------|
| `getAllApps()` が全アプリを返す |
| `getApp(slug)` が slug で正しくアプリを取得する |
| 存在しない slug でエラーが発生する |
| `getAppSlugs()` が全 slug の配列を返す |
| `getAppByDisplayName()` が表示名で検索できる |
| `getAllAppDocumentParams()` がドキュメントパラメータを生成する |
| `getAppForDocument()` がドキュメント情報を取得する |

#### `src/lib/__tests__/filter-logic.test.ts`
フィルターロジック（カテゴリ × プラットフォーム）の組み合わせテスト。

| テスト内容 |
|-----------|
| `all × all` で全アプリが通過する |
| `game × all` で game カテゴリのみ |
| `app × ios` で app + iOS 対応のみ（AND 条件） |
| 各種組み合わせの結果件数の検証 |

#### `src/lib/__tests__/screenshots.test.ts`
スクリーンショットパス取得のテスト（`fs` をモック化）。

| テスト内容 |
|-----------|
| ディレクトリが存在しない場合、空配列を返す |
| `screenshot-{N}.png` の命名規則でフィルタリングされる |
| インデックス順にソートされる |
| `icon.png` 等の無関係なファイルは除外される |

#### `src/data/__tests__/apps-data.test.ts`
JSON データの整合性検証。

| テスト内容 |
|-----------|
| 全アプリの slug がユニークである |
| 必須フィールド（slug, name, category, platforms）が存在する |
| `category` が `"game"` または `"app"` である |
| `platforms` の各値が `"web"`, `"ios"`, `"android"` のいずれか |
| 全アプリが最低 1 件のストアリンクを持つ |

### コンポーネントテスト

#### `src/components/home/__tests__/AppsContainer.spec.tsx`
フィルター付きアプリ一覧の統合テスト。

| テスト内容 |
|-----------|
| 初期表示で全アプリが表示される |
| 「ゲーム」フィルタで game カテゴリのみ表示 |
| 「iOS」フィルタで iOS 対応アプリのみ表示 |
| 「ゲーム × iOS」の AND フィルタが正しく動作する |

#### `src/components/home/__tests__/FilterSection.spec.tsx`
フィルターボタン群のUIテスト。

| テスト内容 |
|-----------|
| フィルターボタンが正しく描画される |
| `aria-pressed` 属性がアクティブ状態を反映する |
| クリック時にコールバックが呼ばれる |

#### `src/components/shared/__tests__/Badge.spec.tsx`
カテゴリバッジのテスト。

| テスト内容 |
|-----------|
| `category="game"` で "game" テキストが表示される |
| `category="app"` で "app" テキストが表示される |

### E2E テスト

#### `e2e/home.spec.ts`
トップページのブラウザテスト。

| テスト内容 |
|-----------|
| ページタイトル・Hero セクションが表示される |
| 全アプリカードが表示される |
| カテゴリフィルタ・プラットフォームフィルタが動作する |
| アプリカードクリックで詳細ページへ遷移する |

#### `e2e/app-detail.spec.ts`
アプリ詳細ページのブラウザテスト。

| テスト内容 |
|-----------|
| アプリ情報が正しく表示される |
| パンくずリストからトップページに戻れる |
| ストアリンクが表示される |
| 存在しない slug で 404 が返される |

#### `e2e/navigation.spec.ts`
サイト全体のナビゲーションテスト。

| テスト内容 |
|-----------|
| トップ → 詳細 → トップの遷移フロー |
| 全アプリの詳細ページが正常に表示される（200 応答） |
| モバイルビューポート（375×812）でのレスポンシブ表示 |

---

## 新しいテストを追加する

### ユニットテスト

`src/` 以下に `*.test.ts` ファイルを作成。

```typescript
// src/lib/__tests__/example.test.ts
import { describe, it, expect } from "vitest";

describe("関数名", () => {
  it("期待する動作の説明", () => {
    expect(actual).toBe(expected);
  });
});
```

### コンポーネントテスト

`src/` 以下に `*.spec.tsx` ファイルを作成。jsdom 環境で実行され、`next/image` と `next/navigation` は自動モック化済み。

```tsx
// src/components/shared/__tests__/Example.spec.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExampleComponent } from "../ExampleComponent";

describe("ExampleComponent", () => {
  it("テキストが表示される", () => {
    render(<ExampleComponent text="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

### E2E テスト

`e2e/` 以下に `*.spec.ts` ファイルを作成。

```typescript
// e2e/example.spec.ts
import { test, expect } from "@playwright/test";

test("ページが表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/riverapp/);
});
```

---

## CI での実行

GitHub Actions（`.github/workflows/ci.yml`）で自動実行されます。

```
npm ci
  ↓
npm run build          # SSG ビルド
  ↓
npm run test:unit      # ユニットテスト
  ↓
npm run test:components  # コンポーネントテスト
  ↓
playwright install     # Chromium セットアップ
  ↓
npm run test:e2e       # E2E テスト
```

ビルドが通った後にテストが実行されるため、SSG で生成されるページの整合性も間接的に検証されます。

---

## テストセットアップ（src/test/setup.tsx）

コンポーネントテスト用の共通セットアップ:

- `@testing-library/jest-dom/vitest` — DOM マッチャー拡張（`toBeInTheDocument()` 等）
- `afterEach(cleanup)` — 各テスト後に DOM をクリーンアップ
- `next/image` モック — `<Image>` を通常の `<img>` に置換
- `next/navigation` モック — `useRouter`, `usePathname`, `useSearchParams` のモック
