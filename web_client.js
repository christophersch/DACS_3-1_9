function sendRequest() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://blockly.ingoh.net", true);
    var workspace = Blockly.getMainWorkspace();
    var code = Blockly.Python.workspaceToCode(workspace);
    request.responseType = "text";
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            console.log(response);
            document.getElementById("outputText").innerHTML = response.replaceAll("\n", "<br>");
        }
    }
    var token = document.getElementById("token").value;
    request.send("<<blockly>>" + code + "<</blockly>><<token>>" + token + "<</token>>");
}