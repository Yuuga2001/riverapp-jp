export const SUPPORTED_LOCALES = ["ja", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ja";
export const COOKIE_NAME = "locale";

export const LOCALE_NAMES: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

/** Tag translation map: Japanese tag value → translation key */
export const TAG_TRANSLATION_MAP: Record<string, string> = {
  "多言語対応": "tags.multiLanguage",
  "英語対応": "tags.englishSupport",
  "日本語のみ": "tags.japaneseOnly",
  "スマホ/PC両対応": "tags.mobileAndPC",
  "スマホ専用": "tags.mobileOnly",
  "PC専用": "tags.pcOnly",
  "iOSアプリ": "tags.iosApp",
  "Androidアプリ": "tags.androidApp",
  "Webアプリ": "tags.webApp",
  "1人用": "tags.singlePlayer",
  "1〜2人用": "tags.oneToTwo",
  "多人数対応": "tags.multiplayer",
  "オンライン対戦": "tags.onlineBattle",
  "アクションゲーム": "tags.actionGame",
  "パズルゲーム": "tags.puzzleGame",
  "ボードゲーム": "tags.boardGame",
  "戦略ゲーム": "tags.strategyGame",
  "バトルロワイヤル": "tags.battleRoyale",
  "業務効率化": "tags.productivity",
  "推し活": "tags.fandom",
  "旅行": "tags.travel",
  "15言語対応": "tags.fifteenLanguages",
  "ウィジェット": "tags.widget",
  "メモ": "tags.memo",
  "Apple Watch": "tags.appleWatch",
};

/** Store button label translation map */
export const STORE_BUTTON_LABEL_MAP: Record<string, string> = {
  "Webアプリ": "Web App",
  "App Store — 準備中": "App Store — Coming Soon",
};

/** Store group label translation map */
export const STORE_LABEL_MAP: Record<string, string> = {
  "スマホアプリをダウンロード": "storeLabels.downloadMobileApp",
  "今すぐブラウザでプレイ": "storeLabels.playInBrowser",
  "ストアからダウンロード": "storeLabels.downloadFromStore",
  "今すぐブラウザで使う": "storeLabels.useInBrowser",
};
