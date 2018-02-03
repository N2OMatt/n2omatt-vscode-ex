#!/usr/bin/env bash

## Stop on errors...
set -e

##------------------------------------------------------------------------------
## Vars
NAME="n2omatt-vscode-ex";

REAL_HOME=$(realpath $HOME);
SETTINGS_DIR="./settings";

EXT_INSTALL_DIR="$REAL_HOME/.vscode/extensions/";
SETTINGS_INSTALL_DIR="$REAL_HOME/.config/Code/User/";

## We're on Windows, so the settings path is different.
if [ -d "$REAL_HOME/AppData/Roaming/Code/User" ]; then
    SETTINGS_INSTALL_DIR="$REAL_HOME/AppData/Roaming/Code/User";
fi;

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
