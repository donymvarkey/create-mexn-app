import { INSTALL_COMMANDS, TEMPLATES } from '../constants/index.js';
import {
  CommandOptions,
  DependencyMap,
  TemplateOptions,
} from '../types/index.js';
import { APP_VERSION } from '../version.js';

/**
 * Retrieves the current application version.
 *
 * @returns {string} The version of the application as defined by `APP_VERSION`.
 */
export const getVersion = () => {
  return APP_VERSION;
};

/**
 * Retrieves the template repository URL or configuration based on the provided template option.
 *
 * @param option - The template option key used to select the corresponding template from `TEMPLATES`.
 * @returns The repository URL or configuration associated with the specified template option.
 */
export const getTemplateRepo = (option: TemplateOptions) => {
  return TEMPLATES[option];
};

/**
 * Retrieves the package installation commands based on the provided command option.
 *
 * @param command - The command option specifying which installation commands to retrieve.
 * @returns The installation commands corresponding to the given command option.
 */
export const getPackageInstallCommands = (command: CommandOptions) => {
  return INSTALL_COMMANDS[command];
};

/**
 * Returns an array of dependency names from the given dependency map.
 *
 * @param dependencies - An object where keys are dependency names and values are their corresponding versions or metadata.
 * @returns An array of strings representing the names of the dependencies.
 */
export const getDependencies = (dependencies: DependencyMap) => {
  return Object.keys(dependencies);
};

/**
 * Retrieves the list of development dependency names from the provided dependency map.
 *
 * @param devDependencies - An object representing the development dependencies, where keys are dependency names.
 * @returns An array of strings containing the names of all development dependencies.
 */
export const getDevDependencies = (devDependencies: DependencyMap) => {
  return Object.keys(devDependencies);
};
