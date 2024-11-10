import os
import re
import json

topic_categories = {
    "Number & Quantity": [],
    "Algebra": [],
    "Functions": [],
    "Geometry": [],
    "Statistics & Probability": [],
}

problems_dir = './problems'

# Iterate over all files in the directory
for filename in os.listdir(problems_dir):
    # Process only files with '.html' extension
    if filename.endswith('.html'):
        print(filename)
        # Read the content of the HTML file
        with open(os.path.join(problems_dir, filename), 'r', encoding='utf-8') as file:
            content = file.read()

        # Extract the unique identifier (without extension) from the filename
        problem_identifier = filename.split('.')[0]  # Example: '2ir4v' from '2ir4v.html'

        # Search for the topic tag within the content
        match = re.search(r'<div class="question" data-tag="([^"]+)"', content)
        if match and match.group(1) in topic_categories:
            # Add the problem identifier to the appropriate topic category
            topic_categories[match.group(1)].append(problem_identifier)

# # Sort the problem identifiers in each category (optional)
# for category in topic_categories:
#     topic_categories[category].sort()


# Save the topic categories to a JSON file
with open('prob_categories.json', 'w', encoding='utf-8') as outfile:
    json.dump(topic_categories, outfile, indent=2)

print("Problem categories have been saved to 'prob_categories.json'")