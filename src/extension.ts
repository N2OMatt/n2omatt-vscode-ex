//~---------------------------------------------------------------------------//
//                        ____                       _   _                    //
//                  _ __ |___ \ ___  _ __ ___   __ _| |_| |_                  //
//                 | '_ \  __) / _ \| '_ ` _ \ / _` | __| __|                 //
//                 | | | |/ __/ (_) | | | | | | (_| | |_| |_                  //
//                 |_| |_|_____\___/|_| |_| |_|\__,_|\__|\__|                 //
//                              www.n2omatt.com                               //
//  File      : extensions.ts                                                 //
//  Project   : n2omatt-vscode-ex                                             //
//  Date      : Jan 20, 2018                                                  //
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
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';

import { lhc }                           from "./ext_lhc";
import { comment_block, comment_header } from "./ext_comment";
import { sort }                          from "./ext_sort";


//----------------------------------------------------------------------------//
// Private Functions                                                          //
//----------------------------------------------------------------------------//
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


//----------------------------------------------------------------------------//
// Public                                                                     //
//----------------------------------------------------------------------------//
export function activate(context: vscode.ExtensionContext)
{
    //--------------------------------------------------------------------------
    // Comment
    register_extension("ext_comment", "comment_header", comment_header, context);
    register_extension("ext_comment", "comment_block",  comment_block,  context);

    //--------------------------------------------------------------------------
    // LHC
    register_extension("ext_lhc", "lhc",  lhc, context);

    //--------------------------------------------------------------------------
    // Sort
    register_extension("ext_sort", "sort", sort, context);
}

export function deactivate()
{
    // Empty...
}
