import re
import os
from dotenv import load_dotenv
import requests

load_dotenv()
    
def airline_from_flight_num(flight_num):
    match = re.search("^[A-Z]+", flight_num)
    if match:
        return match.group()
    return "AB"
    

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
        if "response" in body:
            details = body["response"]
            airport = details["dep_iata"]
            dep_time = details["dep_time"]
        else:
            raise Exception("Invalid request")
    except:
        airport = "LAX"
        dep_time = "2023-07-01T12:07:37Z"

    return {
        "airport": airport,
        "scheduled_departure_time": dep_time
    }
