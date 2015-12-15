#!/bin/bash -e

################################################################################################
##                                                                                            ##
##   setup.sh                                                                                 ##
##                                                                                            ##
##   This script is designed to be run on a clean installation of a Debian based Linux OS     ##
##   and is intended for production use.                                                      ##
##                                                                                            ##
##   It sets up the environment and installs all dependencies and configurations              ##
##   needed to run the node server and serve the application, including the MySQL database.   ##
##   It currently doesn't install or configure a reverse proxy such as Nginx. However, you    ##
##   will need one if you intend to expose the service to the public internet as running a    ##
##   node service on a public port, especially 80 or 443, is very insecure.                   ##
##                                                                                            ##
##   USAGE:                                                                                   ##
##   $ chmod +x setup.sh                                                                      ##
##   $ source setup.sh                                                                        ##
##                                                                                            ##
##   NOTE that you need to 'source' this file in order that environment variables can be      ##
##   correctly exported for the current shell                                                 ##
##                                                                                            ##
################################################################################################

# Some config
dbuser=x71dbuser
dbpass=x71dbuserpass
conffile=".x71dbcnf.tmp"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install MySQL
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation

# Install Node.js
sudo apt-get install nodejs
sudo ln -sf "$(which nodejs)" /usr/bin/node
sudo apt-get install npm

# Install Webpack
sudo npm install -g webpack

# Remove any existing installation
rm -rf x7.1

# Install Git and clone the repo
sudo apt-get install git
git clone https://xoundboy@bitbucket.org/xoundboy/x7.1.git
cd x7.1

# Print the welcome message
echo -e
echo -e
echo -e "Welcome to X7.1 setup"

# Get the path to media library
default="$HOME/x71_library"
echo -e "Enter absolute path to your media library."
echo -e "This is the place where uploaded audio and image files will be stored on your server"
read -p "WARNING: any existing data in this location will be lost [$default]: " libpath
if [ "$libpath" = "" ]; then
    libpath="$default"
fi

# Get the node server port
default="8080"
read -p "Enter a port for the Node service [$default]: " port
if [ "$port" = "" ]; then
    port="$default"
fi

# Get the database host
default="localhost"
read -p "Enter the database host name or IP adress [$default]: " dbhost
if [ "$dbhost" = "" ]; then
    dbhost="$default"
fi

# Get the database name
default="x71"
read -p "Enter a name for the database [$default]: " dbname
if [ "$dbname" = "" ]; then
    dbname="$default"
fi

# Get the database root user
default="root"
read -p "Enter the database root user name [$default]: " dbrootuser
if [ "$dbrootuser" = "" ]; then
    dbrootuser="$default"
fi

# Get the database root user's password
read -s -p $"Enter the root user's password: " dbrootpass


# Create a temporary mysql config file
if [ -a $conffile ]; then
    echo -e "removing old temporary mysql config file"
    rm -f $conffile
fi
echo -e "creating temporary mysql config file ..."
touch $conffile
echo "[client]" >> $conffile
echo "user=$dbrootuser" >> $conffile
echo "password=$dbrootpass" >> $conffile
echo "host=$dbhost" >> $conffile

# Create the database
echo -e "creating the database ..."
mysql --defaults-extra-file=$conffile <<END
CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8;
USE $dbname;
END

# Install the empty database schema
echo -e "installing the empty database schema ..."
mysql --defaults-extra-file=$conffile $dbname < sql/x7db_no_data.sql

# Set the permissions for the node application to connect to the database
echo -e "setting database permissions ..."
mysql --defaults-extra-file=$conffile <<END
-- REVOKE ALL PRIVILEGES, GRANT OPTION FROM $dbuser@$dbhost;
GRANT ALL PRIVILEGES ON $dbname.* TO $dbuser@$dbhost IDENTIFIED BY "$dbpass";
END

# Remove the temporary mysql config file
echo -e "removing the temporary mysql config file ..."
rm -f $conffile

# Remove the library root folder if it already exists
if [ -d "$libpath" ]; then
    echo -e "removing existing library root folder ..."
    rm -rf $libpath
fi

# Create the library folders
echo -e "creating the new library folders ..."
mkdir $libpath
mkdir $libpath/audio
mkdir $libpath/images

# Create the mappings to the library folders
echo -e "creating library mappings ..."
ln -s -f $libpath/audio $DIR/public/assets/audio
ln -s -f $libpath/images $DIR/public/assets/images

# Install dependencies
echo -e "installing application dependencies ..."
sudo npm install

# Insert env vars and aliases into bash profile
echo -e "setting environment variables ..."

function setEnvVar {
    TARGET_KEY=$1
    REPLACEMENT_VALUE=$2
    CONFIG_FILE=$HOME/.bash_profile
    if [[ `uname` == 'Darwin' ]]; then
        # sed on Mac is different
       sed -i '' "s/export $TARGET_KEY=.*//g" $CONFIG_FILE
    else
       sed -i "s/export $TARGET_KEY=.*//g" $CONFIG_FILE
    fi
    echo "export $TARGET_KEY=$REPLACEMENT_VALUE" >> "$CONFIG_FILE"
}

# Set the environment variables
setEnvVar NODE_ENV production
setEnvVar X71_SERVER_PORT $port
setEnvVar X71_LIB_PATH $libpath
setEnvVar X71_DB_HOST $dbhost
setEnvVar X71_DB_NAME $dbname
setEnvVar X71_DB_USER $dbuser
setEnvVar X71_DB_PASS $dbpass

# export the env vars for the current shell
echo "reinitialising shell ..."
source $HOME/.bash_profile

# build the static packages
echo -e "building static packages"
webpack -p --progress

# Print the success message
echo -e "DONE"
echo -e
echo -e "Installation completed successfully"
echo -e
echo -e "To start the node server:"
echo -e "  $ cd ~/x7.1"
echo -e "  $ npm start"
