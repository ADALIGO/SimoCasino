const fs = require('fs');
const path = require('path');
const localesDir = path.join(process.cwd(), 'app', 'locales');
const allLanguages = [
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
const enPath = path.join(localesDir, 'en', 'translation.json');
if (!fs.existsSync(enPath)) {
  throw new Error('en translation.json does not exist');
}
const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
for (const lang of allLanguages) {
  const langDir = path.join(localesDir, lang.code);
  if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
  const targetPath = path.join(langDir, 'translation.json');
  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, JSON.stringify(enJson, null, 2) + '\n', 'utf8');
  }
}
const supportedLanguages = [
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
const imports = allLanguages.map(lang => `import ${lang.code} from './${lang.code}/translation.json';`).join('\n');
const resourcesEntries = allLanguages.map(lang => `  ${lang.code}: { translation: ${lang.code} },`).join('\n');
const supportedLines = supportedLanguages.map(lang => `  { code: '${lang.code}', label: '${lang.label}' },`).join('\n');
const allLines = allLanguages.map(lang => `  { code: '${lang.code}', label: '${lang.label}' },`).join('\n');
const fileContent = `${imports}\n\nexport const resources = {\n${resourcesEntries}\n};\n\nexport const defaultLanguage = 'en';\n\nexport const supportedLanguages = [\n${supportedLines}\n];\n\nexport const allLanguages = [\n${allLines}\n];\n\nexport const routeLocales = allLanguages.map((language) => language.code);\n`;
fs.writeFileSync(path.join(localesDir, 'index.ts'), fileContent, 'utf8');
console.log('Created locale folders/files and updated app/locales/index.ts');
