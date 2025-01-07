import * as vscode from 'vscode';
import { template } from '../template/template';
import { ErrorMessages, showError } from '../utils/error.utils';
import { getVscodeConfigUri, getWorkspaceConfigUri, isMultiRootProject, openConfig } from '../utils/config.utils';

async function handleVsCodeFolderConfig() {
  const rootFolder = vscode.workspace.workspaceFolders?.[0];
  if (!rootFolder) return showError(ErrorMessages.NO_ROOT_FOLDER);

  const vscodeFolderUri = vscode.Uri.joinPath(rootFolder.uri, '.vscode');
  await vscode.workspace.fs.createDirectory(vscodeFolderUri);
  const configFileUri = vscode.Uri.joinPath(vscodeFolderUri, 'shellmate.json');
  await vscode.workspace.fs.writeFile(configFileUri, new TextEncoder().encode(JSON.stringify(template, null, 2)));
  const document = await vscode.workspace.openTextDocument(configFileUri);
  await vscode.window.showTextDocument(document);
}

async function handleCustomLocationConfig(path: string) {
  const workspaceFileUri = vscode.workspace.workspaceFile;
  if (!workspaceFileUri) return showError(ErrorMessages.NO_WORKSPACE_FILE);

  const configFileUri = vscode.Uri.file(path + '/shellmate.json');
  await vscode.workspace.getConfiguration('shellmate', workspaceFileUri).update('config.path', configFileUri.fsPath);
  await vscode.workspace.fs.writeFile(configFileUri, new TextEncoder().encode(JSON.stringify(template, null, 2)));
  const document = await vscode.workspace.openTextDocument(configFileUri);
  await vscode.window.showTextDocument(document);
}

export async function init() {
  // Try to read existing config
  const configUri = isMultiRootProject ? getWorkspaceConfigUri() : await getVscodeConfigUri();
  if (configUri) return await openConfig(configUri);

  // Config doesn't exists, so create it
  if (!isMultiRootProject) {
    await handleVsCodeFolderConfig();
  } else if (isMultiRootProject) {
    const inputStep = vscode.window.createInputBox();
    inputStep.ignoreFocusOut = true;
    inputStep.prompt = 'Enter the path where you want to create the configuration file';
    inputStep.onDidAccept(async () => {
      await handleCustomLocationConfig(inputStep.value);
      inputStep.dispose();
    });
    inputStep.show();
  }
}
