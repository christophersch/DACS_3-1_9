// Sends the code that was generated from the blocks that are currently in the workspace to other parts of the insect
// farm and outputs the result on the interface
function sendRequest() {
    var token = document.getElementById("token").value;
    var request = new XMLHttpRequest();
    var ip = document.getElementById("ip").value === "" ? "localhost:5000" : document.getElementById("ip").value;
    if (!ip.includes("://")) {
        ip = "http://" + ip;
    }
    var strippedIp = ip;
    if (ip.includes("://")) {
        strippedIp = ip.split("://")[1];
    }
    if (!strippedIp.includes(':') && !strippedIp.endsWith('/')) {
        ip += ":5000";
    }
    request.open("POST", ip + "?token=" + token, true);
    var workspace = Blockly.getMainWorkspace();
    var codeOrig = Blockly.Python.workspaceToCode(workspace);
    var code = workspaceToCodeDebug(workspace);

    request.responseType = "text";
        console.log(request)
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            console.log(response);
            document.getElementById("outputText").innerHTML = response.replaceAll("\n", "<br>");
            document.getElementById("outputText").style.color = "";
        } else if (request.readyState == 4 && request.status != 200) {
            var response = request.responseText;
            console.log(response);
            document.getElementById("outputText").innerHTML = response.replaceAll("\n", "<br>");
            document.getElementById("outputText").style.color = "red";
        }
    }
    request.onerror = function() {
            if (request.status == 0) {
                document.getElementById("outputText").innerHTML = "Connection refused. Please check your IP and port.";
                document.getElementById("outputText").style.color = "red";
            } else {
                document.getElementById("outputText").innerHTML = "An error occured. Please try again.";
                document.getElementById("outputText").style.color = "red";
            }
    }
    document.getElementById("outputText").innerHTML = "Sending request...";
    document.getElementById("outputText").style.color = "#3F51B5";
    request.send(code);
}

function showError() {
    var output = document.getElementById("outputText").innerHTML;
    if (output.includes("[ERROR]")) {
        var index = output.substring(29).split(":");
        var blockCode = index[0];
        if (parseInt(blockCode)){
            blockCode = index[1].split("<br>")[0];
            alert(blockCode)
        }
        alert(blockCode);
        try {
            var workspace = Blockly.getMainWorkspace();
            const blocks = workspace.getTopBlocks(true);
            for (let i = 0, block; (block = blocks[i]); i++) {
                var func = blockToCodeDebug(block);
                if (Array.isArray(func)) {
                    func = func[0];
                }
                alert(func)
                // var block4 = workspace.newBlock("logic_boolean");
                // block4.initSvg();
                // block4.moveBy(10, 10);
                // block4.render();
                // workspace.clear();
                // workspace.render();
            }

        } catch (e) {
            // ignore
        }

    }
}