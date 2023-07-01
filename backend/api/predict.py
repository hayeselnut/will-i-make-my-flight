from helpers import DEFAULT_TS_FMT, month_from_timestamp
import json
from datetime import datetime, timedelta

def predict_bag_check(airport, airline, arrival_time):
    month = month_from_timestamp(arrival_time, DEFAULT_TS_FMT)

    return {
        "time": 10,
        "confidence": 80
    }

def predict_security(airport, arrival_time):
    with open("data/security-times.json", "r") as f:
        times = json.load(f)
    
    time_obj = datetime.strptime(arrival_time, DEFAULT_TS_FMT)
    time_lookup = time_obj.strftime("%H00")
    
    try:
        wait_time = max(1, int(times[airport][time_lookup]))
    except:
        wait_time = 40

    return {
        "time": wait_time,
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

def will_make_it(bag_check, security, walk_to_gate, arrival_time, flight_departure_time, predicted_delay):
    arrival_time_obj = datetime.strptime(arrival_time, DEFAULT_TS_FMT)
    dep_time_obj = datetime.strptime(flight_departure_time, DEFAULT_TS_FMT)

    earliest_at_gate = arrival_time_obj + timedelta(minutes=security+walk_to_gate+max(bag_check, 0))
    latest_depart = dep_time_obj + timedelta(minutes=predicted_delay)

    return earliest_at_gate <= latest_depart


def calculate_confidence(confidences, will_make_it):
    avg = sum(confidences) / len(confidences)
    half_avg = int(avg / 2)

    if will_make_it:
        conf = 50 + half_avg
    else:
        conf = 50 - half_avg
    
    return conf

if __name__ == "__main__":
    confidences = [80, 80, 90, 80]

    print(calculate_confidence(confidences, True))
    print(calculate_confidence(confidences, False))