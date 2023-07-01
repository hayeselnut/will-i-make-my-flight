from helpers import DEFAULT_TS_FMT, month_from_timestamp
import json

def predict_bag_check(airport, airline, arrival_time):
    month = month_from_timestamp(arrival_time, DEFAULT_TS_FMT)

    return {
        "time": 10,
        "confidence": 80
    }

def predict_security(airport, arrival_time):
    month = month_from_timestamp(arrival_time, DEFAULT_TS_FMT)

    return {
        "time": 40,
        "confidence": 80
    }

def predict_walk_to_gate(airport, gate):
    with open("data/airport-sizes.json") as f:
        sizes = json.load(f)
    
    try:
        size = sizes[airport]

        if size == "Large":
            time = 15
        elif size == "Medium":
            time = 10
        elif size == "Small":
            time = 5
        else:
            time = 1
        
    except:
        time = 10

    return {
        "time": time,
        "confidence": 90
    }

def predict_flight_delay(airport, airline, flight_departure_time):
    month = month_from_timestamp(flight_departure_time, DEFAULT_TS_FMT)

    return {
        "time": 60,
        "confidence": 80
    }