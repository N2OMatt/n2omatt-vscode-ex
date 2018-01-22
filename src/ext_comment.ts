'use strict';

//----------------------------------------------------------------------------//
// Imports                                                                    //
//----------------------------------------------------------------------------//
// VSCode
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';
// Node
const path = require('path');
// Project.
import { lhc } from "./ext_lhc";


//----------------------------------------------------------------------------//
// Variables                                                                  //
//----------------------------------------------------------------------------//
let editor          = null;
let selection_empty = null;

let old_position  = null;
let line_index    = null;
let column_index  = null;

let selected_text = "";
let cmt_start     = "##";
let cmt_end       = "//";

function find_selected_text()
{
    if(!selection_empty)
        selected_text = editor.document.getText(editor.selection).trim();
}

function find_comment_type()
{
    const filename   : string   = path.basename(editor.document.fileName);
    const components : string[] = filename.split(".");

    if(components.length < 2)
        return;

    switch(components[1])
    {
        //----------------------------------------------------------------------
        // C
        case "h" :
        case "c" :
        // C++
        case "hpp" :
        case "cpp" :
        case "cc"  :
        // ObjC
        case "m"  :
        case "mm" :
        // C#
        case "cs" :
        // PHP
        case "php" :
        // Javascript / Typescript
        case "js"  :
        case "ts"  :
        case "jsx" : {
            cmt_start = cmt_end = "//";
        } break;


        //----------------------------------------------------------------------
        // Shell
        case "sh" :
        // SQL
        case "sql" :
        // Python
        case "py" : {
            cmt_start = cmt_end = "##";
        } break;

        //----------------------------------------------------------------------
        // Default...
        default : {
            cmt_start = cmt_end = "##";
        } break;
    }
}


function make_edit(contents : string)
{
    editor.edit(builder => builder.replace(editor.selection, contents));

    //--------------------------------------------------------------------------
    // Put the caret in the correct position...
    var new_pos = (selection_empty)
        ?  old_position.with(line_index +1, column_index + 3)
        :  old_position.with(line_index +3, column_index);

    var new_selection = new vscode.Selection(new_pos, new_pos);
    editor.selection = new_selection;
}

function setup()
{
    editor          = window.activeTextEditor;
    selection_empty = editor.selection.isEmpty;

    old_position  = editor.selection.active;
    line_index    = editor.selection.active.line;
    column_index  = editor.selection.active.character;

    selected_text = "";
    cmt_start     = "";
    cmt_end       = "";

    find_comment_type ();
    find_selected_text();
}


//----------------------------------------------------------------------------//
// Export Functions                                                           //
//----------------------------------------------------------------------------//
export function comment_header()
{
    setup();

    //--------------------------------------------------------------------------
    // First line.
    const first_line  = cmt_start + "-".repeat(76 - column_index) + cmt_end;

    //--------------------------------------------------------------------------
    // Second line.
    const second_line = " ".repeat(column_index)
        + cmt_start
        + " " + selected_text
        + " ".repeat(76 - (column_index + 1 + selected_text.length))
        + cmt_end;

    //--------------------------------------------------------------------------
    // Third line.
    const third_line  = " ".repeat(column_index)
        + cmt_start
        + "-".repeat(76 - column_index)
        + cmt_end

    const final_line = first_line + "\n" + second_line + "\n" + third_line;

    make_edit(final_line);
}

export function comment_block()
{
    setup();

    const first_line  = cmt_start + "-".repeat(78 - column_index);
    const second_line = " ".repeat(column_index) + cmt_start + " " + selected_text;

    const final_line = first_line + "\n" + second_line;

    make_edit(final_line);
}
