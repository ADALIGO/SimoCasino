import json
import hashlib

# Read the casino data
with open('casinos_data.json', 'r', encoding='utf-8') as f:
    casinos = json.load(f)

print(f"Total casinos: {len(casinos)}")
print("Adding avatarUrl to all casinos...")

# Add avatarUrl to each casino (casino logo/avatar images)
for idx, casino in enumerate(casinos):
    casino_slug = casino.get('slug', casino['name'].lower().replace(' ', '-'))
    casino_name = casino.get('name', '')
    
    # Generate a consistent avatar ID based on casino slug
    hash_obj = hashlib.md5(casino_slug.encode())
    hash_int = int(hash_obj.hexdigest(), 16)
    avatar_id = (hash_int % 200) + 1  # Between 1-200
    
    # Add avatarUrl - using DiceBear API for unique avatars based on casino name
    # DiceBear generates beautiful avatars deterministically
    casino['avatarUrl'] = f"https://api.dicebear.com/7.x/avataaars/svg?seed={casino_slug}"
    
    # Alternative options:
    # Option 1: Initials avatar (shows first letters of casino name)
    # casino['avatarUrl'] = f"https://ui-avatars.com/api/?name={casino_name.replace(' ', '+')}&background=ff6b35&color=fff&size=200"
    
    # Option 2: Placeholder avatars (colorful backgrounds)
    # casino['avatarUrl'] = f"https://picsum.photos/200/200?random={avatar_id}"
    
    # Option 3: Emoji avatars
    # casino['avatarUrl'] = f"https://api.dicebear.com/7.x/fun-emoji/svg?seed={casino_slug}"

# Write back to the file
with open('casinos_data.json', 'w', encoding='utf-8') as f:
    json.dump(casinos, f, indent=2, ensure_ascii=False)

print("✅ AvatarUrl added to all casinos!")
print(f"\nSample casino data:")
print(f"  Name: {casinos[0]['name']}")
print(f"  ImageUrl (background): {casinos[0]['imageUrl']}")
print(f"  AvatarUrl (logo): {casinos[0]['avatarUrl']}")

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
