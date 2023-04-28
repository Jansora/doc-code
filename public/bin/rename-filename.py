import os
import sys

def rename_filename(directory, old_placeholder, new_placeholder):
    for root, _, files in os.walk(directory):
        for file_name in files:
            file_base, file_ext = os.path.splitext(file_name)
            file_renamed = file_name.replace(old_placeholder, new_placeholder)
            print("file_name:", file_name, "file_renamed ", file_renamed)
            old_file_path = os.path.join(root, file_name)
            new_file_path = os.path.join(root, file_renamed)
            os.rename(old_file_path, new_file_path)
            # if file_ext.lower() == old_placeholder:
            #     new_file_name = file_base + new_placeholder
            #     old_file_path = os.path.join(root, file_name)
            #     new_file_path = os.path.join(root, new_file_name)
            #     os.rename(old_file_path, new_file_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script_name.py <directory> <old_placeholder> <new_placeholder>  ")
        sys.exit(1)

    directory = sys.argv[1]
    old_placeholder = sys.argv[2]
    new_placeholder = sys.argv[3]

    rename_filename(directory, old_placeholder, new_placeholder)
