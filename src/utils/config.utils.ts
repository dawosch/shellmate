import * as vscode from 'vscode';
import { ErrorMessages, showError } from '../utils/error.utils';
import type { Template } from '../template/template';

export async function readConfig(): Promise<Template | undefined> {
  let config: Template | undefined;

  try {
    const configPath = vscode.workspace.getConfiguration('shellmate').get<string>('config.path');
    const configFileUri = vscode.Uri.file(configPath!);
    const configFile = await vscode.workspace.fs.readFile(configFileUri);
    config = JSON.parse(new TextDecoder().decode(configFile));
  } catch {
    showError(ErrorMessages.NO_CONFIG);
  }

  return config;
}
