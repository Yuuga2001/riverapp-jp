"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Locale } from "./config";
import type { App } from "@/types/app";
import { COOKIE_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";
import jaTranslations from "./translations/ja.json";

type TranslationValue = string | Record<string, unknown> | unknown[];
type Translations = Record<string, TranslationValue>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: Translations, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc == null) return undefined;
    if (Array.isArray(acc)) {
      const idx = parseInt(part, 10);
      return Number.isNaN(idx) ? undefined : acc[idx];
    }
    if (typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const cookie = getCookie(COOKIE_NAME);
  if (cookie && SUPPORTED_LOCALES.includes(cookie as Locale)) {
    return cookie as Locale;
  }
  return DEFAULT_LOCALE;
}

const translationCache = new Map<Locale, Translations>();
translationCache.set("ja", jaTranslations as Translations);

async function loadTranslations(locale: Locale): Promise<Translations> {
  const cached = translationCache.get(locale);
  if (cached) return cached;

  if (locale === "en") {
    const mod = await import("./translations/en.json");
    const translations = mod.default as Translations;
    translationCache.set(locale, translations);
    return translations;
  }

  return jaTranslations as Translations;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<Translations>(
    jaTranslations as Translations
  );
  const [mounted, setMounted] = useState(false);

  // On mount, read cookie and load translations
  useEffect(() => {
    const initial = getInitialLocale();
    if (initial !== DEFAULT_LOCALE) {
      setLocaleState(initial);
      loadTranslations(initial).then(setTranslations);
    }
    setMounted(true);
  }, []);

  // Update html lang when locale changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(COOKIE_NAME, newLocale);
    loadTranslations(newLocale).then(setTranslations);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      let value = getNestedValue(translations, key);

      // Fallback to Japanese
      if (value === undefined) {
        value = getNestedValue(jaTranslations as Translations, key);
      }

      if (typeof value !== "string") return key;

      // Variable interpolation: {name} → value
      if (vars) {
        return value.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
      }
      return value;
    },
    [translations]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslation() {
  const { t } = useI18n();
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}

/** Returns a localized copy of the app — English fields override Japanese when locale is "en" */
export function useLocalizedApp(app: App): App {
  const { locale } = useI18n();
  if (locale === "en" && app.en) {
    const localized = { ...app, ...app.en };
    // Translate link labels if linkLabels map is provided
    if (app.en.linkLabels && app.links) {
      localized.links = app.links.map((link) => ({
        ...link,
        label: app.en!.linkLabels![link.label] ?? link.label,
      }));
    }
    // Merge English documents over Japanese documents
    if (app.en.documents && app.documents) {
      localized.documents = { ...app.documents, ...app.en.documents };
    }
    return localized;
  }
  return app;
}
