import * as vscode from 'vscode';
import { readConfig } from '../utils/config.utils';
import { createTerminal } from '../utils/terminal.utils';

export async function activate() {
  const config = await readConfig();
  if (!config) return; // TODO: Should be error message be handeled here or while reading the config?

  // Dispose all terminals
  vscode.window.terminals.forEach((terminal) => terminal.dispose());

  // Create new terminals
  const terminals = config.terminals.flatMap((entry) => {
    if (Array.isArray(entry)) {
      return entry.reduce<{ terminal: vscode.Terminal; command?: string }[]>((terminals, terminal, index) => {
        if (index === 0) {
          terminals.push({ terminal: createTerminal(terminal), command: terminal.command });
        } else {
          terminals.push({ terminal: createTerminal(terminal, terminals[0].terminal), command: terminal.command });
        }

        return terminals;
      }, []);
    }

    return { terminal: createTerminal(entry), command: entry.command };
  });

  // Show new terminals
  terminals.forEach((terminal) => {
    terminal.terminal.show();
    terminal.command ? terminal.terminal.sendText(terminal.command, true) : undefined;
  });
}
