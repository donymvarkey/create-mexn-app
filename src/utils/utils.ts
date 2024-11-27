import chalk from 'chalk';
import { APP_VERSION } from '../version.js';

// Get the version from package.json dynamically
export const getVersion = () => {
  return `create-mexn-app v${APP_VERSION}`;
};

// Display help information
export const showHelp = () => {
  console.log(
    chalk.yellow(`
Usage: create-mexn-app [project-name] [options]

Options:
  -v, --version          Show CLI version
  -h, --help             Display help for the CLI tool
`),
  );
};
