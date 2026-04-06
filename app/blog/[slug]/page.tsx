import { Metadata } from 'next';
import BlogPage from './client';

export async function generateMetadata(pageProps: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { params } = pageProps;
  const resolvedParams = await params;
  return {
    title: `Blog - ${resolvedParams.slug} | Simocasino`,
    description: 'Read our latest casino blog posts and guides.',
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'best-casinos-2024' },
    { slug: 'casino-guide' },
    { slug: 'online-gaming-tips' },
  ];
}

export default async function Page(pageProps: { params: Promise<{ slug: string }> }) {
  const { params } = pageProps;
  const resolvedParams = await params;
  return <BlogPage slug={resolvedParams.slug} />;
}
