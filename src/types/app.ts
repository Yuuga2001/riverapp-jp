export type AppCategory = "game" | "app";
export type Platform = "web" | "ios" | "android";

export interface StoreLink {
  type: "app-store" | "google-play" | "web";
  url: string;
  label: string;
  disabled?: boolean;
}

export interface StoreGroup {
  label: string;
  links: StoreLink[];
}

export interface ExternalLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface AppDocument {
  type: "about" | "contact" | "privacy-policy";
  appDisplayName: string;
}

export interface App {
  slug: string;
  name: string;
  category: AppCategory;
  platforms: Platform[];
  shortDescription: string;
  subtitle: string;
  promoText: string;
  tags: string[];
  detailTags: string[];
  storeLinksCard: StoreLink[];
  storeGroupsDetail: StoreGroup[];
  links?: ExternalLink[];
  comingSoon?: boolean;
  ogDescription?: string;
  documents?: AppDocument[];
}
