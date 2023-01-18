from flask import Flask, request
from waitress import serve
from markupsafe import escape
import subprocess
import sys
import os

app = Flask(__name__)

@app.route('/', defaults={'path': ''}, methods=['POST'])
@app.route('/<path:path>', methods=['POST'])
def catch_all(path):
    print('new request')
    token = request.args.get('token', default = '', type = str)
    correct_token = open("token.txt", "r").read()

    token = token.replace("\n", "")
    correct_token = correct_token.replace("\n", "")

    code = request.get_data().decode("utf-8")

    if token == correct_token:
        with open("_blockly.py", "w") as f:
            f.write(code)
        with open("_blockly.log", "w") as f:
            with open("_blockly.err", "w") as e:
                subprocess.call([sys.executable, "_blockly.py"], stdout=f, stderr=e)
        log = open("_blockly.log", "r").read()
        if os.stat("_blockly.err").st_size != 0:
            err = open("_blockly.err", "r").read().split("\n")
            line, mistake, reason = err[-4].split(", line")[-1].split(", in")[0], err[-3], err[-2]
            log = "[ERROR] An error occurred at {}: {}\n\nReason: {}".format(line, mistake, reason)
        os.remove("_blockly.py")
        os.remove("_blockly.log")
        os.remove("_blockly.err")
        response = app.response_class(
            response=log,
            status=200,
            mimetype='text/plain'
        )
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
    else:
        msg = "Invalid token."
        response = app.response_class(
            response=msg,
            status=403,
            mimetype='text/plain'
        )
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

serve(app, host='0.0.0.0', port=9000)
