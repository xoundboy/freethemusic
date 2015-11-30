Setup & deployment
==================

1. checkout the project into a folder on your server
	$ cd ~
	$ git clone https://xoundboy@bitbucket.org/xoundboy/x7.1.git


2. Create and configure the database load/dump script
	$ cp db_TEMPLATE db.sh
	$ vim db.sh
	... and set values for the following:
	- database name [DB_NAME]
	- database user name [DB_USER]
	- database user's password [DB_PASS]

	a) Open the mysql command line client
	$ mysql -uroot -p

	b) Create the database
	mysql> create database [DB_NAME] character set utf8;

	c) Set the permissions for the node application to connect to the database
	mysql> grant all privileges on [DB_NAME].* to [DB_USER]@localhost identified by "[DB_PASS]";

	d) Set permissions for the db dump script to dump stored procedures
	mysql> grant select on mysql.proc to [DB_USER]@localhost;

	e) Set permissions for the db load script to write globally to the db for loading storec prcedures
	mysql> grant super on *.* to [DB_USER]@localhost identified by "[DB_PASS]"


3. Install the database schema
	$ db.sh loadnodata

4. Create and configure the express webserver config
	$ cp spa/config-TEMPLATE.js spa/config.js
	$ vim spa/config.js
	... and set values for all the items


4. install node + npm


5. install dependencies for both projects by running npm install in both

	$ cd </path/to/project/root>
	$ npm install --production


6a. Open a new console and run the server

	$ npm start

	Public site URL -  http://localhost:8080
  	Admin panel URL - http://localhost:8080/panel.html


For development
---------------

	$ npm install
	$ webpack -d



