import * as vscode from 'vscode';
import { getVscodeConfigUri, isMultiRootProject, readConfig, saveConfig } from '../utils/config.utils';
import { ErrorMessages, showError } from '../utils/error.utils';

export async function enableAutostart() {
  if (isMultiRootProject) vscode.workspace.getConfiguration('shellmate', vscode.workspace.workspaceFile).update('autostart', true);
  if (!isMultiRootProject) {
    const config = await readConfig();
    if (!config) return showError(ErrorMessages.NO_CONFIG);
    config.autostart = true;
    await saveConfig(config);
  }
}

export async function disableAutostart() {
  if (isMultiRootProject) vscode.workspace.getConfiguration('shellmate', vscode.workspace.workspaceFile).update('autostart', false);
  if (!isMultiRootProject) {
    const config = await readConfig();
    if (!config) return showError(ErrorMessages.NO_CONFIG);
    config.autostart = false;
    await saveConfig(config);
  }
}
