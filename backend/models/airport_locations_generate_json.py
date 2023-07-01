import csv
import json

big_obj = {}

with open("../data/airports.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["IATA_CODE"] == "IATA_CODE":
            continue
        
        big_obj[row["IATA_CODE"]] = {
            "latitude": row["LATITUDE"],
            "longitude": row["LONGITUDE"]
        }

with open("../api/data/airport-locations.json", "w") as f:
    big_json = json.dumps(big_obj)
    print(big_json, file=f)