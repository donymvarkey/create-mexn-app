import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { cloneRepoWithDegit } from './gitOps.js';
import { updatePackageJson } from './packageOps.js';

const spinner = ora();

/**
 * Creates a new project by downloading a template repository, updating the project name in package.json,
 * and returning the updated dependencies.
 *
 * @param projectDirectory - The directory where the new project will be created.
 * @param projectName - The name to assign to the new project.
 * @param projectTemplate - The template repository to use for the new project.
 * @returns A promise that resolves to the updated dependencies if successful, `false` if cloning fails,
 * or an error object if an exception occurs.
 */
export const createNewProject = async (
  projectDirectory: string,
  projectName: string,
  projectTemplate: string,
) => {
  try {
    // Clone boilerplate code repo from github
    spinner.start(`Downloading template ${projectTemplate}`);
    let deps;

    const status = await cloneRepoWithDegit(projectDirectory, projectTemplate);
    if (!status) {
      return false;
    }

    spinner.succeed(chalk.green('Template downloaded.'));
    spinner.succeed(chalk.green(`Creating new project at ${projectDirectory}`));
    spinner.succeed(chalk.green(`Project created successfully.`));

    // Update package.json
    const packageJsonPath = path.join(projectDirectory, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      spinner.start('Updating package.json...');
      deps = await updatePackageJson(packageJsonPath, projectName);
      spinner.succeed(chalk.green('package.json updated successfully'));
    } else {
      console.warn(
        chalk.yellow('Warning: package.json not found. Skipping update.'),
      );
    }
    return deps;
  } catch (error) {
    return error;
  }
};
