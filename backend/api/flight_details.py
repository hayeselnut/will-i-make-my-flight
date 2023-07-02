from datetime import datetime
import re
import os
from dotenv import load_dotenv
import requests
import json

from helpers import AIRLABS_TS_FMT, DEFAULT_TS_FMT

load_dotenv()
    
def airline_from_flight_num(flight_num):
    match = re.search("^[A-Z]+", flight_num)
    if match:
        return match.group()
    return "UA"
    

def fetch_flight_details(flight_num, arrival_time):
    """
    Given a flight number departing in the next 3 days, fetch additional info about the flight:
        - airport
        - scheduled departure time
    """

    access_key = os.getenv("AIRLABS_KEY")

    try:
        response = requests.get("https://airlabs.co/api/v9/flight", params={
            "api_key": access_key,
            "flight_iata": flight_num
        })
        body = response.json()
        print(body)
        if "response" in body:
            details = body["response"]
            airport = details["dep_iata"]
            gate = details["dep_gate"]
            dep_time = details["dep_time"]

            dep_time_object = datetime.strptime(dep_time, AIRLABS_TS_FMT)
            dep_time = dep_time_object.strftime(DEFAULT_TS_FMT)
        else:
            raise Exception("Invalid request")
    
        with open("data/airport-locations.json", "r") as f:
            locations = json.load(f)
            latitude = locations[airport]["latitude"]
            longitude = locations[airport]["longitude"]
    
    except Exception as e:
        print(e)
        airport = "LAX"
        dep_time = "2023-07-01T12:07:37"
        gate = "29"
        latitude = 33.94254
        longitude = -118.40807

    return {
        "airport": airport,
        "gate": gate,
        "scheduled_departure_time": dep_time,
        "longitude": longitude,
        "latitude": latitude
    }

