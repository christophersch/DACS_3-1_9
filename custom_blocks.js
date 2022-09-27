Blockly.Blocks['test_block'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('Test Block');
        this.setOutput(true, 'Number');
        this.setColour(255);
        this.setTooltip('This is a test.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['block_two'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField('Another');
        this.setColour(100);
        this.setTooltip('Second Test Block');
        this.setHelpUrl('http://www.example.com/');
    }
};