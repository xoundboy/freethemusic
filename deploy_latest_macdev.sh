#!/bin/bash -e


#   This script deploys the latest version of X7.1 onto Mac OSX for the purposes of further development


#   Before running this script you need to do the following things:
#   ---------------------------------------------------------------


#   1) Set the environment variables
#       X71_ROOT         - absolute path to project root
#       X71_LIB_PATH     - absolute path to library root
#       X71_DB_HOST      - hostname of MySQL host
#       X71_DB_NAME      - name of MySQL db
#       X71_DB_USER      - MySQL db user name
#       X71_DB_PASS      - MySQL db user password
#       X71_SERVER_PORT  - Node server port


#   2) Install the database
#       mysql> create database $X71_DB_NAME character set utf8;


#   3) Grant permissions
#       mysql> grant all privileges on $X71_DB_NAME.* to $X71_DB_USER@$X71_DB_HOST identified by "$X71_DB_PASS";


#   4) Set permissions for the db dump script to dump stored procedures
#   	mysql> grant select on mysql.proc to $X71_DB_USER@localhost;


#   5) Set permissions for the db load script to write globally to the db for loading stored procedures
#   	mysql> grant super on *.* to $X71_DB_USER@localhost identified by "$X71_DB_PASS";


#   6) Create an empty folder for X71_LIB_PATH to point to and inside it create the following two folders:

#       - audio
#       - images

#   7) Map the audio and image libraries
#       $ ln -s -f $X71_LIB_PATH/audio $X71_ROOT/public/assets/audio
#       $ ln -s -f $X71_LIB_PATH/images $X71_ROOT/public/assets/images


#   To begin development:
#   ---------------------

#   After you've done all of the above you should be able to start the node server with:

#       $ cd $X71_ROOT
#       $ npm start

#   Keep this terminal window open to view express server logs

#   Then in another terminal you can run webpack to build your static and keep rebuilding it each time you change
#   Something with the following command:

#       $ webpack -d --watch

#   Note that this method uses source maps so to set breakpoints you'll need to go to webpack:// > . in the chrome dev
#   tools sources tab.



# Check that all the required env vars are set
if [ -z ${X71_ROOT+x} ]; then echo "X71_ROOT is unset"; else echo "X71_ROOT is set to '$X71_ROOT'"; fi
if [ -z ${X71_LIB_PATH+x} ]; then echo "X71_LIB_PATH is unset"; exit 1; else echo "X71_LIB_PATH is set to '$X71_LIB_PATH'"; fi
if [ -z ${X71_DB_HOST+x} ]; then echo "X71_DB_HOST is unset"; exit 1; else echo "X71_DB_HOST is set to '$X71_DB_HOST'"; fi
if [ -z ${X71_DB_NAME+x} ]; then echo "X71_DB_NAME is unset"; exit 1; else echo "X71_DB_NAME is set to '$X71_DB_NAME'"; fi
if [ -z ${X71_DB_USER+x} ]; then echo "X71_DB_USER is unset"; exit 1; else echo "X71_DB_USER is set to '$X71_DB_USER'"; fi
if [ -z ${X71_DB_PASS+x} ]; then echo "X71_DB_PASS is unset"; exit 1; else echo "X71_DB_PASS is set to '$X71_DB_PASS'"; fi
if [ -z ${SERVER_PORT+x} ]; then echo "SERVER_PORT is unset"; exit 1; else echo "SERVER_PORT is set to '$SERVER_PORT'"; fi


# Check with user that the node server isn't already running
read -p "Have you killed any node server processes running on port $SERVER_PORT [y/n]? " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi


# Change into the project root
cd ${X71_ROOT}


# pull the latest revision of the master branch
echo "pulling the latest version of the source code from the repo..."
git pull -v


# install all dependencies
echo "installing dependencies..."
npm install --verbose


# Update the database with a new schema
if [ "$1" == "empty" ]; then

    # ... and with empty tables if the 'empty' arg passes to the script
    echo "updating the database with the new schema and empty tables..."
    mysql -u${X71_DB_USER} -p${X71_DB_PASS} --verbose ${X71_DB_NAME} < sql/x7db_no_data.sql

    # remove any media files saved in the library folders
    echo "removing any medai that exists in the audio and images folders within the library folder..."
    rm -rf ${X71_LIB_PATH}/audio/*
    rm -rf ${X71_LIB_PATH}/images/*

else
    echo "updating the database with the new schema leaving data intact"
    mysql -u${X71_DB_USER} -p${X71_DB_PASS} --verbose ${X71_DB_NAME} < sql/x7db.sql
fi


# build the static files for production use (no source maps)
echo "building static packages..."
webpack -d --progress
