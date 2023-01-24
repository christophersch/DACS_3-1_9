from flask import Flask, request
from waitress import serve
from markupsafe import escape
import subprocess
import sys
import os
import time
import requests
import corosect.webhook as webhook

app = Flask(__name__)

webhooks = []

locks = 0
current_gesture = ""

webhook.subscribe()

@app.route('/', defaults={'path': ''}, methods=['POST'])
@app.route('/<path:path>', methods=['POST'])
def catch_all(path):
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

@app.route('/gesture', methods=['POST'])
def gesture():
    json = request.get_json()
    gesture = json["gesture"]
    time = json["detectedAt"]
    context = json["context"]

    global locks
    global current_gesture

    current_gesture = gesture

    while locks > 0:
        pass

    current_gesture = ""

    for webhook in webhooks:
        requests.post(webhook, data=gesture)

    response = app.response_class(
        response="",
        status=200,
        mimetype='text/plain'
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route('/subscribe', methods=['POST'])
def subscribe():
    json = request.get_json()
    webhook = json["url"]
    webhooks.append(webhook)
    response = app.response_class(
        response="",
        status=200,
        mimetype='text/plain'
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

NEXTGESTURE_TIMEOUT = 10

@app.route('/nextgesture', methods=['GET'])
def nextgesture():
    global locks
    global current_gesture
    locks += 1
    start_time = time.time()
    while current_gesture == "":
        if time.time() - start_time > NEXTGESTURE_TIMEOUT:
            locks -= 1
            return "No gesture detected, timed out."
    locks -= 1
    response = app.response_class(
        response=current_gesture,
        status=200,
        mimetype='text/plain'
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
       
serve(app, host='0.0.0.0', port=5000)