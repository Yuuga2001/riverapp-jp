# riverapp.jp ポートフォリオサイト

## サイト概要
- 静的HTMLサイト（ビルドシステム・フレームワーク不使用）
- 個人開発アプリのカタログ/ポートフォリオ
- ホスト: riverapp.jp
- リポジトリ: GitHub `Yuuga2001/riverapp-jp`、ブランチ `main`

## ディレクトリ構成
```
riverapp-jp/
├── index.html                    # トップページ（アプリ一覧）
├── apps/
│   └── {slug}.html               # 各アプリ詳細ページ
├── public/
│   ├── favicon.svg               # ファビコン（"r." デザイン）
│   └── images/apps/{slug}/
│       ├── icon.png              # アプリアイコン
│       └── screenshot-{n}.png    # スクリーンショット（1から連番）
├── src/
│   ├── styles/
│   │   ├── shared.css            # グローバルスタイル・CSS変数
│   │   ├── home.css              # トップページ用スタイル
│   │   └── app-detail.css        # 詳細ページ用スタイル
│   └── data/
│       └── tags.json             # タグマスタ定義
```

## フィルターシステム
- **2段階ANDフィルター**: カテゴリ（type） × プラットフォーム（platform）
- カテゴリ: `all` / `game` / `app`
- プラットフォーム: `all` / `web` / `ios` / `android`
- カード属性: `data-category="game|app"`, `data-platform="web,ios,android"`（カンマ区切り）

## バッジシステム
- `.badge-game` — 緑（`#EAF3DE` / `#3B6D11`）
- `.badge-app` — 青（`#E6F1FB` / `#185FA5`）

## タグカテゴリ（tags.json準拠）
- **言語**: 多言語対応 / 英語対応 / 日本語のみ
- **端末**: スマホ/PC両対応 / スマホ専用 / PC専用
- **プラットフォーム**: iOSアプリ / Androidアプリ / Webアプリ
- **人数**: 1人用 / 1〜2人用 / 多人数対応
- **種類**: オンライン対戦 / アクションゲーム / パズルゲーム / ボードゲーム / 戦略ゲーム / バトルロワイヤル / 業務効率化 / 推し活 / 旅行 / ウィジェット / メモ

---

## アプリ掲載手順

新しいアプリをサイトに追加する際の手順。

### 1. アプリ情報の収集
対象プロジェクト（例: `/Users/tachikawa/MyApp/{project-name}`）から以下を取得:
- アプリ名（表示名）
- slug（URLパス用。英数小文字、ハイフン可）
- カテゴリ: `game` or `app`
- 対応プラットフォーム: `web`, `ios`, `android` の組み合わせ
- 短い説明文（カード用、1〜2行）
- 詳細説明（詳細ページ用）
- タグ（tags.json のカテゴリから適切なものを選択）
- ストアURL（あれば）
- アイコン画像の場所
- Coming Soon かどうか

### 2. アイコン画像の配置
```bash
mkdir -p public/images/apps/{slug}
cp {アイコンの元パス} public/images/apps/{slug}/icon.png
```
- スクリーンショットがある場合: `screenshot-1.png`, `screenshot-2.png`, ... と連番で配置
- カルーセルJSが png → jpg の順で自動検出する

### 3. index.html にカードを追加
- `<!-- ▲▲▲ アプリカードここまで ▲▲▲ -->` の直前、`coming-soon`（開発中...）カードの直前に挿入
- カード構造は下記テンプレート参照

### 4. 詳細ページの作成
- `apps/{slug}.html` を作成
- 既存の詳細ページ（例: `apps/sakamap.html`）をテンプレートとして使用

### 5. CSSアニメーション遅延の更新
- `src/styles/home.css` の `.app-card:nth-child(N)` のアニメーション遅延を追加
- カード数+1 まで定義（0.05s 刻み）

### 6. コミット & プッシュ

---

## カードテンプレート

### 通常カード
```html
<div class="app-card" data-category="{game|app}" data-platform="{web,ios,android}" data-href="/apps/{slug}">
  <img src="/public/images/apps/{slug}/icon.png" alt="{アプリ名}" class="app-card-icon">
  <div class="app-meta">
    <span class="app-name">{アプリ名}</span>
    <span class="app-badge badge-{game|app}">{game|app}</span>
  </div>
  <p class="app-desc">{説明文}</p>
  <div class="app-tags app-tags-compact">
    <span class="app-tag">{タグ1}</span>
    <span class="app-tag">{タグ2}</span>
  </div>
  <div class="app-footer">
    <div class="store-links">
      <!-- App Store -->
      <a href="{URL}" class="store-btn" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        App Store
      </a>
      <!-- Google Play -->
      <a href="{URL}" class="store-btn" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24">
          <path d="M3.18 23.76c.3.17.65.19.96.04l12.45-7.2-2.78-2.78-10.63 9.94zM.47 1.43C.17 1.76 0 2.27 0 2.93v18.14c0 .66.17 1.17.47 1.5l.08.07 10.16-10.16v-.24L.55 1.36l-.08.07zM20.13 10.44l-2.9-1.68-3.07 3.07 3.07 3.08 2.92-1.69c.83-.48.83-1.27-.02-1.78zM3.18.24l12.45 7.2-2.78 2.77L2.22.28C2.54.11 2.88.07 3.18.24z"/>
        </svg>
        Google Play
      </a>
      <!-- Webアプリ -->
      <a href="{URL}" class="store-btn" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
        Webアプリ
      </a>
    </div>
    <span class="app-arrow">↗</span>
  </div>
</div>
```

### Coming Soon カード
```html
<div class="app-card app-card-coming-soon" data-category="{game|app}" data-platform="{ios等}" data-href="/apps/{slug}">
  <div class="coming-soon-ribbon">Coming Soon</div>
  <img src="/public/images/apps/{slug}/icon.png" alt="{アプリ名}" class="app-card-icon">
  <div class="app-meta">
    <span class="app-name">{アプリ名}</span>
    <span class="app-badge badge-{game|app}">{game|app}</span>
  </div>
  <p class="app-desc">{説明文}</p>
  <div class="app-tags app-tags-compact">
    <span class="app-tag">{タグ}</span>
  </div>
  <div class="app-footer">
    <div class="store-links">
      <span class="store-btn store-btn-disabled">
        <svg viewBox="0 0 24 24"><!-- ストアアイコンSVG --></svg>
        {ストア名}
      </span>
    </div>
    <span class="app-arrow">↗</span>
  </div>
</div>
```

### 詳細ページテンプレート
既存の `apps/sakamap.html` をベースにコピーし、以下を差し替え:
- `<title>`, OGP meta タグ
- パンくずリストのアプリ名
- アイコンパス（`/public/images/apps/{slug}/icon.png`）
- アプリ名、バッジ、サブタイトル、タグ
- ストアリンク（Coming Soon の場合は `store-btn-detail-disabled` クラス + `<span>` に変更）
- プロモーションテキスト
- スクリーンショットの `data-slug` 属性
- 説明セクション
- リンクセクション（不要なら省略可）
- フッターの年号（2026）

### Coming Soon 詳細ページの追加要素
- タイトル横に `<span class="coming-soon-badge">Coming Soon</span>` を追加
- ストアボタンに `store-btn-detail-disabled` クラスを使用（`<a>` ではなく `<span>`）

---

## 現在の掲載アプリ一覧（2026-03-15時点）

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
| QuickNote | widgetmemo | app | ios | Coming Soon |
