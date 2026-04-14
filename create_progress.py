import re

# Parse the checked file to get results up to index 1510
results = []
with open('all_4000_casinos_checked_style.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines[:1511]):  # up to 1511 lines, index 0 to 1510
    line = line.strip()
    match = re.match(r'(.+?): (.+?) → (.+?) \((\d+)%\)', line)
    if match:
        status, name, url, confidence = match.groups()
        confidence = int(confidence)
        resolvedUrl = url if url != '[no-url]' else None
        results.append({
            'name': name,
            'status': status,
            'resolvedUrl': resolvedUrl,
            'confidence': confidence,
            # Add other fields if needed, but for progress, this might be enough
        })

import json
progress = {
    'lastProcessedIndex': 1510,
    'results': results,
    'timestamp': '2024-01-01T00:00:00.000Z'  # dummy
}
with open('fast_casino_check_progress.json', 'w', encoding='utf-8') as f:
    json.dump(progress, f, indent=2)

print('Progress file created')