from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def get_root():
    return {
        "message": "ok"
    }

dummy_likelihood_response = {
    "percent_chance": 50,
    "departure_airport": "LAX", # AIRPORT CODE
    "departure_time_scheduled": "2023-07-01T12:07:37Z", # UTC
    "arrival_airport": "2023-07-01T09:07:37Z", # UTC
    "predicted_bag_check": 20, # FIXED amount of time for bag check in
    "predicted_security": 30, # in minutes
    "predicted_flight_delay": 60, # in minutes
}

@app.route("/flightlikelihood", methods=["POST"])
def get_flight_likelihood():
    data = request.json

    return dummy_likelihood_response