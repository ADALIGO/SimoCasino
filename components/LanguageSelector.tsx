'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  supportedLanguages,
  allLanguages,
  routeLocales,
  defaultLanguage,
} from '@/app/locales';
import styles from './LanguageSelector.module.scss';

const MANUAL_LOCALE_COOKIE = 'NEXT_LOCALE_MANUAL';

const languageCountryMap: Record<string, string> = {
  en: 'us',
  ru: 'ru',
  zh: 'cn',
  fr: 'fr',
  de: 'de',
  es: 'es',
  pt: 'pt',
  ar: 'sa',
  hi: 'in',
  ja: 'jp',
  ko: 'kr',
  it: 'it',
  nl: 'nl',
  sv: 'se',
  no: 'no',
  da: 'dk',
  fi: 'fi',
  pl: 'pl',
  tr: 'tr',
  cs: 'cz',
  el: 'gr',
  hu: 'hu',
  he: 'il',
  id: 'id',
  ms: 'my',
  vi: 'vn',
  th: 'th',
  ro: 'ro',
  sk: 'sk',
  bg: 'bg',
  sr: 'rs',
  uk: 'ua',
  hr: 'hr',
  lt: 'lt',
  lv: 'lv',
  et: 'ee',
  sl: 'si',
  ca: 'es-ct',
  ga: 'ie',
  is: 'is',
  mt: 'mt',
  eu: 'eu',
  gl: 'es',
  az: 'az',
  bn: 'bd',
  ur: 'pk',
};

function getLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const candidate = segments[0]!.toLowerCase();
  return routeLocales.includes(candidate) ? candidate : null;
}

function getLanguageFlag(code: string) {
  const countryCode = languageCountryMap[code] || 'xx';
  return `/flags/1x1/${countryCode}.svg`;
}

function buildLocalePath(pathname: string, locale: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && routeLocales.includes(segments[0].toLowerCase())) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join('/')}`;
}

function setManualLocaleCookie(locale: string) {
  document.cookie = `${MANUAL_LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; sameSite=lax`;
}

export default function LanguageSelector() {
  const pathname = usePathname() || '/';
  const query = typeof window !== 'undefined' ? window.location.search.slice(1) : '';
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const currentLocale = getLocaleFromPath(pathname) || defaultLanguage;
  const currentLabel = supportedLanguages.find((lang) => lang.code === currentLocale)?.label || currentLocale.toUpperCase();
  const visibleLanguages = showAll ? allLanguages : supportedLanguages;

  const handleLanguageChange = (locale: string) => {
    const normalized = locale.toLowerCase();
    setManualLocaleCookie(normalized);
    const newPath = buildLocalePath(pathname, normalized);
    const url = query ? `${newPath}?${query}` : newPath;
    window.location.assign(url);
  };

  return (
    <div className={styles.selectorWrapper}>
      <button
        type="button"
        className={styles.selectorButton}
        onClick={() => setIsOpen(true)}
        aria-label={t('language_select_current', { currentLabel }) as string}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {currentLabel}
      </button>

      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="language-selector-title">
          <div className={styles.modal}>
            <div className={styles.header}>
              <span id="language-selector-title" className={styles.modalTitle}>
                {showAll ? t('language_all_languages') : t('language_popular_languages')}
              </span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setIsOpen(false);
                  setShowAll(false);
                }}
                aria-label={t('language_close') as string}
              >
                ×
              </button>
            </div>

            <div className={styles.languageList} role="listbox" aria-label="Available languages">
              {visibleLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className={styles.languageItem}
                  onClick={() => handleLanguageChange(language.code)}
                  role="option"
                  aria-selected={language.code === currentLocale}
                  aria-label={t('language_select_option', { language: language.label }) as string}
                >
                  <img
                    src={getLanguageFlag(language.code)}
                    alt=""
                    width={24}
                    height={18}
                    className={styles.languageFlag}
                    loading="lazy"
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.display = 'none';
                    }}
                    aria-hidden="true"
                  />
                  <span>
                    {language.label}
                    {showAll ? ` (${language.code})` : ''}
                  </span>
                </button>
              ))}
            </div>

            {!showAll && (
              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.moreButton}
                  onClick={() => setShowAll(true)}
                  aria-label="Show all available languages"
                >
                  More languages
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
