Setup for Linux / Mac
=====================

(Note that the application works in Windows, just no setup script made yet)

1. Install Mysql (server only)

2. Install Node.js and the Node Package Manger (https://docs.npmjs.com/getting-started/installing-node)

3. Open a command prompt and install the following three npm packages globally

	$ npm install -g express
	$ npm install -g pm2
	$ npm install -g webpack

4. Checkout the project into your home folder on your server
	$ cd ~ && git clone https://xoundboy@bitbucket.org/xoundboy/x7.1.git

5. Run the setup script following the instructions
	$ cd x7.1 && chmod +x setup.sh && . setup


Start / Stop
============

Start
	$ pm2 start server.js

Stop
	$ pm2 stop 0

See https://www.npmjs.com/package/pm2 for more information on how to use the PM2 process manager including
how to cluster processes if you have heavy load.