function sendRequest() {
    var token = document.getElementById("token").value;
    var request = new XMLHttpRequest();
    var ip = document.getElementById("ip").value === "" ? "localhost:5000" : document.getElementById("ip").value;
    if (!ip.startsWith("http://")) {
        ip = "http://" + ip;
    }
    if (!ip.includes(':') && !ip.endsWith('/')) {
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