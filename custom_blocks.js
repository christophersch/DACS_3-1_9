const MOVEMENT_COLOR = 10;
const VARIABLE_COLOR = 70;
const ITEM_MOVEMENT_COLOR = 130;
const ITEM_INTERACTION_COLOR = 190;
const BOX_INTERACTION_COLOR = 250;
const OTHER_COLOR = 310;

const COROSECT_FARM_IMPORT = "from corosect import farm"

// Creates custom blocks for the Blockly interface

// Grab item

Blockly.Blocks['Grab'] = {
    init: function() {
        this.jsonInit({
            "type": "Grab",
            "message0": "%{BKY_GRAB_TITLE}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": ["Item", "Box"]
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_GRAB_TOOLTIP}"
        });
    }
}

Blockly.Python['Grab'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.grab(' + value_object + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}


// Drop item 

Blockly.Blocks['Drop'] = {
    init: function() {
        this.jsonInit({
            "type": "Drop",
            "message0": '%{BKY_DROP_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": ["Item", "Box"]
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_DROP_TOOLTIP}"
        });
    }
}
Blockly.Python['Drop'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = 'farm.farm_data_test()\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}


// Feed

Blockly.Blocks['Feed'] = {
    init: function() {
        this.jsonInit({
            "type": "Feed",
            "message0": '%{BKY_FEED_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Box"
                }
            ],
            "colour": BOX_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_FEED_TOOLTIP}"
        });
    }
}
Blockly.Python['Feed'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.feed(' + value_object + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}


// ITEMS

// Item: Box

Blockly.Blocks['Box'] = {
    init: function() {
        this.jsonInit({
            "type": "Box",
            "message0": '%{BKY_BOX1_TITLE}',
            "output": "Box",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_BOX1_TOOLTIP}"
        });
    }
}
Blockly.Python['Box'] = function(block) {
    var code = '\'box1\'';
    return [code, Blockly.Python.ORDER_NONE];
}


// Item: Egg

Blockly.Blocks['Egg'] = {
    init: function() {
        this.jsonInit({
            "type": "Egg",
            "message0": '%{BKY_EGG_TITLE}',
            "output": "Item",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_EGG_TOOLTIP}"
        });
    }
}
Blockly.Python['Egg'] = function(block) {
    var code = '\'egg\'';
    return [code, Blockly.Python.ORDER_NONE];
}


// Item: AGV

Blockly.Blocks['AGV'] = {
    init: function() {
        this.jsonInit({
            "type": "AGV",
            "message0": '%{BKY_AGV_TITLE}',
            "output": "AGV",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_AGV_TOOLTIP}"
        });
    }
}
Blockly.Python['AGV'] = function(block) {
    var code = '\'agv\'';
    return [code, Blockly.Python.ORDER_NONE];
}


// Item: Adult

Blockly.Blocks['Adult'] = {
    init: function() {
        this.jsonInit({
            "type": "Adult",
            "message0": '%{BKY_ADULT_TITLE}',
            "output": "Item",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_ADULT_TOOLTIP}"
        });
    }
}
Blockly.Python['Adult'] = function(block) {
    var code = '\'adult\'';
    return [code, Blockly.Python.ORDER_NONE];
}


// Item: Compartment

Blockly.Blocks['Compartment'] = {
    init: function() {
        this.jsonInit({
            "type": "Compartment",
            "message0": '%{BKY_COMPARTMENT_TITLE}',
            "output": "Item",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_COMPARTMENT_TOOLTIP}"
        });
    }
}
Blockly.Python['Compartment'] = function(block) {
    var code = '\'compartment\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['MoveTo'] = {
    init: function() {
        this.jsonInit({
            "type": "Move_To",
            "message0": '%{BKY_MOVE_TO_TITLE}',
            "args0": [
                {
                    "type": "field_number",
                    "name": "VALUE",
                    "value": 0,
                    "min": -999,
                    "max": 999,
                    "precision": 0.001
                }
            ],
            "message1": 'y%1',
            "args1": [
                {
                    "type": "field_number",
                    "name": "VALUE1",
                    "value": 0,
                    "min": -999,
                    "max": 999,
                    "precision": 0.001
                }
            ],
            "colour": MOVEMENT_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "inputsInline": true,
            "tooltip": "%{BKY_MOVE_TO_TOOLTIP}"
        });
    }
}

Blockly.Python['MoveTo'] = function(block) {
    var text_coordinates = block.getFieldValue('CX') + "," + block.getFieldValue('CY');
    var code = 'ROS.moveTo(' + text_coordinates + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['MoveToItem'] = {
    init: function() {
        this.jsonInit({
            "type": "Move_To_Item",
            "message0": '%{BKY_MOVE_TO_ITEM_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": ["Storage", "Storage"]
                }
            ],
            "colour": MOVEMENT_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_MOVE_TO_ITEM_TOOLTIP}"
        });
    }
}

Blockly.Python['MoveToItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.moveToItem(' + value_object + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['MoveItemTo'] = {
    init: function() {
        this.jsonInit({
            "type": "Move_Item_To",
            "message0": '%{BKY_MOVE_ITEM_TO_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Storage"
                }
            ],
            "message1": '%{BKY_MOVE_ITEM_TO_TITLE1}',
            "args1": [
                {
                    "type": "field_number",
                    "name": "CX",
                    "value": 0,
                    "min": -999,
                    "max": 999,
                    "precision": 0.001
                }
            ],
            "message2": 'y %1',
            "args2": [
                {
                    "type": "field_number",
                    "name": "CY",
                    "value": 0,
                    "min": -999,
                    "max": 999,
                    "precision": 0.001
                }
            ],
            "colour": ITEM_MOVEMENT_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "inputsInline": true,
            "tooltip": "%{BKY_MOVE_ITEM_TO_TOOLTIP}"
        });
    }
}

Blockly.Python['MoveItemTo'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var text_coordinates = block.getFieldValue('CX') + "," + block.getFieldValue('CY');
    var code = 'farm.moveItemTo(' + value_object + ', ' + text_coordinates + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['MoveItemToItem'] = {
    init: function() {
        this.jsonInit({
            "type": "Move_Item_To_Item",
            "message0": '%{BKY_MOVE_ITEM_TO_ITEM_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Storage"
                }
            ],
            "message1": '%{BKY_MOVE_ITEM_TO_ITEM_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": ["Storage", "Crate"]
                }
            ],
            "colour": ITEM_MOVEMENT_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_MOVE_ITEM_TO_ITEM_TOOLTIP}"
        });
    }
}

Blockly.Python['MoveItemToItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_NONE);
    var code = 'farm.moveItemToItem(' + value_object + ', ' + value_object1 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}
//
//Blockly.Blocks['ChangePopulationOfBox'] = {
//    init: function() {
//        this.appendDummyInput()
//            .appendField("Change population of box")
//            .appendField(new Blockly.FieldTextInput('1'));
//        this.setOutput(false, null);
//        this.setNextStatement(true);
//        this.setPreviousStatement(true);
//        this.setColour(BOX_INTERACTION_COLOR);
//        this.setTooltip("");
//        this.setHelpUrl("");
//    }
//}
//
//Blockly.Python['ChangePopulationOfBox'] = function(block) {
//    var text = block.getFieldValue('1');
//    var code = 'ROS.changePopulationOfBox(' + text + ')\n';
//    return code;
//}

Blockly.Blocks['Put'] = {
    init: function() {
        this.jsonInit({
            "type": "Put",
            "message0": '%{BKY_PUT_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Item"
                }
            ],
            "message1": '%{BKY_PUT_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Box"
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_PUT_TOOLTIP}"
        });
    }
}

Blockly.Python['Put'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.put(' + value_object + ', ' + value_object1 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['Take'] = {
    init: function() {
        this.jsonInit({
            "type": "Take",
            "message0": '%{BKY_TAKE_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Item"
                }
            ],
            "message1": '%{BKY_TAKE_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Box"
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_TAKE_TOOLTIP}"
        });
    }
}

Blockly.Python['Take'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.take(' + value_object + ', ' + value_object1 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['ChangeBoxOfItem'] = {
    init: function() {
        this.jsonInit({
            "type": "Change_Box_Of_Item",
            "message0": '%{BKY_CHANGE_BOX_OF_ITEM_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Item"
                }
            ],
            "message1": '%{BKY_CHANGE_BOX_OF_ITEM_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Box"
                }
            ],
            "message2": '%{BKY_CHANGE_BOX_OF_ITEM_TITLE2}',
            "args2": [
                {
                    "type": "input_value",
                    "name": "VALUE2",
                    "check": "Box"
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_CHANGE_BOX_OF_ITEM_TOOLTIP}"
        });
    }
}

Blockly.Python['ChangeBoxOfItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
    var value_object2 = Blockly.Python.valueToCode(block, 'VALUE2', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.changeBoxOfItem(' + value_object + ', ' + value_object1 + ', ' + value_object2 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

Blockly.Blocks['OnGesture'] = {
    init: function() {
        this.jsonInit({
            "type": "On_Gesture",
            "message0": '%{BKY_ON_EVENT_TITLE}',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "EVENT",
                    "options": [
                        [ "Gesture1", "gesture_1" ],
                        [ "Gesture2", "gesture_2" ]
                    ]
                }
            ],
            "message1": "%1",
            "args1": [
                {"type": "input_statement", "name": "NAME"}
            ],
            "colour": 0,
            "tooltip": "%{BKY_ON_EVENT_TOOLTIP}"
        });
    }
}


Blockly.Python['OnGesture'] = function(block) {
    var st = Blockly.Python.statementToCode(block, 'NAME');
    var value_event = block.getFieldValue('EVENT');
    return "def on_" + value_event + "():\n" + st + "\n";
}


// PHASE 3 INSECT FARM INTEGRATIONS
Blockly.Blocks['Place'] = {
    init: function() {
        this.jsonInit({
            "type": "Take",
            "message0": '%{BKY_PLACE_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Crate"
                }
            ],
            "message1": '%{BKY_PLACE_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Storage"
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_PLACE_TOOLTIP}"
        });
    }
}
Blockly.Python['Place'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_NONE);
    var code = 'farm.place(' + value_object + ',' + value_object1 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}


Blockly.Blocks['Deliver'] = {
    init: function() {
        this.jsonInit({
            "type": "Deliver",
            "message0": '%{BKY_DELIVER_TITLE}',
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Crate"
                }
            ],
            "message1": '%{BKY_DELIVER_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Storage"
                }
            ],
            "colour": ITEM_INTERACTION_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_DELIVER_TOOLTIP}"
        });
    }
}
Blockly.Python['Deliver'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_NONE);
    var code = 'farm.deliver(' + value_object + ',' + value_object1 + ')\n';
    Blockly.Python.definitions_['import_farm'] = COROSECT_FARM_IMPORT;
    return code;
}

// PHASE 3 INTEGRATION ITEMS
let numCrates = 10;
for(let i = 0; i < numCrates; i++) {
    Blockly.Blocks['Crate_' + i] = {
        init: function() {
            this.jsonInit({
                "type": "Crate",
                "message0": '%{BKY_CRATE_TITLE} ' + i,
                "output": "Crate",
                "colour": VARIABLE_COLOR,
                "tooltip": "%{BKY_CRATE_TOOLTIP}"
            });
        }
    }
    Blockly.Python['Crate_' + i] = function(block) {
        var code = '\'' + i + '\'';
        return [code, Blockly.Python.ORDER_NONE];
    }
}

// PHASE 3 INTEGRATION ITEMS
let numStorages = 10;
for(let i = 0; i < numStorages; i++) {
    Blockly.Blocks['Storage_' + i] = {
        init: function() {
            this.jsonInit({
                "type": "Storage",
                "message0": '%{BKY_STORAGE_TITLE} ' + i,
                "output": "Storage",
                "colour": VARIABLE_COLOR,
                "tooltip": "%{BKY_STORAGE_TOOLTIP}"
            });
        }
    }
    Blockly.Python['Storage_' + i] = function(block) {
        var code = '\'' + i + '\'';
        return [code, Blockly.Python.ORDER_NONE];
    }
}

Blockly.Blocks['Arm'] = {
    init: function() {
        this.jsonInit({
            "type": "Storage",
            "message0": '%{BKY_ARM_TITLE}',
            "output": "Storage",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_ARM_TOOLTIP}"
        });
    }
}
Blockly.Python['Arm'] = function(block) {
    var code = '\'arm\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['Workspace'] = {
    init: function() {
        this.jsonInit({
            "type": "Storage",
            "message0": 'Workspace',
            "output": "Storage",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_BOX1_TOOLTIP}"
        });
    }
}
Blockly.Python['Workspace'] = function(block) {
    var code = '\'workspace\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['AGV'] = {
    init: function() {
        this.jsonInit({
            "type": "Storage",
            "message0": '%{BKY_AGV_TITLE}',
            "output": "Storage",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_AGV_TOOLTIP}"
        });
    }
}
Blockly.Python['AGV'] = function(block) {
    var code = '\'agv\'';
    return [code, Blockly.Python.ORDER_NONE];
}