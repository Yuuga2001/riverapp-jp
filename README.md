# riverapp.jp

個人開発アプリ図鑑サイト

## アプリの追加方法

`index.html` の `<!-- ▼▼▼ ここにアプリカードを追加していく ▼▼▼ -->` の下に
以下のHTMLブロックをコピーして追加する。

### カテゴリ一覧
- `game` — ゲーム（バッジ: badge-game / アイコン背景: #EAF3DE）
- `util` — 便利ツール（バッジ: badge-util / アイコン背景: #E6F1FB）
- `web` — Webアプリ（バッジ: badge-web / アイコン背景: #EEEDFE）
- `life` — ライフ（バッジ: badge-life / アイコン背景: #FAEEDA）
- `social` — ソーシャル（バッジ: badge-social / アイコン背景: #FBEAF0）

## デプロイ

```bash
git add .
git commit -m "add new app"
git push
```
→ Vercelが自動でデプロイ

## ローカル確認

```bash
npx serve .
```
`http://localhost:3000` で確認できる
