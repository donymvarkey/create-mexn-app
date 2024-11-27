import chalk from 'chalk';

/**
 * Returns an error log to console
 */
export const showError = (msg: string) => {
  return console.log(chalk.red(msg));
};
