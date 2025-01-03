import * as vscode from 'vscode';

export enum ErrorMessages {
  NO_CONFIG = 'No config file found. Please execute "ShellMate: Init"',
  NO_ROOT_FOLDER = 'No root folder found for storing the config',
  NO_WORKSPACE_FILE = 'No workspace file found',
}

export function showError(message: ErrorMessages) {
  vscode.window.showErrorMessage(message);
}
