import Link from 'next/link';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './page.module.scss';

// Enable ISR caching for 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'Blog | Simocasino',
  description: 'Read our latest casino guides, tips, and news.',
};

const blogPosts = [
  {
    slug: 'best-casinos-2024',
    title: 'Best Online Casinos 2024',
    excerpt: 'Discover the top-rated online casinos with exclusive bonuses and reviews.',
    date: 'March 24, 2024',
    category: 'Reviews',
  },
  {
    slug: 'casino-guide',
    title: 'Complete Casino Player Guide',
    excerpt: 'Everything you need to know about online casinos and responsible gaming.',
    date: 'March 20, 2024',
    category: 'Guide',
  },
  {
    slug: 'online-gaming-tips',
    title: 'Pro Tips for Online Gaming',
    excerpt: 'Learn insider tips and strategies to enhance your gaming experience.',
    date: 'March 15, 2024',
    category: 'Tips',
  },
];

export default function BlogIndexPage() {
  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <div className={styles['blog-index']}>
        <h1 className={styles['page-title']}>Simocasino Blog</h1>
        <p className={styles['page-subtitle']}>
          Latest news, guides, and tips about online casinos
        </p>

        <div className={styles['posts-grid']}>
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className={styles['post-card']}>
                <span className={styles['category']}>{post.category}</span>
                <h2 className={styles['post-title']}>{post.title}</h2>
                <p className={styles['excerpt']}>{post.excerpt}</p>
                <span className={styles['date']}>{post.date}</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </HOMELayouts>
  );
}
