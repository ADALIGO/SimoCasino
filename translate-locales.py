import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

LOCALES_DIR = Path('app/locales')
EN_FILE = LOCALES_DIR / 'en' / 'translation.json'
LANGUAGE_CODES = [
    'en','ru','zh','fr','de','es','pt','ar','hi','ja','ko','it','nl','sv','no','da','fi','pl','tr',
    'cs','el','hu','he','id','ms','vi','th','ro','sk','bg','sr','uk','hr','lt','lv','et','sl','ca',
    'ga','is','mt','eu','gl','az','bn','ur'
]

if not EN_FILE.exists():
    raise FileNotFoundError(f'English source file not found: {EN_FILE}')

with EN_FILE.open('r', encoding='utf-8') as f:
    source_data = json.load(f)

keys = list(source_data.keys())
values = [source_data[key] for key in keys]

print(f'Translating {len(keys)} keys into {len(LANGUAGE_CODES)} languages...')

for code in LANGUAGE_CODES:
    target_dir = LOCALES_DIR / code
    target_dir.mkdir(parents=True, exist_ok=True)
    target_file = target_dir / 'translation.json'

    if code == 'en':
        with target_file.open('w', encoding='utf-8') as out:
            json.dump(source_data, out, ensure_ascii=False, indent=2)
            out.write('\n')
        print(f'Wrote English source to {target_file}')
        continue

    print(f'Translating {code}...')
    delimiter = '\n<<<123>>>\n'
    text_block = delimiter.join(values)
    params = [
        ('client', 'gtx'),
        ('sl', 'en'),
        ('tl', code),
        ('dt', 't'),
        ('q', text_block),
    ]

    url = 'https://translate.googleapis.com/translate_a/single?' + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

    with urllib.request.urlopen(request, timeout=60) as response:
        raw = response.read().decode('utf-8')
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise RuntimeError(f'Failed to decode translation response for {code}: {exc}\n{raw}')

    if not data or not isinstance(data, list) or not data[0]:
        raise RuntimeError(f'Unexpected translation response format for {code}: {data}')

    result_text = ''.join(item[0] for item in data[0] if item and isinstance(item, list) and len(item) > 0 and item[0] is not None)
    translated = result_text.split(delimiter)

    if len(translated) != len(values):
        raise RuntimeError(f'Translation count mismatch for {code}: expected {len(values)}, got {len(translated)}')

    result = {key: translated[i] for i, key in enumerate(keys)}
    with target_file.open('w', encoding='utf-8') as out:
        json.dump(result, out, ensure_ascii=False, indent=2)
        out.write('\n')

    print(f'Wrote {target_file}')
    time.sleep(1)

print('Translation complete.')
