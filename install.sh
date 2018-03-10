#!/usr/bin/env sh

##----------------------------------------------------------------------------##
## Imports                                                                    ##
##----------------------------------------------------------------------------##
source /usr/local/src/acow_shellscript_utils.sh


##----------------------------------------------------------------------------##
## Vars                                                                       ##
##----------------------------------------------------------------------------##
NAME="n2omatt-vscode-ex";
SETTINGS_DIR="./settings";

REAL_USER_HOME=$(find_real_user_home);
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
center_text " [vscode-ex installer] ";
echo "EXT_INSTALL_DIR      : $EXT_INSTALL_DIR";
echo "SETTINGS_INSTALL_DIR : $SETTINGS_INSTALL_DIR";

##------------------------------------------------------------------------------
## Create the target directories.
mkdir -pv $EXT_INSTALL_DIR;
mkdir -pv $SETTINGS_INSTALL_DIR;

##------------------------------------------------------------------------------
## Install Settings.
#cp -rv $SETTINGS_DIR/* "$SETTINGS_INSTALL_DIR";

##------------------------------------------------------------------------------
## Install Extensions.
cd ../
rm -rf "$EXT_INSTALL_DIR/$NAME"
cp -r $NAME "$EXT_INSTALL_DIR";

echo -e "\nInstalled...";
center_text "";
echo -e "\n";
