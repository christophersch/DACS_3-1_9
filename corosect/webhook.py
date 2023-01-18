import requests
import json

def subscribe():

    WEBHOOK_URL = "http://localhost:5000/subscribe"
    TARGET_URL = "http://localhost:5000/gesture"

    print("Subscribing to gestures")
    r = requests.post(WEBHOOK_URL, data=json.dumps({"url": TARGET_URL}))
    print(r.text)