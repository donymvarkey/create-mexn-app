import { INSTALL_COMMANDS, TEMPLATES } from '../constants/index.js';
import { CommandOptions, TemplateOptions } from '../types/index.js';
import { APP_VERSION } from '../version.js';

// Get the version from package.json dynamically
export const getVersion = () => {
  return APP_VERSION;
};

export const getTemplateRepo = (option: TemplateOptions) => {
  return TEMPLATES[option];
};

export const getPackageInstallCommands = (command: CommandOptions) => {
  return INSTALL_COMMANDS[command];
};
