import json

with open('fast_casino_check_progress.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['results'] = data['results'][:-1]  # remove last entry
data['lastProcessedIndex'] = 1509

with open('fast_casino_check_progress.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Updated progress to start from 1510')