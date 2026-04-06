import json
import re

files = {
    'az': 'app/locales/az/translation.json',
    'bg': 'app/locales/bg/translation.json',
    'bn': 'app/locales/bn/translation.json'
}

def is_likely_english(text):
    if not isinstance(text, str) or len(text.strip()) <= 1:
        return False
    if re.search(r'\{\{.*?\}\}', text):
        return False
    ascii_ratio = sum(1 for c in text if ord(c) < 128) / len(text)
    return ascii_ratio > 0.6

print("VERIFICATION REPORT")
print("="*70)

for lang, path in files.items():
    print(f"\n{lang.upper()}:")
    print("-"*70)
    
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    english_values = []
    for k, v in data.items():
        if is_likely_english(v):
            english_values.append((k, v))
    
    print(f"Total keys: {len(data)}")
    print(f"Still English: {len(english_values)}")
    
    if english_values[:10]:
        print("\nSample English strings remaining:")
        for k, v in english_values[:10]:
            preview = v[:60] + "..." if len(v) > 60 else v
            print(f"  • {k}: {preview}")

print("\n" + "="*70)
