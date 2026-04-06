'use client';

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styles from './TopLoadingBar.module.scss';

export default function TopLoadingBar() {
  const showLoadingBar = useSelector(
    (state: RootState) => state.ui.showTopLoadingBar
  );

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const progressTimer = useRef<number | null>(null);

  const stopProgress = () => {
    if (progressTimer.current !== null) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  };

  useEffect(() => {
    const setHeaderOffset = () => {
      const header = document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        setTopOffset(rect.bottom);
      } else {
        setTopOffset(0);
      }
    };

    setHeaderOffset();
    window.addEventListener('resize', setHeaderOffset);

    return () => {
      window.removeEventListener('resize', setHeaderOffset);
    };
  }, []);

  useEffect(() => {
    if (showLoadingBar) {
      setVisible(true);
      setProgress(2);

      stopProgress();
      progressTimer.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          const next = prev + Math.random() * 7;
          return Math.min(90, next);
        });
      }, 180);

      return;
    }

    if (!showLoadingBar && visible) {
      stopProgress();
      setProgress(100);

      const hideTimer = window.setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 240);

      return () => {
        window.clearTimeout(hideTimer);
      };
    }

    return;
  }, [showLoadingBar, visible]);

  return (
    <div
      className={styles['loading-wrapper']}
      style={{ top: `${topOffset}px`, opacity: visible ? 1 : 0 }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading progress"
    >
      <div
        className={styles['loading-bar']}
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />
    </div>
  );
}

