import chalk from 'chalk';

/**
 * Logs an error message to the console in red color.
 *
 * @param msg - The error message to display.
 * @returns The result of the `console.log` call.
 */
export const showError = (msg: string) => {
  return console.log(chalk.red(msg));
};
