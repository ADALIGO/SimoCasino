import re

# Read the input file
with open('all_4000_casinos_checked_style.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Filter valid casinos with URLs and remove duplicates
seen = set()
filtered_lines = []

for line in lines:
    line = line.strip()
    if line.startswith('✅ Valid casino:'):
        # Extract name and URL
        match = re.match(r'✅ Valid casino: (.+?) → (.+?) \(\d+%\)', line)
        if match:
            name = match.group(1).strip()
            url = match.group(2).strip()
            if url != '[no-url]' and name not in seen:
                seen.add(name)
                filtered_lines.append(line)

# Write to output file
with open('verified_casinos_with_urls.txt', 'w', encoding='utf-8') as f:
    for line in filtered_lines:
        f.write(line + '\n')

print(f"Filtered {len(filtered_lines)} unique verified casinos with URLs.")