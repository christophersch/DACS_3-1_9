import requests

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
    "AGV": "http://192.168.1.35:5500",
    "Arm": "",
    "Object_Detection": "",
    "AR": "",
    "Gestures" : "",
    "Orchestration": "",
}


def get_storage_coordinates(storage_id:int):
    storage_data = requests.get(endpoints["Orchestration"] + f"storage/{str(storage_id)}").json()
    return {"x": storage_data["x"], "y": storage_data["y"]}

# Execute specific actions

# Only want to move AGV between different storages, hence the storage_id argument
# (assuming we know the storage ID in advance)
def move_agv_to(x:int, y:int):
    # target_position = get_storage_coordinates(storage_id)
    # req_json = {'x': target_position['x'], 'y': target_position['y']}

    try:
        req_json = {"text": f"Move AGV to {x}, {y}"}
        r = requests.post(endpoints['AGV'], json=req_json)

        return r
    except:
        print('moved')


def grab(item:str):
    try:
        req_json = {"text": f"Grab {item}"}
        r = requests.post(endpoints['AGV'], json=req_json)

        return r
    except:
        print('grabbed')


def feed(item:str):
    try:
        req_json = {"text": f"Feed {item}"}
        r = requests.post(endpoints['AGV'], json=req_json)

        return r
    except:
        print('fed')


# Robot arm group
# item: crate, insects
# to: crate,  
# TODO: Ask group 5 how to execute their scenario
def move_object(item, to):
    return 0

def get_state():
    #TODO
    return None