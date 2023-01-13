function createBlockInWorkspace(workspace, name, x, y, attachTo) {
    if (!name.includes(",")) {
        var block = workspace.newBlock(name);
        block.initSvg();
        block.render();
        block.moveBy(x, y);
        if (attachTo) {
            block.previousConnection.connect(attachTo.nextConnection);
        }
        return block;
    }

    var blockName = name.split(",")[0];
    var block = workspace.newBlock(blockName);
    block.initSvg();
    block.render();
    block.moveBy(x, y);
    for (var i = 1; i < name.split(",").length; i++) {
        var input = name.split(",")[i];
        if (input.startsWith("#")) {
            var field = block.inputList[i - 1].fieldRow;
            for (var j = 0; j < field.length; j++) {
                if (field[j].EDITABLE) {
                    field[j].setValue(input.substring(1));
                }
            }
        } else if (input.startsWith("$")) {
            var variable = workspace.getVariable(input.substring(1));
            if (!variable) {
                variable = workspace.createVariable(input.substring(1));
            }
            var varBlock = workspace.newBlock("variables_get");
            varBlock.initSvg();
            varBlock.render();
            varBlock.setFieldValue(variable.getId(), "VAR");
            block.inputList[i - 1].connection.connect(varBlock.outputConnection);
        } else if (input.startsWith("@")) {
            block.setOutput(true, input.substring(1));
        } else {
            var newBlock = createBlockInWorkspace(workspace, input, x, y, null);
            block.inputList[i - 1].connection.connect(newBlock.outputConnection);
        }
    }
    if (attachTo) {
        block.previousConnection.connect(attachTo.nextConnection);
    }
    return block;
}

function createBlock(name, x, y, attachTo) {
    return createBlockInWorkspace(Blockly.getMainWorkspace(), name, x, y, attachTo);
}

function createChainOfBlocksInWorkspace(workspace, names, x, y, attachTo) {
    var block = null;
    for (var i = 0; i < names.length; i++) {
        block = createBlockInWorkspace(workspace, names[i], x, y, attachTo);
        attachTo = block;
    }
    return block;
}

function createChainOfBlocks(names, x, y, attachTo) {
    return createChainOfBlocksInWorkspace(Blockly.getMainWorkspace(), names, x, y, attachTo);
}