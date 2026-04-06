#!/usr/bin/env python3
"""
Script to find and report hardcoded English text in user pages that needs translation
"""
import re
from pathlib import Path

USER_PAGES = [
    'app/en/user/profile/page.tsx',
    'app/user/[page]/page.tsx',
]

def extract_hardcoded_strings(file_path):
    """Extract potential hardcoded English strings from a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return []
    
    # Find strings that look like UI labels (capitalized or common UI terms)
    # This is a simple heuristic - find strings in JSX that aren't translation calls
    patterns = [
        r'>[A-Z][a-zA-Z\s]+</',  # Text between tags
        r'"([A-Z][a-zA-Z\s]+)"',  # Quoted text
        r"'([A-Z][a-zA-Z\s]+)'",  # Single quoted text
    ]
    
    strings = set()
    for pattern in patterns:
        matches = re.findall(pattern, content)
        strings.update(matches)
    
    return sorted(strings)

def main():
    print("\n" + "="*60)
    print("HARDCODED STRINGS ANALYSIS")
    print("="*60 + "\n")
    
    for page in USER_PAGES:
        page_path = Path(page)
        if page_path.exists():
            print(f"\n📄 {page}")
            print("-" * 60)
            strings = extract_hardcoded_strings(page)
            if strings:
                for s in strings[:20]:  # Show first 20
                    print(f"  • {s}")
            else:
                print("  ✅ No obvious hardcoded strings found or already translated")
        else:
            print(f"\n⚠️  {page} not found")
    
    print("\n" + "="*60)

if __name__ == "__main__":
    main()
