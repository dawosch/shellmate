import * as vscode from 'vscode';
import type { Terminal as ShellMateTerminal } from '../template/template';

export function createTerminal({ name, icon, shellPath, shellArgs, command, cwd, env, message }: ShellMateTerminal, parent?: vscode.Terminal): vscode.Terminal {
  return vscode.window.createTerminal({
    name: name,
    iconPath: new vscode.ThemeIcon(icon),
    shellPath: shellPath,
    shellArgs: shellArgs,
    cwd: cwd,
    env: env,
    message: message,
    location: parent ? { parentTerminal: parent } : undefined,
  });
}
