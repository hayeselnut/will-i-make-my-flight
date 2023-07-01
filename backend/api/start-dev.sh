#!/bin/sh
export FLASK_APP=./index.py
flask --debug run -h 0.0.0.0 -p 3010