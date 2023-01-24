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

//Multi threading

//creates a value representing the future return of several commands
Blockly.Blocks['Multi threading submit'] = {
    //TODO check format
    init: function() {
        this.jsonInit({
            "colour": OTHER_COLOR,
            "output": 'Future',
            "args0": [
                {"type": "input_statement", "name":"mt_code_input_field"}
            ],
            "name": "%{MT_SUBMIT_NAME}",
            "tooltip": "%{MT_SUBMIT_TOOLTIP}",
            "message0": "%{MT_SUBMIT_M0} %1"
        });
    }
}

let funIndex = 0
Blockly.Python['Multi threading submit'] = function (block){
    let i = funIndex++
    let Python = Blockly.Python, NameType = Blockly.Names, Variables = Blockly.Variables
    const globals = [];
    const workspace = block.workspace;
    const usedVariables = Variables.allUsedVarModels(workspace) || [];
    for (let i = 0, variable; (variable = usedVariables[i]); i++) {
        const varName = variable.name;
        if (block.getVars().indexOf(varName) === -1) {
            globals.push(Python.nameDB_.getName(varName, NameType.VARIABLE));
        }
    }
    // Add developer variables.
    const devVarList = Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
        globals.push(
            Python.nameDB_.getName(devVarList[i], NameType.DEVELOPER_VARIABLE));
    }

    const globalString = globals.length ?
        Python.INDENT + 'global ' + globals.join(', ') + '\n' :
        '';
    const funcName = "mt_fun_"+i;
    let xfix1 = '';
    if (Python.STATEMENT_PREFIX) {
        xfix1 += Python.injectId(Python.STATEMENT_PREFIX, block);
    }
    if (Python.STATEMENT_SUFFIX) {
        xfix1 += Python.injectId(Python.STATEMENT_SUFFIX, block);
    }
    if (xfix1) {
        xfix1 = Python.prefixLines(xfix1, Python.INDENT);
    }
    let loopTrap = '';
    if (Python.INFINITE_LOOP_TRAP) {
        loopTrap = Python.prefixLines(
            Python.injectId(Python.INFINITE_LOOP_TRAP, block), Python.INDENT);
    }
    let branch = Python.statementToCode(block, 'STACK');
    let returnValue =
        Python.valueToCode(block, 'RETURN', Python.ORDER_NONE) || '';
    let xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = Python.INDENT + 'return ' + returnValue + '\n';
    } else if (!branch) {
        branch = Python.PASS;
    }
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
        args[i] = Python.nameDB_.getName(variables[i], NameType.VARIABLE);
    }
    let code = 'def ' + funcName + '():\n' + globalString +
        xfix1 + loopTrap + branch + xfix2 + returnValue;
    code = Python.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Python.definitions_['%' + funcName] = code;

    //TODO solve
    code += "ret:Future = executor.submit("+funcName+")"
    Python.definitions_['import_mt_ThreadPoolExecutor'] = "from concurrent.futures import ThreadPoolExecutor\n executor: ThreadPoolExecutor = ThreadPoolExecutor()";
    //TODO return as blockly ret as a Future
    return [code, Blockly.Python.ORDER_ATOMIC];
}

//Blockly holds Future
//TODO implement
Blockly.Blocks['Multi threading Future'] = {
    init: function() {
        this.jsonInit({

        })
    }
}
Blockly.Python['Multi threading Future'] = function (block){
    Blockly.Python.definitions_['import_mt_Future'] = "from concurrent.futures import Future"
}

//Turns Future into actual object, if thread non yet completed, waits until completion
//TODO implement
Blockly.Blocks['Multi threading wait for'] = {
    init: function() {
        this.jsonInit({
            "colour": OTHER_COLOR,
            "name": "%{MT_WAIT_NAME}",
            "tooltip": "%{MT_WAIT_TOOLTIP}",
            "message0": "%{MT_WAIT_M0} %1",
            "args0":[{"type":"input_value","check":"Future","name":"mt_future"}],
            "nextStatement": null,
            "previousStatement": null
        })
    }
}
Blockly.Python['Multi threading wait for'] = function (block){
    Blockly.Python.definitions_['import_mt_Future'] = "from concurrent.futures import Future"
    return Blockly.Python.valueToCode(block,'mt_future',Blockly.Python.ORDER_ATOMIC)+".result()"
}
//Exemptions