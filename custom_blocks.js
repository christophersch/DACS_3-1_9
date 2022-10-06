Blockly.Blocks['print'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("print");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(50);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Python['print'] = function(block) {
    var print = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    var code = "print(" + print + ")\n";
    return code;
}


Blockly.Blocks['add'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("+");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(100);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Python['add'] = function(block) {
    var value_a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC);
    var value_b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC);
    var code = value_a + " + " + value_b;
    return [code, Blockly.Python.ORDER_NONE];
}


Blockly.Blocks['pi'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("pi");
        this.setOutput(true, null);
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['pi'] = function(block) {
    var code = "3.14159265359";
    return [code, Blockly.Python.ORDER_NONE];
}


Blockly.Blocks['loop count'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("loop")
            .appendField(new Blockly.FieldNumber(5, 1, 100, 1), "NAME")
            .appendField("times");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Python['loop count'] = function(block) {
    var number_name = block.getFieldValue('NAME');
    var statements_name = Blockly.Python.statementToCode(block, 'NAME');
    var code = "for i in range(" + number_name + "):\n" + statements_name;
    return code;
}