'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { routeLocales, defaultLanguage } from '@/app/locales';

function getLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const candidate = segments[0]!.toLowerCase();
  return routeLocales.includes(candidate) ? candidate : null;
}

export default function LanguageSync() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = pathname ? getLocaleFromPath(pathname) : null;
    const target = locale || defaultLanguage;
    if (i18n.language !== target) {
      i18n.changeLanguage(target);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = target;
    }
  }, [pathname, i18n]);

  return null;
}
