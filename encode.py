import json
import os
import random
import string


MAX_PROB = 302

# Helper function to generate a random 6-character alphanumeric ID
def generate_random_id():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=5))

# Load existing problemIdMap.json if it exists
if os.path.exists("problemIdMap.json"):
    with open("problemIdMap.json", "r") as f:
        problem_id_map = json.load(f)
    print("Loaded existing problemIdMap.json.")
else:
    problem_id_map = {}
    print("No existing problemIdMap.json found. Generating a new one.")

# Find the highest existing problem number (e.g., "prob190.html")
existing_problems = [int(filename) for filename in problem_id_map.keys()]
max_existing = max(existing_problems, default=0)  # Get max problem number or 0 if empty

# Generate IDs for any new problems (from max_existing + 1 to 225)
for i in range(max_existing + 1, MAX_PROB + 1):
    filename = f"{i:03}"  # Format as prob001.html, prob002.html, etc.

    # Ensure each new ID is unique
    while True:
        random_id = generate_random_id()
        if random_id not in problem_id_map:
            problem_id_map[filename] = random_id
            print(f"Added new problem: {filename} --> {random_id}")
            break  # Exit loop when a unique ID is generated

# Save the updated problemIdMap.json
with open("problemIdMap.json", "w") as f:
    json.dump(problem_id_map, f, indent=2)

print("problemIdMap.json updated successfully!")