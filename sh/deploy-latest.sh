#!/bin/bash -e

###########################################################
#                                                         #
#           deploy-latest.sh                              #
#                                                         #
#   This script deploys the latest version of X7.1 onto   #
#   the host on which it is executed. Set the following   #
#   environment variables before running it.              #
#                                                         #
#   X71_ROOT         - absolute path to project root      #
#   X71_LIB_PATH     - absolute path to library root      #
#   X71_DB_HOST      - hostname of MySQL host             #
#   X71_DB_NAME      - name of MySQL db                   #
#   X71_DB_USER      - MySQL db user name                 #
#   X71_DB_PASS      - MySQL db user password             #
#   SERVER_PORT      - Node server port                   #
#                                                         #
###########################################################


# Change into the project root
cd ${X71_ROOT}


# stop the running node instance
echo "stopping any currently running node process..."
pm2 kill


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
webpack -p --progress


# restarting the node server
echo "restarting the node server..."
pm2 start ${X71_ROOT}/server.js


# done
echo "DEPLOYMENT FINSHED SUCCESSFULLY"