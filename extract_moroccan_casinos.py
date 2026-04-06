import re

def extract_casinos_from_md(md_file_path):
    casinos = []
    with open(md_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # skip separators
        if not line or line.lower() == 'more' or line.upper() == 'PLAY' or line.replace('.', '', 1).isdigit():
            i += 1
            continue

        # name lines repeated twice (e.g. "Gamblezen" then "Gamblezen")
        if i + 1 < len(lines) and lines[i + 1].strip() == line:
            casino = {'name': line}
            i += 2

            # parse bonus
            while i < len(lines) and not lines[i].strip():
                i += 1
            bonus = ''
            if i < len(lines):
                bonus_line = lines[i].strip()
                if '%' in bonus_line or 'up to' in bonus_line.lower() or 'spins' in bonus_line.lower() or '$' in bonus_line:
                    bonus = bonus_line
                    i += 1
            casino['bonus'] = bonus or 'No bonus'

            # parse rating/votes line
            while i < len(lines) and not lines[i].strip():
                i += 1
            casino['rating'] = 0.0
            casino['votes'] = 0
            if i < len(lines):
                rating_line = lines[i].strip()
                match = re.search(r"(\d+(?:\.\d+)?)\s*/\s*(\d+)", rating_line)
                if match:
                    casino['rating'] = float(match.group(1))
                    casino['votes'] = int(match.group(2))
                    i += 1
                else:
                    # maybe rating with no votes, e.g. "3.8 / 5"
                    match = re.search(r"(\d+(?:\.\d+)?)\s*/\s*(\d+(?:\.\d+)?)", rating_line)
                    if match:
                        casino['rating'] = float(match.group(1))
                        try:
                            casino['votes'] = int(float(match.group(2)))
                        except ValueError:
                            casino['votes'] = 0
                        i += 1

            # parse providers until next name or block separator
            providers = []
            while i < len(lines):
                p = lines[i].strip()
                if not p or p.lower() == 'more' or p.upper() == 'PLAY':
                    i += 1
                    if p.lower() == 'more':
                        continue
                    else:
                        continue
                if i + 1 < len(lines) and lines[i + 1].strip() == p:
                    break
                if re.match(r"^\d+$", p):
                    break
                if '%' in p and 'up to' in p.lower():
                    break
                providers.append(p)
                i += 1

            casino['providers'] = providers
            casinos.append(casino)
            continue

        i += 1
    return casinos

if __name__ == "__main__":
    casinos = extract_casinos_from_md("CASINO AVAILBLE FROM MOROCCO 1030 casinos.md")
    print(f"Extracted {len(casinos)} casinos")
    for c in casinos[:5]:
        print(c)

    with open('morocco_casinos_extracted.json', 'w', encoding='utf-8') as f:
        import json
        json.dump(casinos, f, ensure_ascii=False, indent=2)
    print('Wrote morocco_casinos_extracted.json')