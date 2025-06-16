import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { cloneRepoWithDegit } from './gitOps.js';
import { updatePackageJson } from './packageOps.js';

const spinner = ora();

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
