const MOVEMENT_COLOR = 10;
const VARIABLE_COLOR = 70;
const ITEM_MOVEMENT_COLOR = 130;
const ITEM_INTERACTION_COLOR = 190;
const BOX_INTERACTION_COLOR = 250;
const OTHER_COLOR = 310;

Blockly.Blocks['Grab'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck(["Item", "Box"])
            .appendField("Grab");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_INTERACTION_COLOR);
        this.setTooltip("grabs the item");
        this.setHelpUrl("");
    }
}
Blockly.Python['Grab'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.grab(' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['Drop'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck(["Item", "Box"])
            .appendField("Drop");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_INTERACTION_COLOR);
        this.setTooltip("drops the item");
        this.setHelpUrl("");
    }
}

Blockly.Python['Drop'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.drop(' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['Feed'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck("Box")
            .appendField("Feed");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(BOX_INTERACTION_COLOR);
        this.setTooltip("Feeds the box");
        this.setHelpUrl("");
    }
}

Blockly.Python['Feed'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'OBJECT', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.feed(' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['Box'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Box1");
        this.setOutput(true, "Box");
        this.setColour(VARIABLE_COLOR);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['Box'] = function(block) {
    var code = '\'box1\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['Egg'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Egg");
        this.setOutput(true, "Item");
        this.setColour(VARIABLE_COLOR);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['Egg'] = function(block) {
    var code = '\'egg\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['AGV'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("AGV");
        this.setOutput(true, "AGV");
        this.setColour(VARIABLE_COLOR);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['AGV'] = function(block) {
    var code = '\'agv\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['Adult'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Adult");
        this.setOutput(true, "Item");
        this.setColour(VARIABLE_COLOR);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['Adult'] = function(block) {
    var code = '\'adult\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['Compartment'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Compartment");
        this.setOutput(true, "Item");
        this.setColour(VARIABLE_COLOR);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['Compartment'] = function(block) {
    var code = '\'compartment\'';
    return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['MoveTo'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Move AGV to")
            .appendField(new Blockly.FieldTextInput('Coordinates'));
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(MOVEMENT_COLOR);
        this.setTooltip("Moves the coordinates");
        this.setHelpUrl("");
    }
}

Blockly.Python['MoveTo'] = function(block) {
    var text_coordinates = block.getFieldValue('Coordinates');
    var code = 'ROS.moveTo(' + text_coordinates + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['MoveToItem'] = {
    init: function() {
        this.appendValueInput("Object")
            .appendField("Move AGV to")
            .setCheck(["Item", "Box"]);
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(MOVEMENT_COLOR);
        this.setTooltip("Moves towards the item");
        this.setHelpUrl("");
    }
}

Blockly.Python['MoveToItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.moveToItem(' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['MoveItemTo'] = {
    init: function() {
        this.appendValueInput("Object")
            .appendField("Move");
        this.appendDummyInput()
            .appendField("To")
            .appendField(new Blockly.FieldTextInput('Coordinates'));
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_MOVEMENT_COLOR);
        this.setTooltip("grabs the item and moves it to the coordinates");
        this.setHelpUrl("");
    }
}

Blockly.Python['MoveItemTo'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var text_coordinates = block.getFieldValue('Coordinates');
    var code = 'ROS.moveItemTo(' + value_object + ', ' + text_coordinates + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

    Blockly.Blocks['MoveItemToItem'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck("Item")
            .appendField("Move");
        this.appendValueInput("Object")
            .setCheck("Box")
            .appendField("To");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_MOVEMENT_COLOR);
        this.setTooltip("grabs the item and moves it to the box");
        this.setHelpUrl("");
    }
}

Blockly.Python['MoveItemToItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.moveItemToItem(' + value_object + ', ' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
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
        this.appendValueInput("OBJECT")
            .setCheck("Item")
            .appendField("Put");
        this.appendValueInput("Object")
            .setCheck("Box")
            .appendField("To");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_INTERACTION_COLOR);
        this.setTooltip("");
        this.setHelpUrl("Puts an item in the box");
    }
}

Blockly.Python['Put'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.put(' + value_object + ', ' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['Take'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck("Item")
            .appendField("Take");
        this.appendValueInput("Object")
            .setCheck("Box")
            .appendField("From");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_INTERACTION_COLOR);
        this.setTooltip("Takes an item from the box");
        this.setHelpUrl("");
    }
}

Blockly.Python['Take'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.take(' + value_object + ', ' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
    return code;
}

Blockly.Blocks['ChangeBoxOfItem'] = {
    init: function() {
        this.appendValueInput("OBJECT")
            .setCheck("Item")
            .appendField("Move");
        this.appendValueInput("Object")
            .setCheck("Box")
            .appendField("From");
        this.appendValueInput("Object")
            .setCheck("Box")
            .appendField("To");
        this.setOutput(false, null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
        this.setColour(ITEM_INTERACTION_COLOR);
        this.setTooltip("Relocates the item from box to box");
        this.setHelpUrl("");
    }
}

Blockly.Python['ChangeBoxOfItem'] = function(block) {
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var value_object = Blockly.Python.valueToCode(block, 'Object', Blockly.Python.ORDER_ATOMIC);
    var code = 'ROS.changeBoxOfItem(' + value_object + ', ' + value_object + ', ' + value_object + ')\n';
    Blockly.Python.definitions_['import_ros'] = 'import ROS';
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