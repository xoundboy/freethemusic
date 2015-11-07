#!/bin/bash

# Dev script for X7
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# start MySql db REST service on port 3000
cd $DIR/dbService
npm start&

# start the SPA server on port 80 (must be run as root and should NEVER
# be done like this in a public facing web server - ONLY FOR DEVELOPMENT)
cd $DIR/spa
sudo node app.js
