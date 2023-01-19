import requests
import json

#DT_Ip = 'http://192.168.1.56:5000'

# Group 10 stuff
Task_Type = \
    {
        'sort_insects': 1,  # For coordination: Value is crate_id array
        'move_agv': 2,  # For AGV: Value is xyz coordinates
        'pick_up': 3,  # For AGV: Value is crate_id array
        'deliver': 4,  # For AGV: Value is crate_id array
        'deliver_back': 5,  # For AGV: Value is crate_id array
        'sort': 6,
        # For RA: Value is crate_id array, more precisely pair(first crate_id is crate with insects,second is empty in which to sort)
        'idle_process': 7,
        'place_crate': 8,  # Place crate on workspace
        'place_back_crate': 9  # Put crate back on AGV
        # pick up insect (by argument like color etc)

    }

'''
First of all, a quick check of which data we need (based on the materials purchasing list)

Group 4 (AGV):
    Provides:
    Needs:
        - AGV end position

Group 5 (Robot Arm):
    Provides:
    Needs:
        - Grab item
        - Item target position (but this feels more like a group 6 thing)

Group 6 (Object detection & tracking):
    Provides:
    Needs:
        - Item which we wish to grab

(if I understand the scenarios correctly, the robot arm gets instructions to grab objects from group 6. Scenarios don't specify dropping items, will have to ask groups 5 & 6 about this.)

Group 7 (Augmented Reality):
    Provides:
    Needs:
        - Planned small scale instructions (what's going to happen?)
        - Planned processes and actions (what's going on?)

Group 8 (Gesture Control):
    Provides:
        - Gestures -> screen coordinates (probably provided as (x,y) tuple. Honestly feels a bit uneccessary to me, will have to ask)
    Needs:
        - 

Group 9 (Programming Interfaces, us):
    :D

Group 10 (Orchestration software):
    Provides:
    Needs:

    Unsure about group 10's specifications, what do they mean by task type?
'''

'''
    First need to get an item's position from group 10
'''

# TODO: Add Endpoint URLs
# TODO: Add try/excepts to prevent unexpected crashes

# REST endpoints per group
endpoints = {
    "AutomaticGuidedVehicle": "http://192.168.1.35:5500",
    "RobotArm": "",
    "ObjectDetection": "",
    "AugmentedReality": "",
    "GestureControl": "",
    "DigitalTwins": "http://192.168.1.56:5000"
}


def get_storage_coordinates(storage_id: int):
    storage_data = requests.get(endpoints["Orchestration"] + f"storage/{str(storage_id)}").json()
    return {"x": storage_data["x"], "y": storage_data["y"]}


# Execute specific actions

# Only want to move AGV between different storages, hence the storage_id argument
# (assuming we know the storage ID in advance)


def send_request(task_type_id, time, value):
    payload = {'orders':
        [
            {'task_type_id': task_type_id, 'time': time, 'value': value},
        ]
    }
    ip = endpoints["DT"] + '/insert/order'
    res = requests.post(ip, data=json.dumps(payload), headers={'Content-Type': 'application/json'})
    return res


def deliver_crate(value):
    return send_request(Task_Type['deliver'], -1, value)


def deliver_back_crate(value):
    return send_request(Task_Type['deliver_back'], -1, value)


def place_crate(value):
    return send_request(Task_Type['place_crate'], -1, value)


def place_back_crate(value):
    return send_request(Task_Type['place_back_crate'], -1, value)


# Called from the Blockly blocks
def deliver(crate_id, other):
    if other == 'arm':
        deliver_crate(crate_id)
    else:
        deliver_back_crate(crate_id)


def place(crate_id, surface):
    if surface == 'workspace':
        place_crate(crate_id)
    elif surface == 'agv':
        place_back_crate(crate_id)