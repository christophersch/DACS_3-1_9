**Running Blockly locally:**  
Pull the `python-server` branch, create a `token.txt` with a string of your choice, then run `localserver.py`.  
In `web_client.js` (`blockly` branch), change the `request.open()` line URL to `"localhost"`.  
Open `index.html` (`blockly` branch) using a web browser and input the created token.