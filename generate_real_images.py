import json
import hashlib

# Read the casino data
with open('casinos_data.json', 'r', encoding='utf-8') as f:
    casinos = json.load(f)

print(f"Total casinos: {len(casinos)}")
print("Generating real image URLs for all casinos...")

# Add real imageUrl to each casino using picsum.photos (generates real placeholder images)
for idx, casino in enumerate(casinos):
    casino_slug = casino.get('slug', casino['name'].lower().replace(' ', '-'))
    
    # Generate a consistent image ID based on casino slug for consistent images
    # Using hash to convert slug to a number (picsum.photos has ~200+ images)
    hash_obj = hashlib.md5(casino_slug.encode())
    hash_int = int(hash_obj.hexdigest(), 16)
    image_id = (hash_int % 200) + 1  # Between 1-200 (picsum has many images)
    
    # Option 1: picsum.photos - generates real placeholder images with high quality
    casino['imageUrl'] = f"https://picsum.photos/380/260?random={image_id}"
    
    # Alternative options worth considering:
    # Option 2: Unsplash - real casino/gaming themed images
    # casino['imageUrl'] = f"https://source.unsplash.com/380x260/?casino,gaming&sig={idx}"
    
    # Option 3: Lorem Flickr - generates themed images based on keywords
    # casino['imageUrl'] = f"https://loremflickr.com/380/260/casino,gaming?lock={image_id}"
    
    # Option 4: Generated gradient backgrounds (if you prefer solid colors)
    # colors = ["ff6b35", "f25c54", "667eea", "764ba2", "2d4059", "ea5455"]
    # color = colors[image_id % len(colors)]
    # casino['imageUrl'] = f"https://via.placeholder.com/380x260/{color}/ffffff?text={casino['name'][:10]}"

# Write back to the file
with open('casinos_data.json', 'w', encoding='utf-8') as f:
    json.dump(casinos, f, indent=2, ensure_ascii=False)

print("✅ Real image URLs added to all casinos!")
print(f"Sample URL: {casinos[0]['imageUrl']}")
print(f"Sample URL: {casinos[1]['imageUrl']}")
print(f"Sample URL: {casinos[2]['imageUrl']}")

# Also update casinos_data.js if it exists
try:
    # Read the existing file to preserve everything except the data array
    with open('casinos_data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the start and end of the rawCasinosData array
    import re
    start_pattern = r'const rawCasinosData = \['
    match = re.search(start_pattern, content)
    
    if match:
        start_idx = match.start()
        # Find the closing bracket - assumes it's the last ] before 'export'
        end_idx = content.rfind(']', 0, content.find('export')) + 1
        
        if end_idx > start_idx:
            # Reconstruct the file
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
