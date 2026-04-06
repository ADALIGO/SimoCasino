'use client';

import { ReactNode } from 'react';
import styles from './HOMEcontent.module.scss';

interface HOMEcontentProps {
  children: ReactNode;
}

export default function HOMEcontent({ children }: HOMEcontentProps) {
  return (
    <main className={styles.content}>
      <div className={styles['content-wrapper']}>{children}</div>
    </main>
  );
}
