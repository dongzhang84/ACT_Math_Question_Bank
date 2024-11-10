import os
import json

# Directory where your HTML files are located
# directory = "./problems"
# directory = "./practice"
# directory = "./solutions"

directory_list = ["./problems", "./practice", "./solutions"]

for directory in directory_list: 

    # Load the JSON mapping from problemIdMap.json
    with open("problemIdMap.json", "r") as f:
        mapping = json.load(f)

    # Loop through each key-value pair in the mapping
    for old_name, new_name in mapping.items():
        # Construct the old file name (e.g., prob001.html)
        
        # if directory == "./problems" or directory == "./practice":
        #     old_file = f"prob{old_name}.html"
        # elif directory == "./solutions":
        #     old_file = f"solution{old_name}.html"

        old_file = f"prob{old_name}.html"
        
        # Construct the new file name (e.g., xk8qg.html)
        new_file = f"{new_name}.html"
        
        # Full path to the old and new files
        old_path = os.path.join(directory, old_file)
        new_path = os.path.join(directory, new_file)
        
        # Check if the old file exists before renaming
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"Renamed: {old_file} --> {new_file}")
        else:
            print(f"{directory}: File not found: {old_file}")
