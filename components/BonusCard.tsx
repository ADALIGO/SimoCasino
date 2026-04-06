import styles from './BonusCard.module.scss';

interface BonusCardProps {
  amount: string;
  type: string;
  description: string;
}

export default function BonusCard({
  amount,
  type,
  description,
}: BonusCardProps) {
  return (
    <div className={styles['bonus-card']}>
      <p className={styles['bonus-amount']}>{amount}</p>
      <p className={styles['bonus-type']}>{type}</p>
      <p className={styles['bonus-description']}>{description}</p>
    </div>
  );
}
