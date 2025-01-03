import * as vscode from 'vscode';
import { template } from '../template/template';
import { ErrorMessages, showError } from '../utils/error.utils';

const CONFIG_LOCATION_OPTIONS = [{ label: 'Within .vscode Folder' }, { label: 'Custom Location' }];

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

async function handleCustomLocationConfig() {
  const workspaceFileUri = vscode.workspace.workspaceFile;
  if (!workspaceFileUri) return showError(ErrorMessages.NO_WORKSPACE_FILE);

  await vscode.workspace.getConfiguration('shellmate', workspaceFileUri).update('config.path', '');
  const document = await vscode.workspace.openTextDocument(workspaceFileUri);
  await vscode.window.showTextDocument(document);
}

export async function init() {
  const isMultiRootProject = (vscode.workspace.workspaceFolders?.length ?? 0) > 1;

  const configLocationPicker = vscode.window.createQuickPick();
  configLocationPicker.items = CONFIG_LOCATION_OPTIONS;
  configLocationPicker.onDidChangeSelection(async (option) => {
    if (option[0].label === CONFIG_LOCATION_OPTIONS[0].label) {
      await handleVsCodeFolderConfig();
    } else {
      await handleCustomLocationConfig();
    }

    configLocationPicker.dispose();
  });
  configLocationPicker.onDidHide(() => configLocationPicker.dispose());
  configLocationPicker.show();
}
