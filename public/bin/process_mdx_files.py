import os
import json

def extract_h1_from_file(filepath):
    """从文件中提取第一个以#开头的行作为h1标题"""
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line.startswith('#'):
                return line[1:].strip()
    return None

def generate_meta_json(directory):
    """生成或更新_meta.json文件"""
    meta_filepath = os.path.join(directory, "_meta.json")

    # 如果_meta.json存在，先读取其内容
    if os.path.exists(meta_filepath):
        with open(meta_filepath, 'r', encoding='utf-8') as f:
            meta_data = json.load(f)
    else:
        meta_data = {}

    # 获取目录中的.md和.mdx文件列表
    md_files = {os.path.splitext(filename)[0] for filename in os.listdir(directory) if filename.endswith(('.md', '.mdx'))}

    # 遍历_meta.json中的key，检查对应的.md或.mdx文件是否仍然存在
    keys_to_remove = [key for key in meta_data if key not in md_files]
    for key in keys_to_remove:
        del meta_data[key]

    # 遍历目录中的.md和.mdx文件
    for filename in md_files:
        filepath = os.path.join(directory, filename + '.md') if filename + '.md' in os.listdir(directory) else os.path.join(directory, filename + '.mdx')
        h1_title = extract_h1_from_file(filepath)
        meta_data[filename] = h1_title if h1_title else filename

    # 写入_meta.json文件
    with open(meta_filepath, 'w', encoding='utf-8') as f:
        json.dump(meta_data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Generate or update _meta.json for .md and .mdx files in the specified directory.')
    parser.add_argument('directory', help='The directory to process')
    args = parser.parse_args()

    generate_meta_json(args.directory)
