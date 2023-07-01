import pandas as pd
import os

def get_data():
    files = os.listdir(f"../data")
    all_data = pd.DataFrame()

    for f in files:
        df = pd.read_csv(f"../data/{f}")
        all_data = pd.concat([all_data, df])

    all_data.to_csv("../data/all_data.csv", index=False)
    return


if __name__ == "__main__":
    print(get_data())