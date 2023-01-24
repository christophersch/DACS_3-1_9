import requests
import json

def subscribe():

    WEBHOOK_URL = "http://localhost:5000/subscribe"
    TARGET_URL = "http://localhost:9000/gesture"

    print("Subscribing to gestures")
    try:
        r = requests.post(WEBHOOK_URL, data=json.dumps({"url": TARGET_URL}))
    except:
        print("Error subscribing to gestures!")
        return
    print(r.text)