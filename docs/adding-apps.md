# アプリ追加ガイド

riverapp.jp にアプリを追加するための手順書です。

---

## 概要

アプリの追加に必要なのは **2つ** だけです：

1. **画像** を `public/images/apps/{slug}/` に配置
2. **JSON** を `src/data/apps/{slug}.json` に作成

ページは Next.js の動的ルーティングで **自動生成** されます。コンポーネントやルーティングの変更は不要です。

---

## 手順

### Step 1: slug を決める

- URL・ファイル名に使う一意の識別子（英数字小文字、ハイフン可）
- 例: `hexlide`, `sakamap`, `memonow`, `branchnamegenerator`

### Step 2: 画像を配置

```
public/images/apps/{slug}/
├── icon.png                 # 必須 — アプリアイコン
├── screenshot-1.png         # 任意 — スクリーンショット（番号順）
├── screenshot-2.png
├── screenshot-3.png
└── ...
```

- **icon.png** はカード・詳細ページのヘッダーに表示される
- **screenshot-{N}.png** は詳細ページのカルーセルに表示される（PNG/JPG対応）
- 番号は 1 から連番にする（`screenshot-1.png`, `screenshot-2.png`, ...）
- スクリーンショットがなければカルーセルは非表示になる

### Step 3: JSON を作成

`src/data/apps/{slug}.json` を作成します。

---

## JSON フィールド一覧

### 基本情報（必須）

| フィールド | 型 | 説明 |
|-----------|------|------|
| `slug` | `string` | 一意識別子。ディレクトリ名と一致させる |
| `createdAt` | `string` | 作成日（`YYYY-MM-DD`） |
| `name` | `string` | アプリ表示名 |
| `category` | `"game"` \| `"app"` | カテゴリ（バッジの色に影響） |
| `platforms` | `string[]` | 対応プラットフォーム: `"web"`, `"ios"`, `"android"` |
| `shortDescription` | `string` | 短い説明文（カード表示、4行クランプ） |
| `subtitle` | `string` | サブタイトル |
| `promoText` | `string` | プロモーション用テキスト |
| `tags` | `string[]` | カード表示用タグ |
| `detailTags` | `string[]` | 詳細ページ用タグ（tagsより多くてOK） |
| `storeLinksCard` | `StoreLink[]` | カード上のストアボタン |
| `storeGroupsDetail` | `StoreGroup[]` | 詳細ページのストアボタン（グループ化） |

### オプションフィールド

| フィールド | 型 | 説明 |
|-----------|------|------|
| `links` | `ExternalLink[]` | 外部リンク（遊び方、プライバシーポリシー等） |
| `ogDescription` | `string` | OGP用メタディスクリプション |
| `description` | `string` | Markdown形式の詳細説明 |
| `comingSoon` | `boolean` | `true` にするとカードに「Coming Soon」バッジ表示 |
| `documents` | `AppDocuments` | ドキュメントページ用データ（後述） |
| `en` | `AppEnContent` | 英語翻訳 |

---

## ストアリンクの書き方

### StoreLink

```json
{
  "type": "app-store" | "google-play" | "web",
  "url": "https://...",
  "label": "App Store",
  "disabled": true  // 省略可。trueでボタンが無効化（準備中表示）
}
```

| type | 用途 | アイコン |
|------|------|---------|
| `app-store` | Apple App Store | Apple アイコン |
| `google-play` | Google Play Store | Google Play アイコン |
| `web` | Webアプリ / ブラウザ版 | Web アイコン |

### storeLinksCard（カード用）

カードに表示するストアボタンの配列。フラットに並べる。

```json
"storeLinksCard": [
  {"type": "app-store", "url": "https://apps.apple.com/...", "label": "App Store"},
  {"type": "google-play", "url": "https://play.google.com/...", "label": "Google Play"},
  {"type": "web", "url": "https://example.riverapp.jp", "label": "Webアプリ"}
]
```

### storeGroupsDetail（詳細ページ用）

グループラベル付きでストアボタンを分類できる。

```json
"storeGroupsDetail": [
  {
    "label": "スマホアプリをダウンロード",
    "links": [
      {"type": "app-store", "url": "https://apps.apple.com/...", "label": "App Store"},
      {"type": "google-play", "url": "https://play.google.com/...", "label": "Google Play"}
    ]
  },
  {
    "label": "今すぐブラウザでプレイ",
    "links": [
      {"type": "web", "url": "https://example.riverapp.jp", "label": "Webアプリ"}
    ]
  }
]
```

---

## 準備中（Coming Soon）のアプリを追加する場合

ストア未公開のアプリは以下のように設定します：

1. `"comingSoon": true` を追加 → カードに「Coming Soon」バッジ
2. ストアリンクに `"disabled": true` を追加 → ボタンが無効化

```json
"storeLinksCard": [
  {"type": "app-store", "url": "", "label": "App Store", "disabled": true}
],
"comingSoon": true
```

**リリース後の対応：**
- `comingSoon` フィールドを削除
- `disabled` フィールドを削除
- `url` に実際のストアURLを設定
- `label` から「準備中」等の文言を削除

---

## 外部リンク（links）

詳細ページのリンクセクションに表示される。

```json
"links": [
  {"label": "今すぐプレイ", "url": "https://example.riverapp.jp", "external": true},
  {"label": "プライバシーポリシー", "url": "https://example.riverapp.jp/privacy", "external": true}
]
```

---

## ドキュメントページの2つのパターン

アプリの「プライバシーポリシー」「お問い合わせ」などのドキュメントページには、**2つのパターン** があります。

### パターン A: アプリ側のWebサイトに既にドキュメントがある場合

SakaMap や HEXLIDE のように、アプリ自体がWebサイトを持っていてそちらにドキュメントページがある場合は、**`links` フィールドで外部リンクとして直接遷移させる**だけでOKです。`documents` フィールドは不要です。

```json
// SakaMap の例: sakamap.com 側にドキュメントページがある
"links": [
  {"label": "今すぐ使う（Web版）", "url": "https://sakamap.com", "external": true},
  {"label": "このアプリについて", "url": "https://sakamap.com/about", "external": true},
  {"label": "プライバシーポリシー", "url": "https://sakamap.com/privacy", "external": true},
  {"label": "お問い合わせ", "url": "https://forms.gle/xxxxx", "external": true}
]
```

```json
// HEXLIDE の例: hexlide.riverapp.jp 側にドキュメントページがある
"links": [
  {"label": "今すぐプレイ", "url": "https://hexlide.riverapp.jp", "external": true},
  {"label": "遊び方", "url": "https://hexlide.riverapp.jp/app/how-to-play", "external": true},
  {"label": "プライバシーポリシー", "url": "https://hexlide.riverapp.jp/app/privacy", "external": true},
  {"label": "お問い合わせ", "url": "https://hexlide.riverapp.jp/app/contact", "external": true}
]
```

### パターン B: riverapp.jp 側にドキュメントページを生成する場合

MemoNow のように、アプリ自体がWebサイトを持たない（iOSアプリ専用など）場合は、**`documents` フィールドで riverapp.jp 上にドキュメントページを自動生成** します。

設定すると以下のURLにページが生成されます：

- `/app-document/{slug}/about` — アプリ紹介
- `/app-document/{slug}/contact` — お問い合わせ
- `/app-document/{slug}/privacy-policy` — プライバシーポリシー
- `/app-document/{slug}/terms-of-service` — 利用規約

### どちらを使うか判断する基準

| 条件 | 使うパターン |
|------|-------------|
| アプリのWebサイトにドキュメントページがある | **A**: `links` で外部リンク |
| アプリがWebサイトを持たない（iOS/Androidアプリ専用） | **B**: `documents` でページ生成 |
| Webアプリだがドキュメントページがまだない | **B**: `documents` でページ生成 |

### パターン B の構造

```json
"documents": {
  "appDisplayName": "アプリ表示名",
  "about": { ... },
  "contact": { ... },
  "privacy-policy": { ... },
  "terms-of-service": { ... }
}
```

各ドキュメントタイプは任意です。必要なものだけ定義してください。

### about（アプリ紹介）

```json
"about": {
  "catchcopy": "キャッチコピー",
  "subcopy": "サブコピー（改行可）",
  "features": [
    {"name": "機能名", "desc": "機能の説明"}
  ],
  "info": [
    {"key": "対応OS", "value": "iOS 17.0 以降"}
  ],
  "links": [
    {"label": "プライバシーポリシー", "href": "/app-document/{slug}/privacy-policy", "internal": true},
    {"label": "公式サイト", "href": "https://example.com", "external": true}
  ]
}
```

### contact（お問い合わせ）

```json
"contact": {
  "methods": [
    {
      "label": "お問い合わせフォーム",
      "description": "Google フォームから送信",
      "url": "https://forms.gle/xxxxx",
      "external": true
    },
    {
      "label": "メールで問い合わせ",
      "description": "riverapp.jp@gmail.com",
      "url": "mailto:riverapp.jp@gmail.com",
      "external": false
    }
  ]
}
```

### privacy-policy / terms-of-service

```json
"privacy-policy": {
  "sections": [
    {
      "title": "セクションタイトル",
      "body": "本文。{appName} は自動でアプリ表示名に置換される",
      "bullets": ["箇条書き項目（任意）"]
    }
  ],
  "lastUpdated": "2026-03-20"
}
```

---

## 英語翻訳（en）

`en` フィールドで英語版のテキストを提供できます。構造は日本語版と同じです。

```json
"en": {
  "shortDescription": "English short description",
  "subtitle": "English subtitle",
  "promoText": "English promo text",
  "description": "### About ...\n\nEnglish description in Markdown",
  "ogDescription": "English OG description",
  "linkLabels": {
    "今すぐプレイ": "Play Now",
    "プライバシーポリシー": "Privacy Policy"
  },
  "documents": {
    "appDisplayName": "AppName",
    "about": { ... },
    "contact": { ... },
    "privacy-policy": { ... }
  }
}
```

- `linkLabels` は `links` 配列の日本語ラベルをキーにして英語ラベルを対応付ける

---

## プラットフォーム別テンプレート

### Web ゲーム（最小構成）

```json
{
  "slug": "mygame",
  "createdAt": "2026-04-01",
  "name": "MyGame",
  "category": "game",
  "platforms": ["web"],
  "shortDescription": "ゲームの短い説明",
  "subtitle": "サブタイトル",
  "promoText": "プロモーションテキスト",
  "tags": ["スマホ/PC両対応", "1〜2人用"],
  "detailTags": ["スマホ/PC両対応", "Webアプリ", "1〜2人用"],
  "storeLinksCard": [
    {"type": "web", "url": "https://mygame.riverapp.jp", "label": "Webアプリ"}
  ],
  "storeGroupsDetail": [
    {
      "label": "今すぐブラウザでプレイ",
      "links": [
        {"type": "web", "url": "https://mygame.riverapp.jp", "label": "Webアプリ"}
      ]
    }
  ],
  "links": [
    {"label": "今すぐプレイ", "url": "https://mygame.riverapp.jp", "external": true}
  ],
  "ogDescription": "OGP用の短い説明",
  "description": "### MyGameについて\n\nMarkdown形式の詳細説明"
}
```

### iOS アプリ

```json
{
  "slug": "myapp",
  "createdAt": "2026-04-01",
  "name": "MyApp",
  "category": "app",
  "platforms": ["ios"],
  "shortDescription": "アプリの短い説明",
  "subtitle": "サブタイトル",
  "promoText": "プロモーションテキスト",
  "tags": ["iOSアプリ"],
  "detailTags": ["iOSアプリ"],
  "storeLinksCard": [
    {"type": "app-store", "url": "https://apps.apple.com/jp/app/id0000000000", "label": "App Store"}
  ],
  "storeGroupsDetail": [
    {
      "label": "ストアからダウンロード",
      "links": [
        {"type": "app-store", "url": "https://apps.apple.com/jp/app/id0000000000", "label": "App Store"}
      ]
    }
  ],
  "ogDescription": "OGP用の短い説明",
  "description": "### MyAppについて\n\nMarkdown形式の詳細説明",
  "documents": {
    "appDisplayName": "MyApp",
    "about": { ... },
    "contact": { ... },
    "privacy-policy": { ... }
  }
}
```

### マルチプラットフォーム（Web + iOS + Android）

```json
{
  "slug": "myapp",
  "createdAt": "2026-04-01",
  "name": "MyApp",
  "category": "app",
  "platforms": ["web", "ios", "android"],
  "shortDescription": "アプリの短い説明",
  "subtitle": "サブタイトル",
  "promoText": "プロモーションテキスト",
  "tags": ["多言語対応", "スマホ/PC両対応"],
  "detailTags": ["多言語対応", "スマホ/PC両対応", "iOSアプリ", "Androidアプリ", "Webアプリ"],
  "storeLinksCard": [
    {"type": "app-store", "url": "https://apps.apple.com/...", "label": "App Store"},
    {"type": "google-play", "url": "https://play.google.com/...", "label": "Google Play"},
    {"type": "web", "url": "https://myapp.riverapp.jp", "label": "Webアプリ"}
  ],
  "storeGroupsDetail": [
    {
      "label": "スマホアプリをダウンロード",
      "links": [
        {"type": "app-store", "url": "https://apps.apple.com/...", "label": "App Store"},
        {"type": "google-play", "url": "https://play.google.com/...", "label": "Google Play"}
      ]
    },
    {
      "label": "今すぐブラウザでプレイ",
      "links": [
        {"type": "web", "url": "https://myapp.riverapp.jp", "label": "Webアプリ"}
      ]
    }
  ],
  "ogDescription": "OGP用の短い説明",
  "description": "### MyAppについて\n\nMarkdown形式の詳細説明"
}
```

---

## チェックリスト

アプリ追加時に確認すべき項目：

- [ ] `slug` がディレクトリ名・JSONファイル名と一致しているか
- [ ] `public/images/apps/{slug}/icon.png` が存在するか
- [ ] スクリーンショットの番号が 1 から連番か
- [ ] `category` が `"game"` または `"app"` か
- [ ] `platforms` に含まれるプラットフォームに対応するストアリンクがあるか
- [ ] ストアリンクの URL が正しいか
- [ ] 準備中の場合、`comingSoon` と `disabled` を設定したか
- [ ] `en` で英語翻訳を提供したか
- [ ] `documents` を設定した場合、`appDisplayName` を含めたか
- [ ] CLAUDE.md のアプリ一覧テーブルを更新したか
