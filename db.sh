#!/usr/bin/env bash

# THIS SCRIPT IS FOR DEVELOPMENT PURPOSES ONLY

# You can dump and load the database schema and stored procedures with or without its data.

# Note that you need to use the Mysql root user account to select and write stored
# procedures. If this isn't possible then use the following grant expressions to
# permit a non-root user to deal in stored procs

#  GRANT SELECT ON mysql.proc TO [dbuser]@[dbhost] IDENTIFIED BY "$dbpass";
#  GRANT SUPER ON *.* TO $dbuser@$dbhost IDENTIFIED BY "$dbpass";


DUMPFILE=x7db.sql
DUMPFILENODATA=x7db_no_data.sql

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Dump the database with data
if [ "$1" == "dump" ]; then
    mysqldump -uroot -p ${X71_DB_NAME} --host=${X71_DB_HOST} --routines > ${DIR}/sql/${DUMPFILE}

# Dump without data
elif [ "$1" == "dumpnodata" ]; then
    sudo mysqldump -uroot -p --host=${X71_DB_HOST} --add-drop-table -d --routines ${X71_DB_NAME} | \
    sed 's/ AUTO_INCREMENT=[0-9]*//g' >  ${DIR}/sql/${DUMPFILENODATA}

# Load database with data
elif [ "$1" == "load" ]; then
    mysql -uroot -p --host=${X71_DB_HOST} ${X71_DB_NAME} < ${DIR}/sql/${DUMPFILE}

# Load without data (just schema)
elif [ "$1" == "loadnodata" ]; then
    mysql -uroot -p --host=${X71_DB_HOST} ${X71_DB_NAME} < ${DIR}/sql/${DUMPFILENODATA}

# Show no arg error
else
    echo "no argument passed. Possible arg values..."
    echo "[dump|dumpnodata|load|loadnodata]"
fi



