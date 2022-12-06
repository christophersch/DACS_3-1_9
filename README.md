**Running Blockly locally:**  
Pull the `python-server` branch, create a `token.txt` with a string of your choice, then run `run_server.bat`.  
In `web_client.js` (`blockly` branch), change the `request.open()` line URL to `"http://localhost:5000"`.  
Open `index.html` (`blockly` branch) using a web browser and input the created token.