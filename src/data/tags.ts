export interface TagCategory {
  id: string;
  label: string;
  tags: string[];
}

export const tagCategories: TagCategory[] = [
  {
    id: "language",
    label: "言語",
    tags: ["多言語対応", "英語対応", "日本語のみ"],
  },
  {
    id: "device",
    label: "端末",
    tags: ["スマホ/PC両対応", "スマホ専用", "PC専用"],
  },
  {
    id: "platform",
    label: "プラットフォーム",
    tags: ["iOSアプリ", "Androidアプリ", "Webアプリ"],
  },
  {
    id: "players",
    label: "人数",
    tags: ["1人用", "1〜2人用", "多人数対応"],
  },
  {
    id: "genre",
    label: "種類",
    tags: [
      "オンライン対戦",
      "アクションゲーム",
      "パズルゲーム",
      "ボードゲーム",
      "戦略ゲーム",
      "バトルロワイヤル",
      "業務効率化",
      "推し活",
      "旅行",
    ],
  },
];
