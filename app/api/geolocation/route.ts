/* eslint-disable no-unused-vars */
import { NextResponse } from 'next/server';

const DEFAULT_COUNTRY = 'Morocco';
const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
};

function getClientIp(request: Request) {
  const headerKeys = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'true-client-ip',
    'x-vercel-forwarded-for',
  ];

  for (const key of headerKeys) {
    const value = request.headers.get(key);
    if (!value) continue;

    const ip = value.split(',')[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  return undefined;
}

async function tryFetchCountry(url: string, parse: (_response: Response) => Promise<string | null>) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json, text/plain',
      'User-Agent': 'Next.js Geolocation Proxy',
    },
  });

  return parse(response);
}

async function getCountryForIp(clientIp?: string) {
  const provider = {
    url: `https://ip-api.com/json/${clientIp || ''}?fields=country,status,message`,
    parse: async (response: Response) => {
      if (!response.ok) {
        throw new Error(`ip-api.com responded ${response.status}`);
      }
      const data = await response.json();
      if (data?.status !== 'success') {
        throw new Error(`ip-api.com failed: ${data?.message || 'unknown'}`);
      }
      return (data?.country || '').trim() || null;
    },
  };

  try {
    const country = await tryFetchCountry(provider.url, provider.parse);
    if (country) {
      return country;
    }
  } catch (error) {
    console.warn('Geolocation provider failed:', error);
  }

  return DEFAULT_COUNTRY;
}

export async function GET(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const country = await getCountryForIp(clientIp);

    return NextResponse.json(
      { country },
      {
        headers: CACHE_HEADERS,
      }
    );
  } catch (error) {
    console.warn('Geolocation fallback activated:', error);
    return NextResponse.json(
      { country: DEFAULT_COUNTRY },
      {
        headers: CACHE_HEADERS,
      }
    );
  }
}
