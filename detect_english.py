import json
from pathlib import Path

def has_mostly_english(text):
    if not isinstance(text, str):
        return False
    non_ascii = sum(1 for c in text if ord(c) >= 128)
    return len(text) > 0 and non_ascii < len(text) * 0.3

for locale in ['bn', 'bg', 'az']:
    filepath = Path(f'app/locales/{locale}/translation.json')
    if filepath.exists():
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        total = len(data)
        english_items = {}
        
        def find_english(obj, prefix=''):
            if isinstance(obj, dict):
                for key, val in obj.items():
                    full_key = f'{prefix}.{key}' if prefix else str(key)
                    if isinstance(val, str) and has_mostly_english(val):
                        english_items[full_key] = val
                    elif isinstance(val, dict):
                        find_english(val, full_key)
        
        find_english(data)
        print(f'\n=== {locale.upper()} ===')
        print(f'Total keys: {total}')
        print(f'English entries: {len(english_items)}')

