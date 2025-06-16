import fs from 'fs';

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
// Export const createDotEnvFile = async (
//   DirPath: string,
//   ProjectName: string,
// ) => {
//   Try {
//     Const contents = getDotEnvContents(projectName);
//     Fs.writeFileSync(`${dirPath}/.env`, contents);
//     Console.log(chalk.green(`Created .env file at location ${dirPath}`));
//   } catch (error) {
//     Console.error(error);
//   }
// };
