#!/bin/bash -e

function setEnvVar {
    TARGET_KEY=$1
    REPLACEMENT_VALUE=$2
    CONFIG_FILE=$HOME/.bash_profile
    sed -i '' "s/export $TARGET_KEY=.*//g" $CONFIG_FILE
    echo "export $TARGET_KEY=$REPLACEMENT_VALUE" >> "$CONFIG_FILE"
}