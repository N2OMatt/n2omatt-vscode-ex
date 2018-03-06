//~---------------------------------------------------------------------------//
//                        ____                       _   _                    //
//                  _ __ |___ \ ___  _ __ ___   __ _| |_| |_                  //
//                 | '_ \  __) / _ \| '_ ` _ \ / _` | __| __|                 //
//                 | | | |/ __/ (_) | | | | | | (_| | |_| |_                  //
//                 |_| |_|_____\___/|_| |_| |_|\__,_|\__|\__|                 //
//                              www.n2omatt.com                               //
//  File      : ext_namespace_create.ts                                       //
//  Project   : n2omatt-vscode-ex                                             //
//  Date      : Mar 05, 2018                                                  //
//  License   : GPLv3                                                         //
//  Author    : n2omatt <n2omatt@amazingcow.com>                              //
//  Copyright : n2omatt - 2018                                                //
//                                                                            //
//  Description :                                                             //
//    Very, very primitive... just a proof of concept.                        //
//---------------------------------------------------------------------------~//

'use strict';

//----------------------------------------------------------------------------//
// Imports                                                                    //
//----------------------------------------------------------------------------//
// VSCode
import * as vscode from 'vscode';
import { window, Selection, Disposable, Range } from 'vscode';

//----------------------------------------------------------------------------//
// Exported Functions                                                         //
//----------------------------------------------------------------------------//
export function
namespace_create()
{
    //--------------------------------------------------------------------------
    // Gather info about the editor.
    const editor    = window.activeTextEditor;
    const curr_pos  = editor.selection.active;
    const text_line = editor.document.lineAt(curr_pos);

    //--------------------------------------------------------------------------
    // Gather info about the text to be replaced.
    const text       = text_line.text.trim();
    const split_text = text.split("::");

    //--------------------------------------------------------------------------
    // Build the text.
    let final_text = "";
    // First part of: namespace some { namespace other { namespace {
    for(let i = 0; i < split_text.length; ++i)
    {
        const namespace_name = split_text[i];
        final_text += "namespace " + namespace_name + " { ";
    }
    final_text += "\n\n";
    // Last part of: } // namespace some\n } // namespace other...
    for(var i = split_text.length -1; i >= 0 ; --i)
    {
        const namespace_name = split_text[i];
        final_text += "} // namespace " + namespace_name + "\n";
    }


    //--------------------------------------------------------------------------
    // Delete the current line.
    editor.edit(builder => {
        builder.delete(new Range(curr_pos.line, 0, curr_pos.line, text.length));
    })
    //--------------------------------------------------------------------------
    // Replace it with the new text.
    .then(value => {
        editor.edit(builder => {
            builder.insert(curr_pos, final_text);
        });
    });

    let a = 10;
}