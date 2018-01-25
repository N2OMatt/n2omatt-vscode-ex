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