#!/usr/bin/env bash

##------------------------------------------------------------------------------
## Functions
find_real_user_home()
{
    ## Restore it at the end of the function.
    if [ $UID == 0 ]; then
        USER=$(printenv SUDO_USER);
        if [ -z "$USER" ]; then
            echo "Installing as root user...";
            export REAL_USER_HOME="$HOME";
        else
            echo "Installing with sudo...";
            export REAL_USER_HOME=$(getent passwd "$USER" | cut -d: -f6);
        fi;
    else
        echo "Installing as normal user...";
        export REAL_USER_HOME="$HOME";
    fi;

    REAL_USER_HOME=$(realpath $REAL_USER_HOME);
}
find_real_user_home;


##----------------------------------------------------------------------------##
## Vars                                                                       ##
##----------------------------------------------------------------------------##
NAME="n2omatt-vscode-ex";
SETTINGS_DIR="./settings";

EXT_INSTALL_DIR="$REAL_USER_HOME/.vscode/extensions/";
SETTINGS_INSTALL_DIR="$REAL_USER_HOME/.config/Code/User/";

## We're on Windows, so the settings path is different.
if [ -d "$REAL_USER_HOME/AppData/Roaming/Code/User" ]; then
    SETTINGS_INSTALL_DIR="$REAL_USER_HOME/AppData/Roaming/Code/User";
fi;


##------------------------------------------------------------------------------
## Stop on errors...
set -e

##------------------------------------------------------------------------------
## Print info.
echo "EXT_INSTALL_DIR      : $EXT_INSTALL_DIR";
echo "SETTINGS_INSTALL_DIR : $SETTINGS_INSTALL_DIR";

##------------------------------------------------------------------------------
## Create the target directories.
mkdir -pv $EXT_INSTALL_DIR;
mkdir -pv $SETTINGS_INSTALL_DIR;

##------------------------------------------------------------------------------
## Install Settings.
cp -rv $SETTINGS_DIR/* "$SETTINGS_INSTALL_DIR";

##------------------------------------------------------------------------------
## Install Extensions.
cd ../
rm -rf "$EXT_INSTALL_DIR/$NAME"
cp -r $NAME "$EXT_INSTALL_DIR";
