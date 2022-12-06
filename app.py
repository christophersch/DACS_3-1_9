from flask import Flask, request
from waitress import serve
from markupsafe import escape
import subprocess
import sys
import os

app = Flask(__name__)

@app.route('/code', methods=['POST'])
def receive():
    token = request.args.get('token', default = '', type = str)
    code = request.get_data()
    if token == open("token.txt", "r").read():
        with open("_blockly.py", "w") as f:
            f.write(code)
        with open("_blockly.log", "w") as f:
            with open("_blockly.err", "w") as e:
                subprocess.call([sys.executable, "_blockly.py"], stdout=f, stderr=e)
        log = open("_blockly.log", "r").read()
        if os.stat("_blockly.err").st_size != 0:
            log = "[ERROR] An error occured while running the code."
        os.remove("_blockly.py")
        os.remove("_blockly.log")
        os.remove("_blockly.err")
        return log
    else:
        return "Invalid token."

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "Use POST to " + request.host + "/code with a token argument and the code in the body."

serve(app, host='0.0.0.0', port=5000)
