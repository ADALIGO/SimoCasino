'use client';

import { ReactNode, memo } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import './i18n';
import LanguageSync from '@/components/LanguageSync';

interface ProvidersProps {
  children: ReactNode;
}

// Memoize LanguageSync to prevent unnecessary re-renders
const LanguageSyncMemo = memo(LanguageSync);

const ProvidersComponent = memo(function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <LanguageSyncMemo />
      {children}
    </Provider>
  );
});

export { ProvidersComponent as Providers };
