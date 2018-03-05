//~---------------------------------------------------------------------------//
//                        ____                       _   _                    //
//                  _ __ |___ \ ___  _ __ ___   __ _| |_| |_                  //
//                 | '_ \  __) / _ \| '_ ` _ \ / _` | __| __|                 //
//                 | | | |/ __/ (_) | | | | | | (_| | |_| |_                  //
//                 |_| |_|_____\___/|_| |_| |_|\__,_|\__|\__|                 //
//                              www.n2omatt.com                               //
//  File      : ext_lhc.ts                                                    //
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

// Imports
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';

const { spawn } = require('child_process');
const path      = require('path');


export function lhc()
{
    const is_saved = !window.activeTextEditor.document.isUntitled;

    // Not saved document!
    //   Nothing to do...
    if(!is_saved)
        return;

    const filename = window.activeTextEditor.document.fileName;

    const cmd_lhc = spawn("lhc", [filename]);

    cmd_lhc.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    cmd_lhc.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    cmd_lhc.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

}
