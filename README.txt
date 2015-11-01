Dev Env Setup
=============

1. install database and set grants to allow access from localhost


2. install node + npm


3. install dependencies

    $ npm install


4. run the mysql REST api service

    $ npm start

    Now you can interact with the db by hitting the service, eg to add a new recording type,

    POST http://localhost:8000/api/types (data form-urlencoded)