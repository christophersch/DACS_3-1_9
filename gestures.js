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
        case "test":
            createChainOfBlocks(["MoveTo,#0,#0", "Grab,Box", "MoveTo,#5,#10", "Drop,Box", "MoveTo,#0,#0", "MoveToItem,Box", "Grab,$Box2", "MoveTo,#0,#0", "Drop,$Box2"], 0, 0, null);
    }
}

function waitForGesture() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9000/nextgesture", true);
    request.responseType = "text";
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            console.log(response);
            var gesture = JSON.parse(response);
            onGestureDetected(gesture);
        }
    }
    request.send();
}