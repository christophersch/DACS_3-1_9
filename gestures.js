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
    switch (gesture.type) {
        case 0:
            createChainOfBlocks(["MoveTo,#0,#0", "Grab,Box", "MoveTo,#5,#10", "Drop,Box", "MoveTo,#0,#0", "MoveToItem,Box", "Grab,$Box2", "MoveTo,#0,#0", "Drop,$Box2"], 0, 0, null);
    }
}