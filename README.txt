Setup & deployment
==================

1. checkout the project into a folder on your server
	$ cd ~
	$ git clone https://xoundboy@bitbucket.org/xoundboy/x7.1.git

2. Create the database configuration file
	$ cp db_TEMPLATE db.sh

3. Set up the database. Before you start you need to choose values for the following:
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

3. Install the database schema
	$ db loadnodata


4. install node + npm


5. install dependencies for both projects by running npm install in both

	$ cd </path/to/project/root>
	$ npm install


6a. Open a new console and run the server

	$ npm start


6b. Open another new console and run the webpack watcher (with source maps)

	$ webpack -d


7. Public site URL -  http://localhost:8080
   Admin panel URL - http://localhost:8080/panel.html

