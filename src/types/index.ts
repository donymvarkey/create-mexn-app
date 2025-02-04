import { INSTALL_COMMANDS, TEMPLATES } from '../constants/index.js';

export type TemplateOptions = keyof typeof TEMPLATES;
export type CommandOptions = keyof typeof INSTALL_COMMANDS;
