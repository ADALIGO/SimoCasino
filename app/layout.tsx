import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://simocasino.com'),
  title: {
    default: 'Simocasino - Best Online Casinos',
    template: '%s | Simocasino',
  },
  applicationName: 'Simocasino',
  description:
    'Discover the best online casinos with our comprehensive platform. Compare bonuses, ratings, and find top-rated casinos.',
  keywords: [
    'online casinos',
    'casino bonuses',
    'casino ratings',
    'best casinos',
    'online gambling',
    'casino reviews',
    'free spins',
    'trusted casino reviews',
    'casino games',
    'slot machines',
    'poker',
    'blackjack',
    'roulette',
    'baccarat',
    'live casino',
    'mobile casino',
    'crypto casino',
    'no deposit bonus',
    'welcome bonus',
    'VIP casino',
  ],
  authors: [
    {
      name: 'Simocasino Team',
      url: 'https://simocasino.com',
    },
  ],
  publisher: 'Simocasino',
  creator: 'Simocasino Team',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Simocasino - Best Online Casinos',
    description:
      'Discover the best online casinos with our comprehensive platform.',
    type: 'website',
    url: 'https://simocasino.com',
    siteName: 'Simocasino',
    images: [
      {
        url: 'https://simocasino.com/images/logo1.jpg',
        width: 1200,
        height: 630,
        alt: 'Simocasino best online casinos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simocasino - Best Online Casinos',
    description:
      'Discover the best online casinos with our comprehensive platform.',
    images: ['https://simocasino.com/images/logo1.jpg'],
  },
  alternates: {
    canonical: 'https://simocasino.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Simocasino',
        url: 'https://simocasino.com',
        description: 'Discover the best online casinos with our comprehensive platform.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://simocasino.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Simocasino',
        url: 'https://simocasino.com',
        logo: 'https://simocasino.com/images/logo1.jpg',
        sameAs: [
          'https://www.facebook.com/simocasino',
          'https://twitter.com/simocasino',
          'https://www.instagram.com/simocasino',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-800-123-4567',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
      },
    ]),
    'html:lang': 'en',
  },
};

import type { ReactNode } from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//picsum.photos" />
        <link rel="dns-prefetch" href="//api.dicebear.com" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var realWarn = console.warn.bind(console);
              console.warn = function(...args) {
                try {
                  var message = args.join(' ');
                  if (message.includes('installHook.js')) {
                    return;
                  }
                } catch (e) {
                  // ignore
                }
                realWarn(...args);
              };
            })();
          `
        }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
