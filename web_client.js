const REQUEST_URL_LOCAL = "http://localhost:5000";
const REQUEST_URL_SERVER  = "http://blockly.ingoh.net:5000"

function sendRequest() {
    var token = document.getElementById("token").value;
    var local = document.getElementById("local").checked;
    var request = new XMLHttpRequest();
    if (local) request.open("GET", REQUEST_URL_LOCAL + "?token=" + token, true);
    else request.open("GET", REQUEST_URL_SERVER + "?token=" + token, true);
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
        }
    }
    request.send(code);
}