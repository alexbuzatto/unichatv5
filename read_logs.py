import sys

filename = sys.argv[1] if len(sys.argv) > 1 else 'rails_startup_logs.txt'

try:
    with open(filename, 'rb') as f:
        content = f.read()
        # Try different encodings
        for encoding in ['utf-8', 'utf-16', 'utf-16le', 'utf-16be', 'latin-1']:
            try:
                decoded = content.decode(encoding)
                print(f"--- Decoded {filename} with {encoding} ---")
                print(decoded)
                break
            except Exception:
                continue
except Exception as e:
    print(f"Error reading file: {e}")
