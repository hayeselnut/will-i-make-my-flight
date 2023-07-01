import csv
import os

headers = ["iata_code", "name", "size"]

all_rows = []
cur = []

with open(f"../data/airport-sizes-raw.csv", "r") as f:
    csv_reader = csv.DictReader(f, delimiter=",")
    count = 0
    for row in csv_reader:
        if row["Rank"] == "Rank":
            continue
        
        if row["Rank"] == "":
            for cur_row in cur:
                cur_row.append(row["City"].split()[0])
            all_rows += cur
            cur = []
            continue
    
        cur.append([row["Locid"], row["Airport Name"].replace("\n", " ")])

with open(f"../data/airport-sizes.csv", "w") as f:
    writer = csv.writer(f, delimiter=",")
    writer.writerow(headers)
    writer.writerows(all_rows)
        