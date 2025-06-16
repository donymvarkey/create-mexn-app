import { getVersion } from '../utils/utils.js';

/**
 * The URL of the GitHub repository containing template projects for the application.
 *
 * This constant specifies the location of the template repository in the format
 * recognized by tools such as `degit` or similar scaffolding utilities.
 *
 * @remarks
 * The value uses the `github:` protocol to indicate a GitHub repository source.
 *
 * @example
 * // Usage example:
 * cloneTemplate(GIT_TEMPLATE_URL);
 */
export const GIT_TEMPLATE_URL = 'github:donymvarkey/create-mexn-app-templates';

/**
 * Contains metadata about the application, including its name, description, and version.
 *
 * @property {string} name - The name of the CLI tool.
 * @property {string} description - A brief description of the CLI tool's purpose.
 * @property {string} version - The current version of the CLI tool, retrieved dynamically.
 */
export const APP = {
  name: 'create-mexn-app',
  description: 'A CLI tool to scaffold a new MongoDB-Express-Node app',
  version: getVersion(),
};

/**
 * An object containing supported project template types and their corresponding identifiers.
 *
 * @property {string} CommonJS - Identifier for CommonJS template.
 * @property {string} ESModules - Identifier for ECMAScript Modules (JavaScript) template.
 * @property {string} Typescript - Identifier for ECMAScript Modules (TypeScript) template.
 */
export const TEMPLATES = {
  CommonJS: 'cjs',
  ESModules: 'esm-js',
  Typescript: 'esm-ts',
};

/**
 * An object mapping supported package managers to their respective install commands.
 *
 * @property {string} npm - The install command for npm.
 * @property {string} yarn - The install command for Yarn.
 * @property {string} pnpm - The install command for pnpm.
 */
export const INSTALL_COMMANDS = {
  npm: 'npm install',
  yarn: 'yarn',
  pnpm: 'pnpm install',
};
