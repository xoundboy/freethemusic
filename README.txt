Setup for Linux / Mac
=====================

Using a Bash shell:

1. Install MySQL (server only)
    $ sudo apt-get update
    $ sudo apt-get install mysql-server
    $ sudo mysql_secure_installation


2. Install Node.js
    $ sudo apt-get install nodejs

   In some Linux distros (e.g. Ubuntu) the node binary is 'nodejs' instead of plain 'node'.
   We can fix this with the following command:
   $ sudo ln -s "$(which nodejs)" /usr/bin/node


2a. ...and the Node Package Manger
    $ sudo apt-get install npm


2b. ...and the Git client
    $ sudo apt-get install git


3. Open a command prompt and install the following three npm packages globally
	$ sudo npm install -g express
	$ sudo npm install -g pm2
	$ sudo npm install -g webpack


4. Checkout the project into your home folder on your server
	$ cd ~ && git clone https://xoundboy@bitbucket.org/xoundboy/x7.1.git


5. Run the setup script following the instructions
	$ cd x7.1 && chmod +x setup.sh && . setup.sh


Start / Stop / Status
=====================

Start
	$ pm2 start server.js

Stop
	$ pm2 stop 0

Status
	$ pm2 list

See https://www.npmjs.com/package/pm2 for more information on how to use the PM2 process manager including
how to cluster processes if you have heavy load.


Use
===
http://localhost:8080/panel.html

Note that you should install a reverse proxy (e.g. Nginx) to expose the service to the public internet
