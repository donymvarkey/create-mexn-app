import { INSTALL_COMMANDS, TEMPLATES } from '../constants/index.js';

/**
 * Represents the available template option keys derived from the `TEMPLATES` object.
 * This type is used to restrict values to only those keys defined within `TEMPLATES`.
 */
export type TemplateOptions = keyof typeof TEMPLATES;

/**
 * Represents the valid option keys for install commands.
 *
 * This type is derived from the keys of the `INSTALL_COMMANDS` object,
 * ensuring that only recognized command options are allowed.
 */
export type CommandOptions = keyof typeof INSTALL_COMMANDS;

/**
 * Represents a mapping of dependency names to their version strings.
 *
 * @example
 * const dependencies: DependencyMap = {
 *   "react": "^18.0.0",
 *   "typescript": "^5.0.0"
 * };
 */
export type DependencyMap = Record<string, string>;
