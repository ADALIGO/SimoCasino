'use client';

import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from './guide.module.scss';

interface GuidePageClientProps {
  slug: string;
}

const guides: Record<string, any> = {
  'how-to-play-slots': {
    title: 'How to Play Slots',
    difficulty: 'Beginner',
    readTime: '5 min read',
    content: `
      <h2>Getting Started with Slot Machines</h2>
      <p>Slot machines are one of the most popular casino games worldwide. They're simple to play and don't require any special skills.</p>
      
      <h3>Basic Rules</h3>
      <ul>
        <li>Choose your bet amount</li>
        <li>Click the spin button</li>
        <li>Match symbols to win</li>
        <li>Enjoy bonus features</li>
      </ul>
      
      <h3>Types of Slots</h3>
      <p>There are many types of slot machines available online:</p>
      <ul>
        <li><strong>Classic Slots:</strong> Simple 3-reel games</li>
        <li><strong>Video Slots:</strong> Advanced graphics and features</li>
        <li><strong>Progressive Slots:</strong> Growing jackpots</li>
      </ul>
      
      <h3>Tips for Playing</h3>
      <p>Always play within your budget and enjoy the game responsibly.</p>
    `,
  },
  'casino-bonuses-explained': {
    title: 'Casino Bonuses Explained',
    difficulty: 'Beginner',
    readTime: '7 min read',
    content: `
      <h2>Understanding Casino Bonuses</h2>
      <p>Casino bonuses are rewards that casinos offer to attract and retain players. Understanding them is crucial before playing.</p>
      
      <h3>Types of Bonuses</h3>
      <ul>
        <li><strong>Welcome Bonus:</strong> First-time player offer</li>
        <li><strong>Free Spins:</strong> Complimentary spins on slots</li>
        <li><strong>Reload Bonus:</strong> Bonus on subsequent deposits</li>
        <li><strong>Cashback:</strong> Refund on losses</li>
      </ul>
      
      <h3>Wagering Requirements</h3>
      <p>Most bonuses come with wagering requirements. This means you must play the bonus amount multiple times before withdrawing.</p>
    `,
  },
  'responsible-gambling': {
    title: 'Responsible Gambling',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    content: `
      <h2>Gamble Responsibly</h2>
      <p>Responsible gambling is essential for enjoying online casinos safely and sustainably.</p>
      
      <h3>Key Principles</h3>
      <ul>
        <li>Set a budget you can afford to lose</li>
        <li>Take regular breaks</li>
        <li>Never chase losses</li>
        <li>Manage your time</li>
      </ul>
      
      <h3>Warning Signs</h3>
      <p>Be aware of signs of problem gambling and seek help if needed.</p>
      
      <h3>Support Resources</h3>
      <p>If you or someone you know struggles with gambling, support is available.</p>
    `,
  },
  'blackjack-strategy': {
    title: 'Blackjack Strategy Guide',
    difficulty: 'Intermediate',
    readTime: '10 min read',
    content: `
      <h2>Master Blackjack</h2>
      <p>Blackjack is one of the most strategic casino games available.</p>
      
      <h3>Basic Strategy</h3>
      <p>Learn the optimal decisions for every hand combination.</p>
      
      <h3>Card Counting</h3>
      <p>Understand card counting concepts and how they apply online.</p>
      
      <h3>Bankroll Management</h3>
      <p>Proper bankroll management is crucial for long-term success.</p>
    `,
  },
};

export default function GuidePageClient({ slug }: GuidePageClientProps) {
  const guide = guides[slug];

  if (!guide) {
    return (
      <HOMELayouts>
        <div className={styles['guide-page']}>
          <p className={styles['not-found']}>Guide not found.</p>
        </div>
      </HOMELayouts>
    );
  }

  return (
    <HOMELayouts>
      <div className={styles['guide-page']}>
        <article className={styles['guide-article']}>
          <header className={styles['guide-header']}>
            <h1 className={styles['guide-title']}>{guide.title}</h1>
            <div className={styles['guide-meta']}>
              <span className={styles.difficulty}>{guide.difficulty}</span>
              <span className={styles['read-time']}>{guide.readTime}</span>
            </div>
          </header>

          <div
            className={styles['guide-content']}
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          <footer className={styles['guide-footer']}>
            <p>
              Have questions? Contact our support team or visit our FAQs.
            </p>
          </footer>
        </article>
      </div>
    </HOMELayouts>
  );
}
