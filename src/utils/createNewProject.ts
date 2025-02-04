import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { cloneRepoWithDegit } from './gitOps.js';
import { updatePackageJson } from './packageOps.js';

const spinner = ora();

export const createNewProject = async (
  projectName: string,
  projectTemplate: string,
) => {
  try {
    // Clone boilerplate code repo from github
    spinner.start(`Downloading template ${projectTemplate}`);

    const status = await cloneRepoWithDegit(projectName, projectTemplate);
    if (!status) {
      return false;
    }

    spinner.succeed(chalk.green('Template downloaded.'));
    spinner.succeed(chalk.green(`Creating new project at ${projectName}`));
    spinner.succeed(chalk.green(`Project created successfully.`));

    // Update package.json
    const packageJsonPath = path.join(projectName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      spinner.start('Updating package.json...');
      await updatePackageJson(packageJsonPath, projectName);
      spinner.succeed(chalk.green('package.json updated successfully'));
    } else {
      console.warn(
        chalk.yellow('Warning: package.json not found. Skipping update.'),
      );
    }
    return true;
  } catch (error) {
    return error;
  }
};
