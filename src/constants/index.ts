import { APP_VERSION } from '../version.js';

export const GIT_TEMPLATE_URL = 'github:donymvarkey/create-mexn-app-templates';

export const APP = {
  name: 'create-mexn-app',
  description: 'A CLI tool to scaffold a new MongoDB-Express-Node app',
  version: APP_VERSION,
};

export const TEMPLATES = {
  CommonJS: 'cjs',
  ESModules: 'esm-js',
  Typescript: 'esm-ts',
};

export const INSTALL_COMMANDS = {
  npm: 'npm install',
  yarn: 'yarn',
  pnpm: 'pnpm install',
};
