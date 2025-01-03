import * as vscode from 'vscode';

export function enableAutostart() {
  vscode.workspace.getConfiguration('shellmate').update('autostart', true);
}

export function disableAutostart() {
  vscode.workspace.getConfiguration('shellmate').update('autostart', false);
}
