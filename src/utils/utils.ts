import { INSTALL_COMMANDS, TEMPLATES } from '../constants/index.js';
import {
  CommandOptions,
  DependencyMap,
  TemplateOptions,
} from '../types/index.js';
import { getVersion } from '../version.js';

export { getVersion };

export const getTemplateRepo = (option: TemplateOptions) => {
  return TEMPLATES[option];
};

export const getPackageInstallCommands = (command: CommandOptions) => {
  return INSTALL_COMMANDS[command];
};

export const getDependencies = (dependencies?: DependencyMap) => {
  return dependencies ? Object.keys(dependencies) : [];
};

export const getDevDependencies = (devDependencies?: DependencyMap) => {
  return devDependencies ? Object.keys(devDependencies) : [];
};

export const normalizeTemplateOption = (
  input?: string,
): TemplateOptions | null => {
  if (!input) {
    return null;
  }
  const lower = input.toLowerCase();
  if (['commonjs', 'cjs'].includes(lower)) {
    return 'CommonJS';
  }
  if (['esmodules', 'esm', 'esm-js'].includes(lower)) {
    return 'ESModules';
  }
  if (['typescript', 'ts', 'esm-ts'].includes(lower)) {
    return 'Typescript';
  }
  return null;
};

export const normalizePackageManagerOption = (
  input?: string,
): CommandOptions | null => {
  if (!input) {
    return null;
  }
  const lower = input.toLowerCase();
  if (['npm', 'yarn', 'pnpm', 'bun'].includes(lower)) {
    return lower as CommandOptions;
  }
  return null;
};
