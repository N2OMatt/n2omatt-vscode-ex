//~---------------------------------------------------------------------------//
//                        ____                       _   _                    //
//                  _ __ |___ \ ___  _ __ ___   __ _| |_| |_                  //
//                 | '_ \  __) / _ \| '_ ` _ \ / _` | __| __|                 //
//                 | | | |/ __/ (_) | | | | | | (_| | |_| |_                  //
//                 |_| |_|_____\___/|_| |_| |_|\__,_|\__|\__|                 //
//                              www.n2omatt.com                               //
//  File      : ext_function_break.ts                                         //
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
function_break()
{
    //--------------------------------------------------------------------------
    // Gather info about the editor.
    const editor    = window.activeTextEditor;
    const curr_pos  = editor.selection.active;
    const text_line = editor.document.lineAt(curr_pos);

    const text         = text_line.text;
    const trimmed_text = text.trim();

    //--------------------------------------------------------------------------
    // Gather info about the text to be replaced.
    const leading_spaces = (text.length - trimmed_text.length);
    const first_parens   = text.indexOf    ("(");
    const last_parens    = text.lastIndexOf(")");
    const params_body    = text.substring(first_parens+1, last_parens);
    const split_body     = params_body.split(",");

    //--------------------------------------------------------------------------
    // Build the text.
    let final_text = text.substring(0, first_parens) + "(\n";
    for(let i = 0; i < split_body.length; ++i)
    {
        final_text += " ".repeat(leading_spaces + 4) + split_body[i].trim();
        final_text += (i < split_body.length -1)
            ?  ",\n"
            :  "\n";
    }
    final_text += " ".repeat(leading_spaces) + ");";


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