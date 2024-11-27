import fs from 'fs';
import { getDotEnvContents } from '../constants/index.js';
import chalk from 'chalk';

/**
 * Checks if a directory is empty.
 */
export const isDirectoryEmpty = (dirPath: string): boolean => {
  const files = fs.readdirSync(dirPath);
  return files.length === 0;
};

/**
 * Checks if a directory is present
 */
export const isDirectoryPresent = (dirPath: string): boolean => {
  return fs.existsSync(dirPath);
};

/**
 *
 * @param dirPath string
 * @param projectName string
 * create a .env file in the project
 */
export const createDotEnvFile = async (
  dirPath: string,
  projectName: string,
) => {
  try {
    const contents = getDotEnvContents(projectName);
    fs.writeFileSync(`${dirPath}/.env`, contents);
    console.log(chalk.green(`Created .env file at location ${dirPath}`));
  } catch (error) {
    console.error(error);
  }
};
