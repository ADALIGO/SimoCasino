import json
import hashlib

# Read the casino data
with open('casinos_data.json', 'r', encoding='utf-8') as f:
    casinos = json.load(f)

print(f"Total casinos: {len(casinos)}")
print("Adding imageGallery to all casinos...")

# Add imageGallery to each casino (array of casino gallery images)
for idx, casino in enumerate(casinos):
    casino_slug = casino.get('slug', casino['name'].lower().replace(' ', '-'))

    # Generate a consistent gallery based on casino slug
    hash_obj = hashlib.md5(casino_slug.encode())
    hash_int = int(hash_obj.hexdigest(), 16)
    base_id = (hash_int % 200) + 1  # Between 1-200

    # Create gallery with 3-5 images
    gallery_size = 3 + (hash_int % 3)  # 3-5 images
    casino['imageGallery'] = [
        f"https://picsum.photos/380/260?random={base_id + i}"
        for i in range(gallery_size)
    ]

# Write back to the file
with open('casinos_data.json', 'w', encoding='utf-8') as f:
    json.dump(casinos, f, indent=2, ensure_ascii=False)

print("✅ ImageGallery added to all casinos!")
print(f"\nSample casino data:")
print(f"  Name: {casinos[0]['name']}")
print(f"  ImageUrl (background): {casinos[0]['imageUrl']}")
print(f"  AvatarUrl (logo): {casinos[0]['avatarUrl']}")
print(f"  ImageGallery: {casinos[0]['imageGallery'][:2]}...")

# Also update casinos_data.js
try:
    with open('casinos_data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    import re
    start_pattern = r'const rawCasinosData = \['
    match = re.search(start_pattern, content)

    if match:
        start_idx = match.start()
        end_idx = content.rfind(']', 0, content.find('export')) + 1

        if end_idx > start_idx:
            updated_content = (
                content[:start_idx] +
                'const rawCasinosData = ' +
                json.dumps(casinos, indent=2, ensure_ascii=False) +
                ';' +
                content[end_idx+1:].lstrip()
            )

            with open('casinos_data.js', 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print("✅ casinos_data.js updated!")
except Exception as e:
    print(f"⚠️  Note: casinos_data.js update skipped ({e})")