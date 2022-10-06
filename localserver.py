import socket
import subprocess
import sys
import os

SERVER = socket.gethostbyname("localhost")
PORT = 80

print("Starting server on", SERVER, "port", PORT)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((SERVER, PORT))
    s.listen()
    while True:
        try:
            conn, addr = s.accept()
            with conn:
                print(f"Connected by {addr}")
                while True:
                    data = conn.recv(2147483647)
                    if data:
                        print(f"Received {data!r}")
                        if data.startswith(b"POST"):
                            if b"<<token>>" in data and b"<</token>>" in data[data.find(b"<<token>>") + 9:]:
                                token = data[data.find(b"<<token>>") + 9:data.find(b"<</token>>")]
                                print(f"Token: {token}")
                                if token != open("token.txt", "rb").read():
                                    print("Invalid token")
                                    conn.sendall(b"HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/plain\r\n\r\n[ERROR] Invalid token")
                                    break
                            else:
                                print("No token")
                                conn.sendall(b"HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/plain\r\n\r\n[ERROR] No token")
                                break

                            if b"<<blockly>>" in data and b"<</blockly>>" in data[data.find(b"<<blockly>>") + 11:]:
                                parsed = data[data.find(b"<<blockly>>") + 11:data.find(b"<</blockly>>")]
                                print(f"Parsed {parsed!r}")

                                with open("_blockly.py", "wb") as f:
                                    f.write(parsed)
                                
                                with open("_blockly.log", "wb") as f:
                                    with open("_blockly.err", "wb") as e:
                                        subprocess.call([sys.executable, "_blockly.py"], stdout=f, stderr=e)

                                log = open("_blockly.log", "rb").read()

                                if os.stat("_blockly.err").st_size != 0:
                                    log = b"[ERROR] An error occured while running the code."
                                
                                os.remove("_blockly.py")
                                os.remove("_blockly.log")
                                os.remove("_blockly.err")
                    
                                conn.sendall(b"HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/plain\r\n\r\n" + log)
                            else:
                                conn.sendall(b"HTTP/1.1 400 Bad Request\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/plain\r\n\r\nBad Request")
                            conn.close()
                            break
                        else:
                            conn.sendall(b"Please use POST")
                            conn.close()
                            break
                    else:
                        conn.close()        
        except Exception as e:
            print(e)