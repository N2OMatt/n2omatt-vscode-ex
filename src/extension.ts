'use strict';

// Imports
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';

import { lhc } from "./ext_lhc";


function comment_header() {
    const editor          = window.activeTextEditor;
    const selection_empty = editor.selection.isEmpty;

    var old_position  = editor.selection.active;
    var line_index    = editor.selection.active.line;
    var column_index  = editor.selection.active.character;
    var selected_text = "";

    if(!selection_empty)
    {
        selected_text = editor.document.getText(editor.selection).trim();
        column_index  = editor.selection.active.character;
    }

    // First line.
    const first_line  = "//" + "-".repeat(76 - column_index) + "//";

    // Second line.
    const second_line = " ".repeat(column_index)
    + "//"
    + " " + selected_text
    + " ".repeat(76 - (column_index + 1 + selected_text.length))
    + "//";

    // Third line.
    const third_line  = " ".repeat(column_index)
        + "//"
        + "-".repeat(76 - column_index)
        + "//"

    const final_line = first_line + "\n" + second_line + "\n" + third_line;
    editor.edit(builder => builder.replace(editor.selection, final_line));

     // Put the caret in the correct position...
    var new_pos = (selection_empty)
        ?  old_position.with(line_index +1, column_index + 3)
        :  old_position.with(line_index +3, column_index);

    var new_selection = new vscode.Selection(new_pos, new_pos);
    editor.selection = new_selection;
}

function comment_block()
{
    const editor          = window.activeTextEditor;
    const selection_empty = editor.selection.isEmpty;

    var old_position  = editor.selection.active;
    var line_index    = editor.selection.active.line;
    var column_index  = editor.selection.active.character;
    var selected_text = "";

    if(!selection_empty)
    {
        selected_text = editor.document.getText(editor.selection).trim();
        column_index  = editor.selection.active.character;
    }

    const first_line  = "//" + "-".repeat(78 - column_index);
    const second_line = " ".repeat(column_index) + "//" + " " + selected_text;

    const final_line = first_line + "\n" + second_line;
    editor.edit(builder => builder.replace(editor.selection, final_line));

    // Put the caret in the correct position...
    var new_pos = (selection_empty)
        ?  old_position.with(line_index +1, column_index + 3)
        :  old_position.with(line_index +3, column_index);

    var new_selection = new vscode.Selection(new_pos, new_pos);
    editor.selection = new_selection;
}

function register_extension(
    name    : string,
    func    : Function,
    context : vscode.ExtensionContext)
{
    const disposable = vscode.commands.registerCommand(
        "extension.".concat(name),
        () => { func(); }
    );

    context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext)
{
    register_extension("comment_header", comment_header, context);
    register_extension("comment_block",  lhc,  context);
}

export function deactivate()
{
    // Empty...
}
