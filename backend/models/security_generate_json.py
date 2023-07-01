import csv
import json

obj = {}

with open("../data/schedule_compilation.csv", "r") as f:
    reader = csv.DictReader(f)

    for row in reader:
        if row["airport"] == "airport":
            continue

        airport = row["airport"]
        if airport in obj:
            obj[airport][row["start_time"]] = row["wait_time"]
        else:
            obj[airport] = {row["start_time"]: row["wait_time"]}

with open("../api/data/security-times.json", "w") as f:
    json_str = json.dumps(obj)
    print(json_str, file=f)