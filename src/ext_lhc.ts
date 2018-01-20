'use strict';

// Imports
import * as vscode from 'vscode';
import { window, Selection, Disposable } from 'vscode';

const { spawn } = require('child_process');


export function lhc()
{
    const filename = window.activeTextEditor.document.fileName;
    const is_saved = !window.activeTextEditor.document.isUntitled;

    // Not saved document
    //   Nothing to do.
    if(!is_saved)
        return;

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
