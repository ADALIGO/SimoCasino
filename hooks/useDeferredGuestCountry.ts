'use client';

import { useEffect, useState } from 'react';

const DEFAULT_COUNTRY = 'Morocco';
let cachedGuestCountry: string | null = null;
let pendingFetch: Promise<string> | null = null;

async function loadGuestCountry(): Promise<string> {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('guestCountry');
    if (stored) {
      cachedGuestCountry = stored;
      return stored;
    }
  }

  if (cachedGuestCountry) {
    return cachedGuestCountry;
  }

  if (pendingFetch) {
    return pendingFetch;
  }

  pendingFetch = fetch('/api/geolocation', { cache: 'force-cache' })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Geolocation API failed');
      }

      const data = await response.json();
      const country = (data?.country || DEFAULT_COUNTRY).trim();
      const normalizedCountry = country || DEFAULT_COUNTRY;
      cachedGuestCountry = normalizedCountry;
      
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('guestCountry', normalizedCountry);
      }
      
      return normalizedCountry;
    })
    .catch((error) => {
      console.warn('Guest geolocation fetch failed:', error);
      return DEFAULT_COUNTRY;
    })
    .finally(() => {
      pendingFetch = null;
    });

  return pendingFetch;
}

export function useDeferredGuestCountry(initialCountry: string | null = null) {
  const [guestCountry, setGuestCountry] = useState<string | null>(initialCountry);

  useEffect(() => {
    if (initialCountry) {
      return;
    }

    const callback = () => {
      loadGuestCountry().then(setGuestCountry).catch(() => setGuestCountry(DEFAULT_COUNTRY));
    };

    const requestIdle = (window as any).requestIdleCallback;
    let handle: number;

    if (typeof requestIdle === 'function') {
      handle = requestIdle(callback, { timeout: 500 });
    } else {
      handle = window.setTimeout(callback, 500);
    }

    return () => {
      if (typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, [initialCountry]);

  return guestCountry;
}
