//~---------------------------------------------------------------------------//
//                        ____                       _   _                    //
//                  _ __ |___ \ ___  _ __ ___   __ _| |_| |_                  //
//                 | '_ \  __) / _ \| '_ ` _ \ / _` | __| __|                 //
//                 | | | |/ __/ (_) | | | | | | (_| | |_| |_                  //
//                 |_| |_|_____\___/|_| |_| |_|\__,_|\__|\__|                 //
//                              www.n2omatt.com                               //
//  File      : ext_sort.ts                                                   //
//  Project   : n2omatt-vscode-ex                                             //
//  Date      : Jan 25, 2018                                                  //
//  License   : GPLv3                                                         //
//  Author    : n2omatt <n2omatt@amazingcow.com>                              //
//  Copyright : n2omatt - 2018                                                //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//

'use strict';

//----------------------------------------------------------------------------//
// Imports                                                                    //
//----------------------------------------------------------------------------//
// VSCode
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';


//----------------------------------------------------------------------------//
// Exported Functions                                                         //
//----------------------------------------------------------------------------//
export function sort()
{
    const editor             = window.activeTextEditor;
    const selection_empty    = editor.selection.isEmpty;
    const selection_contents = (selection_empty)
                                ?  ""
                                : editor.document.getText(editor.selection).trim();

    if(selection_empty)
        return;

    const values = selection_contents.split("\n");
    values.sort();
    const sorted_values = values.join("\n");

    editor.edit(builder => builder.replace(editor.selection, sorted_values));
}