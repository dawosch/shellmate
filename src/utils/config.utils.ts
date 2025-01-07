import * as vscode from 'vscode';
import { ErrorMessages, showError } from '../utils/error.utils';
import type { Template } from '../template/template';

export const isMultiRootProject: boolean = (vscode.workspace.workspaceFolders?.length ?? 0) > 1;

export async function readConfig(): Promise<Template | void> {
  // Try to read existing config
  const configUri = isMultiRootProject ? getWorkspaceConfigUri() : await getVscodeConfigUri();
  if (!configUri) return showError(ErrorMessages.NO_CONFIG);

  try {
    const configFile = await vscode.workspace.fs.readFile(configUri);
    const config: Template = JSON.parse(new TextDecoder().decode(configFile));
    return config;
  } catch {
    return showError(ErrorMessages.NO_CONFIG);
  }
}

export async function saveConfig(config: Template) {
  const configUri = await getVscodeConfigUri();
  if (!configUri) return showError(ErrorMessages.NO_CONFIG);
  await vscode.workspace.fs.writeFile(configUri, new TextEncoder().encode(JSON.stringify(config, null, 2)));
}

export async function getVscodeConfigUri(): Promise<vscode.Uri | undefined> {
  const rootFolder = vscode.workspace.workspaceFolders?.[0];
  if (!rootFolder) return undefined;
  try {
    const configUri = vscode.Uri.joinPath(rootFolder.uri, '.vscode', 'shellmate.json');
    await vscode.workspace.fs.stat(configUri);
    return configUri;
  } catch {
    return undefined;
  }
}

export function getWorkspaceConfigUri(): vscode.Uri | undefined {
  const configPath = vscode.workspace.getConfiguration('shellmate').get<string>('config.path');
  return configPath ? vscode.Uri.file(configPath!) : undefined;
}

export async function openConfig(uri: vscode.Uri): Promise<void> {
  const document = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(document);
}
