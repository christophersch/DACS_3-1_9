import copy
import math
import time
from typing import Dict, List

from corosect import farm

travelTimePerUnit: float = 1

# Absolute location
class Location:
    def __init__(self):
        self.y = 0
        self.x = 0

    def __int__(self, x:float, y:float):
        self.x = x
        self.y = y

    def add(self, other: 'Location'):
        self.x += other.x
        self.y += other.y

    def sub(self, other: 'Location'):
        self.x -= other.x
        self.y -= other.y

    def mul(self, scalar: float):
        self.x = self.x * scalar
        self.y = self.y * scalar

    def dif(self, scalar: float):
        self.x = self.x / scalar
        self.y = self.y / scalar

    def norm(self) -> float:
        return math.sqrt(math.pow(self.x,2)+math.pow(self.y,2))

    def dist(self, other: 'Location') -> float:
        temp: Location = copy.deepcopy(self)
        temp.sub(other)
        return temp.norm()

prefix_storage = "storage "
prefix_robot_arm = "robot arm "
prefix_agv = "agv "


class MoveInProgress:

    def __int__(self, name: str, final_location: Location, end_time: float):
        self.last_edit_time: float = time.localtime()
        self.name: str = name
        self.final_location: Location = copy.deepcopy(final_location)
        self.end_time = end_time

    def get_update(self, location_at_last_edit: Location) -> Location:
        t: float = time.localtime()
        if t >= self.end_time:
            return self.final_location
        if t < self.last_edit_time:
            raise Exception("Should be impossible")
        ans: Location = copy.deepcopy(location_at_last_edit)
        relative_final_location: Location = copy.deepcopy(self.final_location)
        relative_final_location.sub(location_at_last_edit)
        relative_final_location.mul((t-self.last_edit_time)/(self.end_time-self.last_edit_time)) #hence forward the relative actual location
        ans.add(relative_final_location)
        self.last_edit_time = t
        return ans

    def completed(self) -> bool:
        return time.localtime() >= self.end_time
class Simulation:
    def __int__(self):
        state = farm.get_state()
        self.name_to_location: Dict[str, Location] = {}
        self.agv_name_list: List[str] = []
        #TODO get all objects and their locations from state


        self.movements_in_progress: List[MoveInProgress] = []
        self.avg_destination_wait_list: List[Location] = []

    def get_storage_coordinates(self, storage_id: int):
        self.update()
        return {"x": self.name_to_location[prefix_storage+str(storage_id)].x, "y": self.name_to_location[prefix_storage+str(storage_id)].y}

    def update(self):
        agv_left = copy.copy(self.agv_name_list)
        for element in self.movements_in_progress:
            self.name_to_location[element.name] = element.get_update(self.name_to_location[element.name])
            if element.completed():
                self.movements_in_progress.remove(element)
            else:
                agv_left.remove(element.name)
        if len(agv_left) > 0:
            for element in self.avg_destination_wait_list:
                if len(agv_left) > 0:
                    name = agv_left[0]
                    self.movements_in_progress.append(MoveInProgress(name, element, travelTimePerUnit*self.name_to_location[name].dist(element)))
                    agv_left.remove(name)
            self.update()




    # Execute specific actions

    # Only want to move AGV between different storages, hence the storage_id argument
    # (assuming we know the storage ID in advance)
    def move_agv_to(self, x: int, y: int):
        dest = Location(float(x),float(y))
        self.avg_destination_wait_list.append(dest)
        self.update()
        # target_position = get_storage_coordinates(storage_id)
        # req_json = {'x': target_position['x'], 'y': target_position['y']}

    def grab(item: str):


    def feed(item: str):


    # Robot arm group
    # item: crate, insects
    # to: crate,
    # TODO: Ask group 5 how to execute their scenario
    def move_object(item, to):
    def get_state(self):
        #TODO formate to state standard
