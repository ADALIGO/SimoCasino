'use client';

import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export default function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles['spinner-container']} ${styles[size]}`}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading content"}
    >
      <div
        className={styles['spinner']}
        aria-hidden="true"
      />
      {text && (
        <span className={styles['spinner-text']} aria-hidden="true">
          {text}
        </span>
      )}
      <span className="sr-only">{text || "Loading content"}</span>
    </div>
  );
}
