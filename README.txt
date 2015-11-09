Dev Env Setup
=============

1. install database and set grants to allow access from localhost

	$ mysql -uroot -p
	mysql> create database xoundboy_dev character set utf8;
	mysql> grant all privileges on xoundboy_dev.* to root@localhost identified by "";


1a. refresh the schema, data and stored procedures
	$ mysql -uroot -p xoundboy_dev < xoundboy_dev.sql


1b. When dumping db don't forget the '--routines' flag to make sure that stored procs get dumped too
        $ mysqldump -uroot -p xoundboy_dev > xoundboy_dev.sql --routines


2. install node + npm


3. Set up the following 2 projects in the IDE:

	- dbService
	- spa

  Each of these runs its own node server. (This is a bit crap and should be done as a single project) 


4. install dependencies for both projects by running npm install in both

	$ cd dbService && npm install
	$ cd ../spa && npm install


4. run the mysql REST api service

	$ cd dbService && npm start
	$ cd spa && npm start

    Now you can interact with the db by hitting the service, eg to add a new recording type,

	GET http://localhost:8000/api/Recordings

    Public site URL -  http://localhost:8080
    Admin panel URL - http://localhost:8080/panel.html

	NOTE: Because the two servers run on separate ports then Chrome will not load
	any AJAX stuff from the db service unless you disable web security when you
	launch Chrome.

		$ open /Applications/Google\ Chrome.app --args --disable-web-security	
