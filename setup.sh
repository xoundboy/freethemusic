#!/bin/bash -e

################################################################################################
##                                                                                            ##
##   setup.sh                                                                                 ##
##                                                                                            ##
##   This script sets up the environment and installs all dependencies and configurations     ##
##   needed to run the node server and serve the application, including the MySQL database.   ##
##   It currently doesn't install or configure a reverse proxy such as Nginx. However, you    ##
##   will need one if you intend to expose the service to the public internet as running a    ##
##   node service on port 80 or 443 is very insecure.                                         ##
##                                                                                            ##
################################################################################################


dbuser=x71dbuser
dbpass=x71dbuserpass
conffile=".x71dbcnf.tmp"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Welcome message
echo -e
echo -e
echo -e "Welcome to X7.1 setup"


# path to media library
default="$HOME/x71_library"
echo -e "Enter absolute path to your media library."
echo -e "This is the place where uploaded audio and image files will be stored on your server"
read -p "WARNING: any existing data in this location will be lost [$default]: " libpath
if [ "$libpath" = "" ]; then
    libpath="$default"
fi

# node server port
default="8080"
read -p "Enter a port for the Node service [$default]: " port
if [ "$port" = "" ]; then
    port="$default"
fi

# database host
default="localhost"
read -p "Enter the database host name or IP adress [$default]: " dbhost
if [ "$dbhost" = "" ]; then
    dbhost="$default"
fi

# database name
default="x71"
read -p "Enter a name for the database [$default]: " dbname
if [ "$dbname" = "" ]; then
    dbname="$default"
fi

# database root user
default="root"
read -p "Enter the database root user name [$default]: " dbrootuser
if [ "$dbrootuser" = "" ]; then
    dbrootuser="$default"
fi

# database root user's password
read -s -p $"Enter the root user's password: " dbrootpass


# create a temporary mysql config file
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


# create the database
echo -e "creating the database ..."
mysql --defaults-extra-file=$conffile <<END
CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8;
USE $dbname;
END

# install the empty database schema
echo -e "installing the empty database schema ..."
mysql --defaults-extra-file=$conffile $dbname < sql/x7db_no_data.sql


# Set the permissions for the node application to connect to the database
echo -e "setting database permissions ..."
mysql --defaults-extra-file=$conffile <<END
REVOKE ALL PRIVILEGES, GRANT OPTION FROM $dbuser@$dbhost;
GRANT ALL PRIVILEGES ON $dbname.* TO $dbuser@$dbhost IDENTIFIED BY "$dbpass";
END

# remove the temporary mysql config file
echo -e "removing the temporary mysql config file ..."
rm -f $conffile


# remove the library root folder if it already exists
if [ -d "$libpath" ]; then
    echo -e "removing existing library root folder ..."
    rm -rf $libpath
fi

# create the library folders
echo -e "creating the new library folders ..."
mkdir $libpath
mkdir $libpath/audio
mkdir $libpath/images

# create the mappings to the library folders
echo -e "creating library mappings ..."
rm -f $DIR/public/assets/audio 2>/dev/null
rm -f $DIR/public/assets/images 2>/dev/null
ln -s $libpath/audio $DIR/public/assets/audio
ln -s $libpath/images $DIR/public/assets/images


# install dependencies
echo -e "installing application dependencies. You will need to provide your password to run as root ..."
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


setEnvVar NODE_ENV production
setEnvVar X71_SERVER_PORT $port
setEnvVar X71_LIB_PATH $libpath
setEnvVar X71_DB_HOST $dbhost
setEnvVar X71_DB_NAME $dbname
setEnvVar X71_DB_USER $dbuser
setEnvVar X71_PB_PASS $dbpass


# source the bash profile
echo "reinitialising shell ..."
. $HOME/.bash_profile

# build the static packages
echo -e "building static packages"
webpack -p --progress


echo -e "DONE"
echo -e
echo -e "Installation completed successfully"
echo -e
echo -e "To start the node server do one of the following:"
echo -e "  i) npm start"
echo -e " ii) pm2 start server.js"
echo -e "The second option launches the node process using pm2 process manager which will re-start it if it crashes"
echo -e
echo -e "You can then access the application at http://localhost:$port/panel.html"
echo -e "To stop the service when running under pm2, run the following command:"
echo -e "   pm2 kill"
