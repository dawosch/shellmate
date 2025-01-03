import * as vscode from 'vscode';
import { activate as activateCmd } from './commands/activate.command';
import { disableAutostart, enableAutostart } from './commands/autostart.command';
import { init } from './commands/init.command';

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('shellmate.init', init),
    vscode.commands.registerCommand('shellmate.autostart.enable', enableAutostart),
    vscode.commands.registerCommand('shellmate.autostart.disable', disableAutostart),
    vscode.commands.registerCommand('shellmate.activate', activateCmd)
  );

  const autoStart = vscode.workspace.getConfiguration('shellmate').get<boolean>('autostart');
  if (autoStart) activateCmd();
}

export function deactivate() {}
