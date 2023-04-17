import os
import sys

def change_file_extension(directory, old_extension, new_extension):
    for root, _, files in os.walk(directory):
        for file_name in files:
            file_base, file_ext = os.path.splitext(file_name)
            if file_ext.lower() == old_extension:
                new_file_name = file_base + new_extension
                old_file_path = os.path.join(root, file_name)
                new_file_path = os.path.join(root, new_file_name)
                os.rename(old_file_path, new_file_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script_name.py <directory>")
        sys.exit(1)

    directory = sys.argv[1]
    old_extension = ".md"
    new_extension = ".mdx"

    change_file_extension(directory, old_extension, new_extension)