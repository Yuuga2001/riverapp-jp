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

// --- Document types for data-driven app pages ---

export interface AboutFeature {
  name: string;
  desc: string;
}

export interface AboutInfo {
  key: string;
  value: string;
}

export interface AboutLink {
  label: string;
  href: string;
  internal?: boolean;
  external?: boolean;
}

export interface AboutDocument {
  catchcopy: string;
  subcopy: string;
  features: AboutFeature[];
  info: AboutInfo[];
  links: AboutLink[];
}

export interface ContactMethod {
  label: string;
  description: string;
  url: string;
  external: boolean;
}

export interface ContactDocument {
  methods: ContactMethod[];
}

export interface PrivacySection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface PrivacyPolicyDocument {
  sections: PrivacySection[];
  lastUpdated: string;
}

export interface AppDocuments {
  appDisplayName: string;
  about?: AboutDocument;
  contact?: ContactDocument;
  "privacy-policy"?: PrivacyPolicyDocument;
}

/** English translations for app content fields */
export interface AppEnContent {
  name?: string;
  shortDescription?: string;
  subtitle?: string;
  promoText?: string;
  description?: string;
  ogDescription?: string;
  /** Map of Japanese link label → English label */
  linkLabels?: Record<string, string>;
  /** English document translations (same structure as AppDocuments) */
  documents?: AppDocuments;
}

// --- Main App type ---

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
  createdAt: string;
  ogDescription?: string;
  description?: string;
  documents?: AppDocuments;
  en?: AppEnContent;
}
