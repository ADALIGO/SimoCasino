import { Metadata } from 'next';
import GuidePageClient from './client';

export async function generateMetadata(pageProps: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { params } = pageProps;
  const resolvedParams = await params;
  return {
    title: `Guide - ${resolvedParams.slug} | Simocasino`,
    description: 'Learn casino strategies, rules, and tips.',
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'how-to-play-slots' },
    { slug: 'casino-bonuses-explained' },
    { slug: 'responsible-gambling' },
    { slug: 'blackjack-strategy' },
  ];
}

export default async function Page(pageProps: { params: Promise<{ slug: string }> }) {
  const { params } = pageProps;
  const resolvedParams = await params;
  return <GuidePageClient slug={resolvedParams.slug} />;
}
