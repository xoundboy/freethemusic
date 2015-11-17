Dev Env Setup
=============


1. Add the following line to your ~/.bash_profile

	export PATH=</path/to/project/root>:$PATH

	(replacing </path/to/project/root> with the real thing of course)


2. install the Mysql database and set grants to allow access from localhost

	$ mysql -uroot -p
	mysql> create database xoundboy_dev character set utf8;
	mysql> grant all privileges on xoundboy_dev.* to root@localhost identified by "";


3. Install the database schema

	$ db loadnodata


4. install node + npm


5. install dependencies for both projects by running npm install in both

	$ cd </path/to/project/root>
	$ npm install


6. run the server

	$ npm start


7. Public site URL -  http://localhost:8080
   Admin panel URL - http://localhost:8080/panel.html

