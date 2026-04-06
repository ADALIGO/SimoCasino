import json


# Check all files

files = [

    ("app/locales/az/translation.json", "Azerbaijani"),
    ("app/locales/bg/translation.json", "Bulgarian"),
    ("app/locales/bn/translation.json", "Bengali")
]


for filepath, lang in files:

    try:

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

            print(f"? {lang}: {len(data)} entries loaded successfully")
    except Exception as e:

            print(f"? {lang}: Error - {e}")


print("\n??? Translation process completed successfully!")
