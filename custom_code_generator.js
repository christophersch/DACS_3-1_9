var origFuncs = {};

window.onload = function () {
    var toolbox = document.getElementById('toolbox');
    var blocks = toolbox.getElementsByTagName('block');
    for (var i = 0; i < blocks.length; i++) {
        var func = Blockly.Python[blocks[i].getAttribute('type')];
        origFuncs[blocks[i].getAttribute('type')] = func;
        if (typeof func === 'function') {
            Blockly.Python[blocks[i].getAttribute('type')] = withDebugCode();
        }
    }
}

function withDebugCode() {
    return function (block) {
        var code = origFuncs[block.type](block);
        if (typeof code === 'string') {
            code = (getDebugPrefix(block) + code + getDebugSuffix(block));
        }
        return code;
    }
}


function getDebugPrefix(block) {
    // Get index of block in current workspace
    var index = block.workspace.getAllBlocks().indexOf(block);
    return "\nprint('starting block: " + block.type + " at index: " + index + "')\n";
}

function getDebugSuffix(block) {
    // Get index of block in current workspace
    var index = block.workspace.getAllBlocks().indexOf(block);
    return "\nprint('finished block: " + block.type + " at index: " + index + "')\n";
}

function workspaceToCodeDebug(workspace) {
    if (!workspace) {
        // Backwards compatibility from before there could be multiple workspaces.
        console.warn(
            'No workspace specified in workspaceToCode call.  Guessing.');
        workspace = common.getMainWorkspace();
    }
    if (!Blockly.Python.isInitialized) {
        Blockly.Python.init(workspace);
    }
    document.getElementById("debugText1").innerHTML = "";
    document.getElementById("debugText2").innerHTML = "";
    let code = [];
    const blocks = workspace.getTopBlocks(true);
    for (let i = 0, block; (block = blocks[i]); i++) {



        let line = blockToCodeDebug(block);
        if (Array.isArray(line)) {
            // Value blocks return tuples of code and operator order.
            // Top-level blocks don't care about operator order.
            line = line[0];
        }
        if (line) {
            if (block.outputConnection) {
                // t block is a naked value.  Ask the language's code generator if
                // it wants to append a semicolon, or something.
                line = Blockly.Python.scrubNakedValue(line);
                if (Blockly.Python.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
                    line = Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block) + line;
                }
                if (Blockly.Python.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
                    line = line + Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block);
                }
            }
            code.push(line);
        }
    }
    code = code.join('\n');  // Blank line between each section.
    code = Blockly.Python.finish(code);
    // Final scrubbing of whitespace.
    code = code.replace(/^\s+\n/, '');
    code = code.replace(/\n\s+$/, '\n');
    code = code.replace(/[ \t]+\n/g, '\n');

    var code2 = document.getElementById("debugText1").innerHTML.replace(/^ /gm, ' \u00A0');
    code2 = code2.replace(/\n/g, '<br>');
    document.getElementById("debugText1").innerHTML = code2;

    return code;
}


function blockToCodeDebug(block, opt_thisOnly) {
    if (Blockly.Python.isInitialized === false) {
        console.warn(
            'Generator init was not called before blockToCode was called.');
    }
    if (!block) {
        return '';
    }
    if (!block.isEnabled()) {
        // Skip past this block if it is disabled.
        return opt_thisOnly ? '' : Blockly.Python.blockToCode(block.getNextBlock());
    }
    if (block.isInsertionMarker()) {
        // Skip past insertion markers.
        return opt_thisOnly ? '' : Blockly.Python.blockToCode(block.getChildren(false)[0]);
    }

    const func = Blockly.Python[block.type];
    if (typeof func !== 'function') {
        throw Error(
            'Language "' + Blockly.Python.name_ + '" does not know how to generate ' +
            'code for block type "' + block.type + '".');
    }
    // First argument to func.call is the value of 'this' in the generator.
    // Prior to 24 September 2013 'this' was the only way to access the block.
    // The current preferred method of accessing the block is through the second
    // argument to func.call, which becomes the first parameter to the
    // generator.
    let code = func.call(block, block);
    if (Array.isArray(code)) {
        // Value blocks return tuples of code and operator order.
        if (!block.outputConnection) {
            throw TypeError('Expecting string from statement block: ' + block.type);
        }
        var c = [Blockly.Python.scrub_(block, code[0], opt_thisOnly), code[1]];

        var fullDebugCode = "<span title='" + block.type + "' style='color:" + block.getColour() + "'>" + c[0] + "</span>";

        document.getElementById("debugText1").innerHTML += fullDebugCode + "<br>";
        document.getElementById("debugText2").innerHTML += block + "<br>";
        return c;
    } else if (typeof code === 'string') {
        if (Blockly.Python.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
            code = Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block) + code;
        }
        if (Blockly.Python.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
            code = code + Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block);
        }
        var c = Blockly.Python.scrub_(block, code, opt_thisOnly);

        var currentBlock = block;

        while (currentBlock != null) {
            currentBlock = currentBlock.getNextBlock();
        }

        var fullDebugCode = "<span title='" + block.type + "' style='color:" + block.getColour() + "'>" + c + "</span>";

        document.getElementById("debugText1").innerHTML += fullDebugCode + "<br>";
        document.getElementById("debugText2").innerHTML += block + "<br>";

        return c;
    } else if (code === null) {
        // Block has handled code generation itself.
        return '';
    }
    throw SyntaxError('Invalid code generated: ' + code);
}