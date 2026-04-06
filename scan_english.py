import json
import re

files = {
    'az': 'app/locales/az/translation.json',
    'bg': 'app/locales/bg/translation.json',
    'bn': 'app/locales/bn/translation.json'
}

def is_likely_english(text):
    """Check if text looks like English"""
    if not isinstance(text, str) or len(text.strip()) <= 1:
        return False
    
    # Skip template variables
    if re.search(r'\{\{.*?\}\}', text):
        return False
    
    # Skip if it's mostly non-ASCII (likely already translated)
    ascii_ratio = sum(1 for c in text if ord(c) < 128) / len(text)
    
    # More than 70% ASCII likely indicates English
    return ascii_ratio > 0.7

for lang, path in files.items():
    print(f"\n{'='*60}")
    print(f"English values in {lang}:")
    print('='*60)
    
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    english_items = []
    for k, v in data.items():
        if is_likely_english(v):
            english_items.append((k, v))
    
    if english_items:
        for k, v in sorted(english_items):
            print(f"  {k}: {v}")
        print(f"\nTotal: {len(english_items)}")
    else:
        print("  (none found)")
