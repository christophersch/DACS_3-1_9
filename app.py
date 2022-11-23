from flask import Flask, request
from markupsafe import escape
import subprocess
import sys
import os

app = Flask(__name__)

@app.route('/code')
def receive():
    token = request.args.get('token', default = '', type = str)
    code = request.args.get('code', default = '', type = str)
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