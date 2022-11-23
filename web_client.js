const REQUEST_URL = "http://localhost:80/"

function sendRequest() {
    var request = new XMLHttpRequest();
    request.open("POST", REQUEST_URL, true);
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
    var token = document.getElementById("token").value;
    request.send("<<blockly>>" + code + "<</blockly>><<token>>" + token + "<</token>>");
    console.log("fuck");
}