'use strict';

// Imports
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';

import { lhc }                           from "./ext_lhc";
import { comment_block, comment_header } from "./ext_comment";

function register_extension(
    namespace  : string,
    name       : string,
    func       : Function,
    context    : vscode.ExtensionContext)
{
    const disposable = vscode.commands.registerCommand(
        namespace + "." + (name),
        () => { func(); }
    );

    context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext)
{
    // Comment
    register_extension("ext_comment", "comment_header", comment_header, context);
    register_extension("ext_comment", "comment_block",  comment_block,  context);

    // LHC
    register_extension("ext_lhc", "lhc",  lhc, context);
}

export function deactivate()
{
    // Empty...
}
