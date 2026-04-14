import re
import json

# Parse the current checked file to recreate results
results = []
with open('all_4000_casinos_checked_style.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()
    match = re.match(r'(.+?): (.+?) → (.+?) \((\d+|undefined)%\)', line)
    if match:
        status, name, url, confidence = match.groups()
        confidence = int(confidence) if confidence != 'undefined' else 0
        resolvedUrl = url if url != '[no-url]' else None
        results.append({
            'name': name,
            'status': status,
            'resolvedUrl': resolvedUrl,
            'confidence': confidence,
        })

print(f'Parsed {len(results)} results')

progress = {
    'lastProcessedIndex': len(results) - 1,
    'results': results,
    'timestamp': '2026-04-12T00:00:00.000Z'
}
with open('fast_casino_check_progress.json', 'w', encoding='utf-8') as f:
    json.dump(progress, f, indent=2)

print('Progress file restored')