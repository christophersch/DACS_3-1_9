function printAllDefinedBlockNames() {
    var blocks = Blockly.Blocks;
    for (var blockName in blocks) {
        console.log(blockName);
    }
}

printAllDefinedBlockNames();