# Installation guide

## Frontend
In short the tasks are as follows
1. Install a webserver
2. Make sure the webserver runs on startup
3. Download the files into the webservers folder
4. Point the webserver to index.html

### Example
This is an example with apache2 on Ubuntu  
OS = Ubuntu 22.04  
The following commands should be executed in the terminal:
```
sudo apt-get update
sudo apt-get -y install apache2
sudo mkdir /var/www/blockly
```
Make sure that a copy of all the files is located at the folder ``/var/www/blockly``:
```
sudo cp 000-default.conf blockly.conf
sudo nano blockly.conf
```
Add the following line:
```
DocumentRoot /var/www/blockly/
```
Exit and save by **Ctrl**+**x** followed by **y** and **enter**

## Backend
In short the tasks are as follows
1. Download the backend files
2. Install requirements
3. Determine a Token
4. Make it run on boot

### Example
This is an example on Ubuntu.  
OS = Ubuntu 22.04, with python3 preinstalled  
The following commands are executed in the terminal, assuming the files are already on the system in folder *folder*.  
Create or place a file called ``token.txt`` in the same folder as the backend files, containing the token to use.  
Make sure to navigate to *folder* in the terminal.
```
sudo apt-get update
sudo apt-get -y install python3-pip
pip3 install -r requirements.txt
crontab -e
```
Add the following in the last line ``@reboot py -3 ``+*folder*+``/app.py &``  
Exit and save by **Ctrl**+**x** followed by **y** and **enter**.

## Network configurations
Make sure that the machine(s) running the frontend en the backend have a static ip (considering Dynamic Host Configuration Protocol), make a note of these ip addresses and supply them together with the password whenever anyone needs to work with the system.

## Of note
The frontend and backend may be installed on the same machine.

Make sure to notate both ip addresses and the token, and supply them always alongside the machine  
A recommended format is:
```
Blockly/frontend: <frontend ip-adress>
Python/backend: <backend ip-adress>
Token: <contents of token.txt>
```
