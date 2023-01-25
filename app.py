from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from markupsafe import escape
import subprocess
import sys
import os
import time
import corosect.webhook as webhook

app = Flask(__name__)
CORS(app)

locks = 0
current_gesture = ""

PORT = 9000
NEXTGESTURE_TIMEOUT = 10

webhook.subscribe()

# Basic test to see if the server is running
@app.route('/test', methods=['GET'])
def test():
    response = app.response_class(
        response="Server set-up successful!",
        status=200,
        mimetype='text/plain'
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# Runs the code sent by the Blockly frontend and returns the output
@app.route('/', defaults={'path': ''}, methods=['POST'])
@app.route('/<path:path>', methods=['POST'])
def catch_all(path):
    print('new request')
    code = request.get_data().decode("utf-8")
    with open("_blockly.py", "w") as f:
        f.write(code)
    with open("_blockly.log", "w") as f:
        with open("_blockly.err", "w") as e:
            subprocess.call([sys.executable, "_blockly.py"], stdout=f, stderr=e)
    log = open("_blockly.log", "r").read()
    if os.stat("_blockly.err").st_size != 0:
        err = open("_blockly.err", "r").read().split("\n")
        line, mistake, reason = err[-4].split(", line")[-1].split(", in")[0], err[-3], err[-2]
        log = "[ERROR] An error occurred at {}: {}\n\nReason: {}".format(line, mistake, reason)
    os.remove("_blockly.py")
    os.remove("_blockly.log")
    os.remove("_blockly.err")
    response = app.response_class(
        response=log,
        status=200,
        mimetype='text/plain'
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# Sets the current gesture to the gesture detected (intended to be called by the gesture detection server)
@app.route('/gesture', methods=['POST'])
def gesture():

    gesture_json = request.get_json()
    gesture = gesture_json["gesture"]

    print(f"GESTURE {gesture}")

    global locks
    global current_gesture

    current_gesture = gesture

    print("Gesture detected: {}".format(gesture))

    while locks > 0:
        pass

    current_gesture = ""

    response = app.response_class(
        response="",
        status=200,
        mimetype='text/plain'
    )

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

NEXTGESTURE_TIMEOUT = 300
@app.route('/nextgesture', methods=['GET'])
def nextgesture():
    global locks
    global current_gesture
    locks += 1
    start_time = time.time()

    while current_gesture == "":
        if time.time() - start_time > NEXTGESTURE_TIMEOUT:
            locks -= 1
            response = app.response_class(
                response="",
                status=200,
                mimetype='text/plain'
            )
            response.headers["Access-Control-Allow-Origin"] = "*"
            return response
    locks -= 1

    g = current_gesture

    return str(g)

serve(app, host='0.0.0.0', port=PORT)