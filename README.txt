Dev Env Setup
=============


1. Add the following line to your ~/.bash_profile

	export PATH=</path/to/project/root>:$PATH

	(replacing </path/to/project/root> with the real thing of course)


2. Set up the database

	a) Choose values for the following:
	- database name [DB_NAME]
	- database user name [DB_USER]
	- database user's password [DB_PASS]

	b) Open the mysql command line client
	$ mysql -uroot -p

	c) Create the database
	mysql> create database [DB_NAME] character set utf8;

	d) Set the permissions for the node application to connect to the database
	mysql> grant all privileges on [DB_NAME].* to [DB_USER]@localhost identified by "[DB_PASS]";

	e) Install the database schema
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

