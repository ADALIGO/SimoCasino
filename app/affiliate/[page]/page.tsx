import HOMELayouts from '@/app/layouts/HOMELayouts';
import styles from '../AffiliatePage.module.scss';

const AFFILIATE_PAGES: Record<string, { title: string; description: string }> = {
  links: {
    title: 'Affiliate Links',
    description: 'Create and manage your affiliate tracking links and landing pages.',
  },
  payouts: {
    title: 'Payout Settings',
    description: 'Configure your payout methods, thresholds, and withdrawal details.',
  },
  tools: {
    title: 'Marketing Tools',
    description: 'Access banners, creatives, and promotional assets for your campaigns.',
  },
  reports: {
    title: 'Performance Reports',
    description: 'Review your conversions, clicks, and revenue trends over time.',
  },
  referrals: {
    title: 'Referral Program',
    description: 'Track referral status, bonuses, and incentive special offers.',
  },
};

interface AffiliatePageProps {
  params: Promise<{ page: string }>;
}

export default async function AffiliatePage({ params }: AffiliatePageProps) {
  const resolvedParams = await params;
  const page = resolvedParams.page.toLowerCase();
  const definition = AFFILIATE_PAGES[page] || {
    title: `${page.replace(/[-_]/g, ' ')}`,
    description: 'This affiliate page is under construction. Check back soon for new tools.',
  };

  return (
    <HOMELayouts>
      <div className={styles.affiliateContainer}>
        <h1>{definition.title}</h1>
        <p>{definition.description}</p>
      </div>
    </HOMELayouts>
  );
}
