import en from './en/translation.json';
import ru from './ru/translation.json';
import zh from './zh/translation.json';
import fr from './fr/translation.json';
import de from './de/translation.json';
import es from './es/translation.json';
import pt from './pt/translation.json';
import ar from './ar/translation.json';
import hi from './hi/translation.json';
import ja from './ja/translation.json';
import ko from './ko/translation.json';
import it from './it/translation.json';
import nl from './nl/translation.json';
import sv from './sv/translation.json';
import no from './no/translation.json';
import da from './da/translation.json';
import fi from './fi/translation.json';
import pl from './pl/translation.json';
import tr from './tr/translation.json';
import cs from './cs/translation.json';
import el from './el/translation.json';
import hu from './hu/translation.json';
import he from './he/translation.json';
import id from './id/translation.json';
import ms from './ms/translation.json';
import vi from './vi/translation.json';
import th from './th/translation.json';
import ro from './ro/translation.json';
import sk from './sk/translation.json';
import bg from './bg/translation.json';
import sr from './sr/translation.json';
import uk from './uk/translation.json';
import hr from './hr/translation.json';
import lt from './lt/translation.json';
import lv from './lv/translation.json';
import et from './et/translation.json';
import sl from './sl/translation.json';
import ca from './ca/translation.json';
import ga from './ga/translation.json';
import is from './is/translation.json';
import mt from './mt/translation.json';
import eu from './eu/translation.json';
import gl from './gl/translation.json';
import az from './az/translation.json';
import bn from './bn/translation.json';
import ur from './ur/translation.json';

export const resources = {
  en: { translation: en },
  ru: { translation: ru },
  zh: { translation: zh },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
  pt: { translation: pt },
  ar: { translation: ar },
  hi: { translation: hi },
  ja: { translation: ja },
  ko: { translation: ko },
  it: { translation: it },
  nl: { translation: nl },
  sv: { translation: sv },
  no: { translation: no },
  da: { translation: da },
  fi: { translation: fi },
  pl: { translation: pl },
  tr: { translation: tr },
  cs: { translation: cs },
  el: { translation: el },
  hu: { translation: hu },
  he: { translation: he },
  id: { translation: id },
  ms: { translation: ms },
  vi: { translation: vi },
  th: { translation: th },
  ro: { translation: ro },
  sk: { translation: sk },
  bg: { translation: bg },
  sr: { translation: sr },
  uk: { translation: uk },
  hr: { translation: hr },
  lt: { translation: lt },
  lv: { translation: lv },
  et: { translation: et },
  sl: { translation: sl },
  ca: { translation: ca },
  ga: { translation: ga },
  is: { translation: is },
  mt: { translation: mt },
  eu: { translation: eu },
  gl: { translation: gl },
  az: { translation: az },
  bn: { translation: bn },
  ur: { translation: ur },
};

export const defaultLanguage = 'en';

export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ar', label: 'العربية' },
  { code: 'ja', label: '日本語' },
  { code: 'hi', label: 'हिन्दी' },
];

export const allLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'sv', label: 'Svenska' },
  { code: 'no', label: 'Norsk' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'pl', label: 'Polski' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'cs', label: 'Čeština' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'hu', label: 'Magyar' },
  { code: 'he', label: 'עברית' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'ro', label: 'Română' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'bg', label: 'Български' },
  { code: 'sr', label: 'Српски' },
  { code: 'uk', label: 'Українська' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'lt', label: 'Lietuvių' },
  { code: 'lv', label: 'Latviešu' },
  { code: 'et', label: 'Eesti' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'ca', label: 'Català' },
  { code: 'ga', label: 'Gaeilge' },
  { code: 'is', label: 'Íslenska' },
  { code: 'mt', label: 'Malti' },
  { code: 'eu', label: 'Euskara' },
  { code: 'gl', label: 'Galego' },
  { code: 'az', label: 'Azərbaycan dili' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ur', label: 'اردو' },
];

export const routeLocales = allLanguages.map((language) => language.code);
