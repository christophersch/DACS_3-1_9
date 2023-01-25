/*
Block names:
Grab
Drop
Feed
Box
Egg
AGV
Adult
Compartment
MoveTo
MoveToItem
MoveItemTo
MoveItemToItem
Put
Take
ChangeBoxOfItem
OnGesture
 */

// Creates chains of blocks based on which gesture was detected
function onGestureDetected(gesture) {
    switch (gesture) {
        case "1":
            createChainOfBlocks(["Deliver,Crate_1,Arm","Place,Crate_1,Workspace","Place,Crate_2,AGV","Deliver,Crate_2,Storage_1"], 0, 0, null);
            break;

        case "2":
            createChainOfBlocks(["MoveItemToItem,AGV,Storage_1", "MoveItemToItem,AGV,Workspace", "MoveItemToItem,AGV,Storage_2"], 0, 0, null);
            break;

        case "3":
            createChainOfBlocks(["Place,Crate_1,AGV","Place,Crate_2,AGV","Place,Crate_3,AGV"], 0, 0, null);
            break;
    }
}

function waitForGesture() {
    let BACKEND_IP = '192.168.1.56'

    let request = new XMLHttpRequest();
    request.open("GET", "http://" + BACKEND_IP + ":9000/nextgesture", true);
    request.responseType = "text";
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let response = request.responseText;
            onGestureDetected(response);
        }
    }
    request.send();
}
