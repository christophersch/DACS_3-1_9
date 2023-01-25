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
                    "check": ["Item", "Box"]
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
                    "check": "Item"
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
    var code = 'ROS.moveItemTo(' + value_object + ', ' + text_coordinates + ')\n';
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
                    "check": "Item"
                }
            ],
            "message1": '%{BKY_MOVE_ITEM_TO_ITEM_TITLE1}',
            "args1": [
                {
                    "type": "input_value",
                    "name": "VALUE1",
                    "check": "Box"
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
    var value_object = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var value_object1 = Blockly.Python.valueToCode(block, 'VALUE1', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.moveItemToItem(' + value_object + ', ' + value_object1 + ')\n';
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
    var code = "def on_" + value_event + "():\n" + st + "\n";
    return code;
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
                    "check": "Surface"
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
            "type": "Surface",
            "message0": 'Workspace',
            "output": "Surface",
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
            "type": "Surface",
            "message0": '%{BKY_AGV_TITLE}',
            "output": "Surface",
            "colour": VARIABLE_COLOR,
            "tooltip": "%{BKY_AGV_TOOLTIP}"
        });
    }
}
Blockly.Python['AGV'] = function(block) {
    var code = '\'agv\'';
    return [code, Blockly.Python.ORDER_NONE];
}




// Blockly.Blocks['print'] = {
//     init: function() {
//         this.appendValueInput("VALUE")
//             .setCheck(null)
//             .appendField("print");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(50);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// };
//
// Blockly.Python['print'] = function(block) {
//     var print = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
//     var code = "print(" + print + ")\n";
//     return code;
// }
//
//
// Blockly.Blocks['add'] = {
//     init: function() {
//         this.appendValueInput("A")
//             .setCheck("Number");
//         this.appendValueInput("B")
//             .setCheck("Number")
//             .appendField("+");
//         this.setInputsInline(true);
//         this.setOutput(true, "Number");
//         this.setColour(100);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// };
//
// Blockly.Python['add'] = function(block) {
//     var value_a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC);
//     var value_b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
//     var code = value_a + " + " + value_b;
//     return [code, Blockly.Python.ORDER_NONE];
// }
//
//
// Blockly.Blocks['pi'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("pi");
//         this.setOutput(true, null);
//         this.setColour(150);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// }
//
// Blockly.Python['pi'] = function(block) {
//     var code = "3.14159265359";
//     return [code, Blockly.Python.ORDER_NONE];
// }
//
//
// Blockly.Blocks['loop count'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("loop")
//             .appendField(new Blockly.FieldNumber(5, 1, 100, 1), "NAME")
//             .appendField("times");
//         this.appendStatementInput("NAME")
//             .setCheck(null);
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(200);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// }
//
// Blockly.Python['loop count'] = function(block) {
//     var number_name = block.getFieldValue('NAME');
//     var statements_name = Blockly.Python.statementToCode(block, 'NAME');
//     var code = "for i in range(" + number_name + "):\n" + statements_name;
//     return code;
// }
//
// Blockly.Blocks['round'] = {
//     init: function() {
//         this.appendValueInput("NAME")
//             .setCheck("Number")
//             .appendField("round");
//         this.setOutput(true, null);
//         this.setColour(250);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     }
// }
//
// Blockly.Python['round'] = function(block) {
//     var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
//     var code = "round(" + value_name + ")";
//     return [code, Blockly.Python.ORDER_NONE];
// }

//Math constants and random

//Multi threading
//Goal: present for every function defined using blockly, provide an object constructor for a future of this function as by https://docs.python.org/3/library/concurrent.futures.html considering args
//and a method to execute .result() on it, considering returns
const PARALLEL_PROGRAMMING_COLOR = 310
Blockly.Blocks['future_of_procedures'] = {
    init: function (){
        this.jsonInit({
            'type': 'future',
            'message0': '%1 %2', //TODO
            'args0': [
                {'type': 'field_label', 'name': 'NAME', 'text': '%{BKY_UNNAMED_KEY}'},
                {
                    'type': 'input_dummy',
                    'name': 'TOPROW',
                },
            ],
            'output': 'Future',
            "colour": PARALLEL_PROGRAMMING_COLOR,
            'extensions': [ //?
                'procedure_caller_get_def_mixin',
                'procedure_caller_update_shape_mixin',
                'procedure_caller_context_menu_mixin',
                'procedure_caller_onchange_mixin',
                'procedure_callerreturn_get_def_block_mixin',
            ],
            'mutator': 'procedure_caller_mutator', //?
        })
    }
}

Blockly.Python['future_of_procedures'] = function(block) {
    // submit a procedure with a return value to the executor.
    Blockly.Python.definitions_['import_executor'] = "from concurrent.futures import ThreadPoolExecutor"
    Blockly.Python.definitions_['x_construct_executor'] = "executor: ThreadPoolExecutor = ThreadPoolExecutor()"
    const funcName =
        Blockly.Python.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.PROCEDURE);
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = Python.valueToCode(block, 'ARG' + i, Python.ORDER_NONE) || 'None';
    }
    let code = "executor.submit("+funcName
    if(args.length > 0) code += ',' + args.join(', ')
    code += ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};


Blockly.Blocks['result'] = {
    init: function (){
        this.jsonInit({
            "type":"result",
            "message0": "%{BKY_RESULT_MESSAGE0}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Future"
                }
            ],
            "output": null,
            "colour": PARALLEL_PROGRAMMING_COLOR,
            "tooltip": "%{BKY_RESULT_TOOLTIP}"
        })
    }
}

Blockly.Python['result'] = function(block){
    return [Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL)+".result()",Blockly.Python.ORDER_ATOMIC]
}

Blockly.Blocks['wait_for_future'] = {
    init: function (){
        this.jsonInit({
            "type":"result",
            "message0": "%{BKY_WAIT_FOR_MESSAGE0}",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Future"
                }
            ],
            "colour": PARALLEL_PROGRAMMING_COLOR,
            "previousStatement": "",
            "nextStatement": "",
            "tooltip": "%{BKY_WAIT_FOR_TOOLTIP}"
        })
    }
}
Blockly.Python['wait_for_future'] = function(block){
    return Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_FUNCTION_CALL)+".result()"
}

//TODO Try-catch
//Goal: an if-else like (without the if condition) implementation of a try-catch block, where if it catches is determent by if the type of the examption matches a string, or its cause