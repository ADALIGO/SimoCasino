'use client';

import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './blog.module.scss';

interface BlogPageProps {
  slug: string;
}

const blogPosts: Record<string, any> = {
  'best-casinos-2024': {
    title: 'Best Online Casinos 2024',
    date: 'March 24, 2024',
    author: 'Simocasino Team',
    content: `
      <h2>Discover the Top-Rated Online Casinos</h2>
      <p>Online casinos have evolved significantly over the past few years. Today's players have access to more options than ever before, each offering unique bonuses, games, and features.</p>
      
      <h3>What Makes a Casino Great?</h3>
      <p>The best online casinos combine several key factors:</p>
      <ul>
        <li>Generous welcome bonuses</li>
        <li>Wide variety of games</li>
        <li>Secure payment methods</li>
        <li>Excellent customer support</li>
        <li>Responsive mobile platform</li>
      </ul>
      
      <p>Our comprehensive guides and reviews help you find the perfect casino for your gaming preferences.</p>
    `,
  },
  'casino-guide': {
    title: 'Complete Casino Player Guide',
    date: 'March 20, 2024',
    author: 'Gaming Expert',
    content: `
      <h2>Everything You Need to Know About Online Casinos</h2>
      <p>Whether you're new to online gambling or an experienced player, this guide covers the essentials.</p>
      
      <h3>Getting Started</h3>
      <p>Follow these steps to begin your online casino journey safely and responsibly.</p>
      
      <h3>Responsible Gaming</h3>
      <p>Remember to gamble responsibly and within your means.</p>
    `,
  },
  'online-gaming-tips': {
    title: 'Pro Tips for Online Gaming',
    date: 'March 15, 2024',
    author: 'Casino Advisor',
    content: `
      <h2>Maximize Your Gaming Experience</h2>
      <p>Learn insider tips and strategies to enhance your online casino experience.</p>
      
      <h3>Bankroll Management</h3>
      <p>Proper money management is crucial for long-term success.</p>
      
      <h3>Game Selection</h3>
      <p>Choose games wisely based on your skill level and preferences.</p>
    `,
  },
};

export default function BlogPage({ slug }: BlogPageProps) {
  const post = blogPosts[slug];

  if (!post) {
    return (
      <HOMELayouts>
        <div className={styles['blog-page']}>
          <p className={styles['not-found']}>Blog post not found.</p>
        </div>
      </HOMELayouts>
    );
  }

  return (
    <HOMELayouts>
      <div className={styles['blog-page']}>
        <article className={styles['blog-post']}>
          <header className={styles['post-header']}>
            <h1 className={styles['post-title']}>{post.title}</h1>
            <div className={styles['post-meta']}>
              <span className={styles['author']}>By {post.author}</span>
              <span className={styles['date']}>{post.date}</span>
            </div>
          </header>

          <div
            className={styles['post-content']}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className={styles['post-footer']}>
            <p>Share this article on your favorite social media platform.</p>
          </footer>
        </article>
      </div>
    </HOMELayouts>
  );
}
