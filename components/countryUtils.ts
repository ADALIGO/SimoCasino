export const countryToCode: { [key: string]: string } = {
  'United States': 'us',
  'United Kingdom': 'gb',
  'Canada': 'ca',
  'Australia': 'au',
  'Germany': 'de',
  'France': 'fr',
  'Netherlands': 'nl',
  'Japan': 'jp',
  'Singapore': 'sg',
  'Ireland': 'ie',
  'Morocco': 'ma',
  'Spain': 'es',
  'Italy': 'it',
  'Portugal': 'pt',
  'Belgium': 'be',
  'Switzerland': 'ch',
  'Austria': 'at',
  'Sweden': 'se',
  'Norway': 'no',
  'Denmark': 'dk',
  'Finland': 'fi',
  'Poland': 'pl',
  'Czech Republic': 'cz',
  'Hungary': 'hu',
  'Greece': 'gr',
  'Turkey': 'tr',
  'Russia': 'ru',
  'China': 'cn',
  'India': 'in',
  'Brazil': 'br',
  'Mexico': 'mx',
  'Argentina': 'ar',
  'South Africa': 'za',
  'Egypt': 'eg',
  'United Arab Emirates': 'ae',
  'Saudi Arabia': 'sa',
  'Israel': 'il',
  'Thailand': 'th',
  'Malaysia': 'my',
  'Indonesia': 'id',
  'Philippines': 'ph',
  'Vietnam': 'vn',
  'South Korea': 'kr',
  'New Zealand': 'nz',
};

const aliases: Record<string, string> = {
  'morocco': 'ma',
  'marocco': 'ma',
  'united states': 'us',
  'united states of america': 'us',
  'usa': 'us',
  'uk': 'gb',
  'united kingdom': 'gb',
  'korea': 'kr',
  'south korea': 'kr',
};

const iso3: Record<string, string> = {
  mar: 'ma',
  usa: 'us',
  gbr: 'gb',
  can: 'ca',
  aus: 'au',
  deu: 'de',
  fra: 'fr',
  esp: 'es',
  ita: 'it',
};

export const normalizeInputCountry = (countryName: string): string =>
  countryName.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[^a-z ]/g, '');

export const getCountryCode = (countryName: string): string | null => {
  const normalized = normalizeInputCountry(countryName);

  if (/^[a-z]{2}$/.test(normalized)) return normalized;

  if (iso3[normalized]) return iso3[normalized];

  const byFullName = Object.keys(countryToCode).find(
    (key) => normalizeInputCountry(key) === normalized
  );
  if (byFullName) return countryToCode[byFullName] || null;

  if (aliases[normalized]) return aliases[normalized];

  return null;
};

export const getCountryName = (input: string): string | null => {
  const normalized = normalizeInputCountry(input);

  const byCode = Object.keys(countryToCode).find(
    (key) => countryToCode[key] === normalized
  );
  if (byCode) return byCode;

  const byFullName = Object.keys(countryToCode).find(
    (key) => normalizeInputCountry(key) === normalized
  );
  if (byFullName) return byFullName;

  if (aliases[normalized]) {
    const code = aliases[normalized];
    return Object.keys(countryToCode).find((key) => countryToCode[key] === code) || null;
  }

  return null;
};

export const shouldCasinoBeAcceptable = (
  candidateCountry: string | null | undefined,
  operatingCountries: string[] = []
): boolean | null => {
  if (!candidateCountry) return null;

  const resolvedName = getCountryName(candidateCountry) || candidateCountry;
  if (!resolvedName) return null;

  return operatingCountries.some(
    (c) => normalizeInputCountry(c) === normalizeInputCountry(resolvedName)
  );
};
