import { readConfig, saveConfig } from '../utils/config.utils';
import { ErrorMessages, showError } from '../utils/error.utils';

export async function enableAutostart() {
  const config = await readConfig();
  if (!config) return showError(ErrorMessages.NO_CONFIG);

  config.autostart = true;
  saveConfig(config);
}

export async function disableAutostart() {
  const config = await readConfig();
  if (!config) return showError(ErrorMessages.NO_CONFIG);

  config.autostart = false;
  saveConfig(config);
}
