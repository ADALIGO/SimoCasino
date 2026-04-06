import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = [
  'en', 'fr', 'de', 'ru', 'zh', 'es', 'pt', 'ar', 'hi', 'ja',
  'ko', 'it', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'tr', 'cs',
  'el', 'hu', 'he', 'id', 'ms', 'vi', 'th', 'ro', 'sk', 'bg',
  'sr', 'uk', 'hr', 'lt', 'lv', 'et', 'sl', 'ca', 'ga', 'is',
  'mt', 'eu', 'gl', 'az', 'bn', 'ur',
];
const MANUAL_LOCALE_COOKIE = 'NEXT_LOCALE_MANUAL';

const COUNTRY_LOCALE_MAP: Record<string, string> = {
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  UA: 'ru',
  CN: 'zh',
  HK: 'zh',
  MO: 'zh',
  SG: 'zh',
  TW: 'zh',
};

function getPathLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const first = segments[0]!.toLowerCase();
  return SUPPORTED_LOCALES.includes(first) ? first : null;
}

function getLocaleFromGeo(country?: string) {
  if (!country) return 'en';
  const normalized = country.toUpperCase();
  return COUNTRY_LOCALE_MAP[normalized] ?? 'en';
}

function stripLocalePrefix(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  const first = segments[0]!.toLowerCase();
  if (SUPPORTED_LOCALES.includes(first)) {
    const withoutLocale = segments.slice(1).join('/');
    return withoutLocale ? `/${withoutLocale}` : '/';
  }
  return pathname;
}

function buildLocalePath(pathname: string, locale: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && SUPPORTED_LOCALES.includes(segments[0].toLowerCase())) {
    segments[0] = locale;
  } else if (pathname !== '/') {
    segments.unshift(locale);
  } else {
    return `/${locale}`;
  }
  return `/${segments.join('/')}`;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/_next/') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2)$/)) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  }

  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    return response;
  }

  const localePrefix = getPathLocale(pathname);
  if (!localePrefix) {
    const manualLocale = request.cookies.get(MANUAL_LOCALE_COOKIE)?.value;
    const requestGeo = request as NextRequest & { geo?: { country?: string } };
    const selectedLocale = manualLocale && SUPPORTED_LOCALES.includes(manualLocale)
      ? manualLocale
      : getLocaleFromGeo(requestGeo.geo?.country);

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = buildLocalePath(pathname, selectedLocale);
    return NextResponse.redirect(redirectUrl);
  }

  const strippedPath = stripLocalePrefix(pathname);
  if (strippedPath !== pathname) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = strippedPath;
    return NextResponse.rewrite(rewriteUrl);
  }

  const response = NextResponse.next();

  // Security Headers for Best Practices
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

  // Performance Headers
  response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400');

  // Remove server header for security
  response.headers.delete('x-powered-by');

  return response;

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
};
