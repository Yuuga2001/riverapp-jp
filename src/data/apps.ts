import type { App } from "@/types/app";

export const apps: App[] = [
  {
    slug: "hexlide",
    name: "HEXLIDE",
    category: "game",
    platforms: ["web", "ios", "android"],
    shortDescription:
      "HEXLIDEは、従来のボードゲームにない独自の戦術性を持つ六角形グリッドの対戦ゲームです。コマだけでなく盤面のタイル自体を動かすことができる革新的なルールにより、無限の戦略的可能性が広がります。",
    subtitle: "六角形グリッドの対戦ボードゲーム",
    promoText:
      "HEXLIDEは、従来のボードゲームにない独自の戦術性を持つ六角形グリッドの対戦ゲームです。コマだけでなく盤面のタイル自体を動かすことができる革新的なルールにより、無限の戦略的可能性が広がります。",
    tags: [
      "多言語対応",
      "スマホ/PC両対応",
      "1〜2人用",
      "オンライン対戦",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    detailTags: [
      "多言語対応",
      "スマホ/PC両対応",
      "iOSアプリ",
      "Androidアプリ",
      "Webアプリ",
      "1〜2人用",
      "オンライン対戦",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    storeLinksCard: [
      {
        type: "app-store",
        url: "https://apps.apple.com/app/hexlide/id000000",
        label: "App Store",
      },
      {
        type: "google-play",
        url: "https://play.google.com/store/apps/details?id=jp.riverapp.hexlide",
        label: "Google Play",
      },
      {
        type: "web",
        url: "https://hexlide.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "スマホアプリをダウンロード",
        links: [
          {
            type: "app-store",
            url: "https://apps.apple.com/app/hexlide/id000000",
            label: "App Store",
          },
          {
            type: "google-play",
            url: "https://play.google.com/store/apps/details?id=jp.riverapp.hexlide",
            label: "Google Play",
          },
        ],
      },
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://hexlide.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      { label: "今すぐプレイ", url: "https://hexlide.riverapp.jp", external: true },
      {
        label: "遊び方",
        url: "https://hexlide.riverapp.jp/app/how-to-play",
        external: true,
      },
      {
        label: "プライバシーポリシー",
        url: "https://hexlide.riverapp.jp/app/privacy",
        external: true,
      },
      {
        label: "お問い合わせ",
        url: "https://hexlide.riverapp.jp/app/contact",
        external: true,
      },
      {
        label: "アプリ紹介サイト",
        url: "https://hexlide.riverapp.jp/app",
        external: true,
      },
    ],
    ogDescription:
      "コマだけでなく盤面自体を動かす、六角形グリッドの対戦ボードゲーム",
  },
  {
    slug: "tileout",
    name: "TileOut",
    category: "game",
    platforms: ["web"],
    shortDescription:
      "TileOutは、8x8の盤面でタイルをスライドさせて戦う2人対戦の戦略ボードゲームです。互いに異なる移動制限を持つプレイヤーが知略を巡らせ、自分のタイルを10個つなげれば勝利。シンプルなルールから生まれる無限の読み合いが、あなたを待っています。",
    subtitle: "スライドで動かす、戦略ボードゲーム",
    promoText:
      "TileOutは、8x8の盤面でタイルをスライドさせて戦う2人対戦の戦略ボードゲームです。互いに異なる移動制限を持つプレイヤーが知略を巡らせ、自分のタイルを10個つなげれば勝利。シンプルなルールから生まれる無限の読み合いが、あなたを待っています。",
    tags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "1〜2人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    detailTags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "Webアプリ",
      "1〜2人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    storeLinksCard: [
      {
        type: "web",
        url: "https://tileout.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://tileout.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      { label: "今すぐプレイ", url: "https://tileout.riverapp.jp", external: true },
    ],
    ogDescription:
      "タイルをスライドして陣地をつなげる、シンプルで奥深い戦略ボードゲーム",
  },
  {
    slug: "cells",
    name: "CELLS",
    category: "game",
    platforms: ["web"],
    shortDescription:
      "境界なき増殖。最後に生き残るのはどちらか。角も端もない無限の盤面で2つの細胞株が生存をかけて争う、新感覚のリバーシ系戦略ゲームです。32個の細胞を駆使して相手を侵食し、盤面を支配せよ。",
    subtitle: "無限盤面の細胞侵食バトル",
    promoText:
      "境界なき増殖。最後に生き残るのはどちらか。CELLSは、角も端もない無限の盤面で2つの細胞株が生存をかけて争う、新感覚のリバーシ系戦略ゲームです。32個の細胞を駆使して相手を侵食し、盤面を支配せよ。",
    tags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "1〜2人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    detailTags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "Webアプリ",
      "1〜2人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    storeLinksCard: [
      {
        type: "web",
        url: "https://cells.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://cells.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      { label: "今すぐプレイ", url: "https://cells.riverapp.jp", external: true },
    ],
    ogDescription:
      "角も端もない無限盤面で繰り広げられる、新感覚の細胞侵食バトル",
  },
  {
    slug: "puzzlepanel",
    name: "パズルパネル",
    category: "game",
    platforms: ["web"],
    shortDescription:
      "パネルをタップすると周囲3×3が一斉に反転。規定回数ちょうどで目標の形を完成させる、シンプルだけど奥深いロジカルパズルゲームです。全100レベル、段階的に難易度が上昇します。",
    subtitle: "タップで反転、ロジカルパズル",
    promoText:
      "パネルをタップすると周囲3×3が一斉に反転。規定回数ちょうどで目標の形を完成させる、シンプルだけど奥深いロジカルパズルゲームです。全100レベル、4×4から8×8まで段階的に難易度が上昇します。",
    tags: ["日本語のみ", "スマホ/PC両対応", "1人用", "パズルゲーム"],
    detailTags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "Webアプリ",
      "1人用",
      "パズルゲーム",
    ],
    storeLinksCard: [
      {
        type: "web",
        url: "https://puzzlepanel.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://puzzlepanel.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐプレイ",
        url: "https://puzzlepanel.riverapp.jp",
        external: true,
      },
    ],
    ogDescription:
      "タップで反転、規定回数内に目標の形を完成させるロジカルパズル",
  },
  {
    slug: "circletactics",
    name: "CircleTactics",
    category: "game",
    platforms: ["web"],
    shortDescription:
      "○×ゲームを進化させた戦略的ボードゲーム。4人対戦、4×4盤面、3サイズのコマ、2種類の勝利条件で奥深い駆け引きを楽しもう。1人のプレイヤーが3体のAIに挑む、新感覚の頭脳バトルです。",
    subtitle: "○×ゲームを進化させた戦略ボードゲーム",
    promoText:
      "○×ゲームを進化させた戦略的ボードゲーム。4人対戦、4×4盤面、3サイズのコマ、2種類の勝利条件で奥深い駆け引きを楽しもう。1人のプレイヤーが3体のAIに挑む、新感覚の頭脳バトルです。",
    tags: [
      "英語対応",
      "スマホ/PC両対応",
      "1人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    detailTags: [
      "英語対応",
      "スマホ/PC両対応",
      "Webアプリ",
      "1人用",
      "ボードゲーム",
      "戦略ゲーム",
    ],
    storeLinksCard: [
      {
        type: "web",
        url: "https://circle-tactics.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://circle-tactics.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐプレイ",
        url: "https://circle-tactics.riverapp.jp",
        external: true,
      },
    ],
    ogDescription: "○×ゲームを進化させた4人対戦の戦略ボードゲーム",
  },
  {
    slug: "bombcountdown",
    name: "BombCountdown",
    category: "game",
    platforms: ["web"],
    shortDescription:
      "次々と現れる爆弾を、爆発する前にそれぞれの色の箱へ仕分けろ！制限時間内にドラッグで正しい色のゾーンに投げ込む、反射神経と判断力が試されるハイスピードアクションゲームです。",
    subtitle: "爆弾仕分けアクション",
    promoText:
      "次々と現れる爆弾を、爆発する前にそれぞれの色の箱へ仕分けろ！制限時間内にドラッグで正しい色のゾーンに投げ込む、反射神経と判断力が試されるハイスピードアクションゲームです。",
    tags: ["英語対応", "スマホ/PC両対応", "1人用", "アクションゲーム"],
    detailTags: [
      "英語対応",
      "スマホ/PC両対応",
      "Webアプリ",
      "1人用",
      "アクションゲーム",
    ],
    storeLinksCard: [
      {
        type: "web",
        url: "https://color-countdown.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザでプレイ",
        links: [
          {
            type: "web",
            url: "https://color-countdown.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐプレイ",
        url: "https://color-countdown.riverapp.jp",
        external: true,
      },
    ],
    ogDescription:
      "次々現れる爆弾を爆発する前に色別に仕分けろ！究極の判断力アクション",
  },
  {
    slug: "branchnamegenerator",
    name: "Git Branch Name Generator",
    category: "app",
    platforms: ["web"],
    shortDescription:
      "もう「ブランチ名どうしよう…」と悩まない。タスクの説明を入力するだけで、AIが最適なGitブランチ名を5つ提案。日本語入力OK、プレフィックスや命名規則のカスタマイズにも対応した開発効率化ツールです。",
    subtitle: "AIでブランチ名を自動生成",
    promoText:
      "もう「ブランチ名どうしよう…」と悩まない。タスクの説明を入力するだけで、AIが最適なGitブランチ名を5つ提案します。日本語入力OK、プレフィックスや命名規則のカスタマイズにも対応した開発効率化ツールです。",
    tags: ["英語対応", "スマホ/PC両対応", "業務効率化"],
    detailTags: ["英語対応", "スマホ/PC両対応", "Webアプリ", "業務効率化"],
    storeLinksCard: [
      {
        type: "web",
        url: "https://branchnamegenerator.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザで使う",
        links: [
          {
            type: "web",
            url: "https://branchnamegenerator.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐ使う",
        url: "https://branchnamegenerator.riverapp.jp",
        external: true,
      },
    ],
    ogDescription:
      "AIがタスク説明から最適なGitブランチ名を自動生成する開発効率化ツール",
  },
  {
    slug: "xvideodownloader",
    name: "X Video Downloader",
    category: "app",
    platforms: ["web"],
    shortDescription:
      "X（旧Twitter）のポストURLを貼り付けるだけで、動画を簡単にダウンロード。最高画質のMP4を自動選択し、ワンクリックで保存できます。日本語・英語対応、登録不要の無料ツールです。",
    subtitle: "Xの動画をワンクリックで保存",
    promoText:
      "X（旧Twitter）のポストURLを貼り付けるだけで、動画を簡単にダウンロード。最高画質のMP4を自動選択し、ワンクリックで保存できます。登録不要・完全無料の動画保存ツールです。",
    tags: ["英語対応", "スマホ/PC両対応", "業務効率化"],
    detailTags: ["英語対応", "スマホ/PC両対応", "業務効率化"],
    storeLinksCard: [
      {
        type: "web",
        url: "https://x-video-downloader.riverapp.jp",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "今すぐブラウザで使う",
        links: [
          {
            type: "web",
            url: "https://x-video-downloader.riverapp.jp",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐ使う",
        url: "https://x-video-downloader.riverapp.jp",
        external: true,
      },
      {
        label: "FAQ・使い方",
        url: "https://x-video-downloader.riverapp.jp/faq.html",
        external: true,
      },
    ],
    ogDescription:
      "X（旧Twitter）の動画をワンクリックでダウンロードできる無料Webツール",
  },
  {
    slug: "sakamap",
    name: "SakaMap",
    category: "app",
    platforms: ["web", "ios", "android"],
    shortDescription:
      "乃木坂46・櫻坂46・日向坂46の聖地巡礼マップ。聖地を投稿してファン同士で共有・発見できるコミュニティ型マップアプリ。写真投稿やいいね・ブックマーク・コメント機能も。",
    subtitle: "坂道グループの聖地巡礼マップ",
    promoText:
      "乃木坂46・櫻坂46・日向坂46のMV撮影地やロケ地を、ファンみんなで共有・発見できる聖地巡礼マップアプリ。写真付きで投稿したり、いいね・ブックマーク・コメントで盛り上がろう。",
    tags: ["日本語のみ", "スマホ/PC両対応", "推し活", "旅行"],
    detailTags: [
      "日本語のみ",
      "スマホ/PC両対応",
      "iOSアプリ",
      "Androidアプリ",
      "Webアプリ",
      "推し活",
      "旅行",
    ],
    storeLinksCard: [
      {
        type: "app-store",
        url: "https://apps.apple.com/jp/app/id6759653049",
        label: "App Store",
      },
      {
        type: "google-play",
        url: "https://play.google.com/store/apps/details?id=com.sakamap.app",
        label: "Google Play",
      },
      {
        type: "web",
        url: "https://sakamap.com",
        label: "Webアプリ",
      },
    ],
    storeGroupsDetail: [
      {
        label: "ストアからダウンロード",
        links: [
          {
            type: "app-store",
            url: "https://apps.apple.com/jp/app/id6759653049",
            label: "App Store",
          },
          {
            type: "google-play",
            url: "https://play.google.com/store/apps/details?id=com.sakamap.app",
            label: "Google Play",
          },
        ],
      },
      {
        label: "今すぐブラウザで使う",
        links: [
          {
            type: "web",
            url: "https://sakamap.com",
            label: "Webアプリ",
          },
        ],
      },
    ],
    links: [
      {
        label: "今すぐ使う（Web版）",
        url: "https://sakamap.com",
        external: true,
      },
      {
        label: "アプリ版 紹介ページ",
        url: "https://sakamap.com/app",
        external: true,
      },
      {
        label: "このアプリについて",
        url: "https://sakamap.com/about",
        external: true,
      },
      {
        label: "プライバシーポリシー",
        url: "https://sakamap.com/privacy",
        external: true,
      },
      {
        label: "お問い合わせ",
        url: "https://forms.gle/HgbJ9u8WKG9jPovE6",
        external: true,
      },
    ],
    ogDescription:
      "坂道グループの聖地巡礼マップ。MV撮影地やロケ地をファンみんなで共有・発見",
  },
  {
    slug: "widgetmemo",
    name: "QuickNote",
    category: "app",
    platforms: ["ios"],
    shortDescription:
      "ちょっとメモ。ホーム画面やロック画面のウィジェットに常時表示できる、シンプルな一枚メモアプリ。",
    subtitle: "ちょっとメモ。ウィジェットに常時表示できる一枚メモ",
    promoText:
      "「ちょっとメモ。」そんな時に、これだけでいい。ホーム画面やロック画面のウィジェットにメモを常時表示。買い物リスト、電話番号、合言葉——忘れたくない「ちょっとしたこと」を瞬時に確認できます。",
    tags: ["日本語のみ", "iOSアプリ", "ウィジェット", "メモ"],
    detailTags: ["日本語のみ", "iOSアプリ", "ウィジェット", "メモ"],
    storeLinksCard: [
      {
        type: "app-store",
        url: "",
        label: "App Store",
        disabled: true,
      },
    ],
    storeGroupsDetail: [
      {
        label: "ストアからダウンロード",
        links: [
          {
            type: "app-store",
            url: "",
            label: "App Store — 準備中",
            disabled: true,
          },
        ],
      },
    ],
    comingSoon: true,
    ogDescription:
      "ホーム画面やロック画面のウィジェットに常時表示できる、シンプルな一枚メモアプリ",
    documents: [
      { type: "about", appDisplayName: "QuickNote" },
      { type: "contact", appDisplayName: "QuickNote" },
      { type: "privacy-policy", appDisplayName: "QuickNote" },
    ],
  },
];
