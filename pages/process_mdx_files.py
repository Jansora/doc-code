import os
import sys
import json
import re

def find_first_h1(file_content):
    h1_pattern = re.compile(r"^#\s+(.+)$", re.MULTILINE)
    match = h1_pattern.search(file_content)
    return match.group(1) if match else ""

def process_mdx_files(directory):
    for root, _, files in os.walk(directory):
        meta_data = {}
        for file_name in files:
            file_base, file_ext = os.path.splitext(file_name)
            if file_ext.lower() == ".mdx":
                file_path = os.path.join(root, file_name)
                with open(file_path, "r", encoding="utf-8") as file:
                    file_content = file.read()

                first_h1 = find_first_h1(file_content)
                meta_data[file_base] = first_h1

        if meta_data:
            meta_json_path = os.path.join(root, "_meta.json")
            with open(meta_json_path, "w", encoding="utf-8") as meta_json_file:
                json.dump(meta_data, meta_json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script_name.py <directory>")
        sys.exit(1)

    directory = sys.argv[1]
    process_mdx_files(directory)
