from flask import Flask, request
from flight_details import airline_from_flight_num, fetch_flight_details
from predict import predict_bag_check, predict_security, predict_flight_delay, predict_walk_to_gate

app = Flask(__name__)

@app.route("/")
def get_root():
    return {
        "message": "ok"
    }

dummy_likelihood_response = {
    "departure_airport": "LAX", # AIRPORT CODE
    "departure_time_scheduled": "2023-07-01T12:07:37Z", # UTC
    "arrival_time": "2023-07-01T09:07:37Z", # UTC
    "predicted_bag_check": 20, # FIXED amount of time for bag check in
    "predicted_security": 30, # in minutes
    "predicted_flight_delay": 60, # in minutes
    "predicted_walk_to_gate": 10,
    "percent_chance": 50
}

@app.route("/flightlikelihood", methods=["POST"])
def get_flight_likelihood():
    data = request.json

    flight_num = data["flight_num"]
    arrival_time = data["arrival_time"]
    bag_check = True if data["bag_check"].lower() == "true" else False

    extra_details = fetch_flight_details(flight_num, arrival_time)
    departure_airport = extra_details["airport"]
    scheduled_departure_time = extra_details["scheduled_departure_time"]
    gate = extra_details["gate"]
    
    airline = airline_from_flight_num(flight_num)

    security = predict_security(departure_airport, arrival_time)
    flight_delay = predict_flight_delay(departure_airport, airline, scheduled_departure_time)
    walk_to_gate = predict_walk_to_gate(departure_airport, gate)

    return_data = {
        "arrival_time": arrival_time, # UTC
        "departure_airport": departure_airport, # AIRPORT CODE
        "departure_time_scheduled": scheduled_departure_time, # UTC
        "predicted_bag_check": -1, # FIXED amount of time for bag check in
        "predicted_security": security["time"], # in minutes
        "predicted_flight_delay": flight_delay["time"], # in minutes
        "predicted_walk_to_gate": walk_to_gate["time"],
        "percent_chance": 50,
    }

    if bag_check:
        bag_check = predict_bag_check(departure_airport, airline, arrival_time)
        return_data["predicted_bag_check"] = bag_check["time"]

    return return_data