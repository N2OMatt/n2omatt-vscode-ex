#!/usr/bin/env bash


NAME="n2omatt-vscode-ex";
INSTALL_DIR="$HOME/.vscode/extensions/";

cd ../
rm -rf "$INSTALL_DIR/$NAME"
cp -r $NAME "$INSTALL_DIR";
