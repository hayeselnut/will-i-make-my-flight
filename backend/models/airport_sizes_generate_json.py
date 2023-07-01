import csv
import json

obj = {}

with open(f"../data/airport-sizes.csv", "r") as f:
    csv_reader = csv.DictReader(f, delimiter=",")

    for row in csv_reader:
        if row["iata_code"] == "iata_code":
            continue

        obj[row["iata_code"]] = row["size"]

json_str = json.dumps(obj)
with open(f"../api/data/airport-sizes.json", "w") as f:
    print(json_str, file=f)