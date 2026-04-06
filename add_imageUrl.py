import json

# Read the casino data
with open('casinos_data.json', 'r', encoding='utf-8') as f:
    casinos = json.load(f)

print(f"Total casinos: {len(casinos)}")

# Add imageUrl to each casino
for casino in casinos:
    # Use a fallback image URL pattern (you can customize this URL)
    # Using a CDN or your own hosting
    casino_slug = casino.get('slug', casino['name'].lower().replace(' ', '-'))
    
    # Option 1: Use placeholder service with casino name
    casino['imageUrl'] = f"https://api.placeholder.com/casino/{casino_slug}/380x260.jpg"
    
    # Alternative options to consider:
    # Option 2: Use Unsplash but with the slug
    # casino['imageUrl'] = f"https://source.unsplash.com/380x260/?{casino['name']},casino"
    
    # Option 3: Use a static URL from your own CDN
    # casino['imageUrl'] = f"https://cdn.simocasino.com/casinos/{casino_slug}.jpg"

# Write back to the file
with open('casinos_data.json', 'w', encoding='utf-8') as f:
    json.dump(casinos, f, indent=2, ensure_ascii=False)

print("✅ ImageUrl added to all casinos!")

# Also update casinos_data.js if it exists
try:
    with open('casinos_data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the rawCasinosData array
    updated_content = content.replace(
        'const rawCasinosData = [',
        f'const rawCasinosData = {json.dumps(casinos, indent=2, ensure_ascii=False)}'
    )
    
    # Remove the old array from the updated content and reconstruct it
    import re
    start_idx = content.find('const rawCasinosData = [')
    end_idx = content.rfind(']') + 1
    
    if start_idx != -1 and end_idx != 0:
        updated_content = content[:start_idx] + 'const rawCasinosData = ' + json.dumps(casinos, indent=2, ensure_ascii=False) + content[end_idx:]
        
        with open('casinos_data.js', 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print("✅ casinos_data.js updated!")
except Exception as e:
    print(f"Note: casinos_data.js update skipped ({e})")
