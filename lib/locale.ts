import { routeLocales, defaultLanguage } from '@/app/locales';

export function getLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const candidate = segments[0]!.toLowerCase();
  return routeLocales.includes(candidate) ? candidate : null;
}

export function stripLocalePrefix(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (segments[0] && routeLocales.includes(segments[0].toLowerCase())) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

export function buildLocalePath(pathname: string, locale: string) {
  const normalizedLocale = locale.toLowerCase();
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && routeLocales.includes(segments[0].toLowerCase())) {
    segments[0] = normalizedLocale;
  } else {
    segments.unshift(normalizedLocale);
  }
  return `/${segments.join('/')}`;
}

export function preserveLocalePath(currentPath: string, href: string) {
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//')) {
    return href;
  }

  const currentLocale = getLocaleFromPath(currentPath) || defaultLanguage;
  const normalizedHref = href.startsWith('/') ? href : `/${href}`;
  const hrefLocale = getLocaleFromPath(normalizedHref);
  if (hrefLocale) {
    return normalizedHref;
  }

  const strippedHref = normalizedHref.replace(/^\/+/, '');
  const localizedPath = `/${currentLocale}/${strippedHref}`;
  return localizedPath.replace(/\/\/{2,}/g, '/');
}
