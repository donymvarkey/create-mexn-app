#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { displayAsciiArt } from './utils/displayAsciArt.js';
import { isDirectoryEmpty, isDirectoryPresent } from './utils/directoryOps.js';
import { showError } from './utils/logs.js';
import {
  getPackageInstallCommands,
  getTemplateRepo,
  getVersion,
} from './utils/utils.js';
import { createNewProject } from './utils/createNewProject.js';

const command = new Command();
const spinner = ora();

displayAsciiArt();

setTimeout(() => {
  command
    .name('create-mexn-app')
    .description('A CLI tool to scaffold a new MongoDB-Express-Node app')
    .version(
      getVersion(),
      '-v, --version',
      'Displays the current version of the CLI tool',
    )
    .argument('[project-name]', 'Name of the project', '.')
    .action(async (projectName) => {
      try {
        // create a directory with the given project name
        const targetDir = projectName
          ? path.resolve(process.cwd(), projectName)
          : process.cwd();

        if (isDirectoryPresent(targetDir) && !isDirectoryEmpty(targetDir)) {
          showError(
            `${targetDir} already exists at this location and is not empty`,
          );

          process.exit(1);
        }

        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: 'Select a template',
            choices: ['CommonJS', 'ESModules', 'Typescript'],
          },
        ]);

        const template = getTemplateRepo(answers.template);

        await createNewProject(targetDir, template);

        const packageManager = await inquirer.prompt([
          {
            type: 'list',
            name: 'installer',
            message: 'Select a package manager to install dependencies',
            choices: ['npm', 'yarn', 'pnpm'],
          },
        ]);
        chalk.greenBright(`Install packages using ${packageManager.installer}`);
        const command = getPackageInstallCommands(packageManager.installer);

        // Install dependencies
        spinner.start(`Install dependencies using ${packageManager.installer}`);
        execSync(command, {
          cwd: targetDir,
          stdio: 'inherit',
        });
        spinner.succeed(chalk.green('Dependencies installed successfully'));
      } catch (error: unknown) {
        if (error instanceof Error) {
          spinner.fail(chalk.red(`Error: ${error.message}`));
          showError(
            `Something went wrong while initializing project: ${error.message}`,
          );
        } else {
          spinner.fail(chalk.red('An unknown error occurred'));
          showError('Something went wrong while initializing project');
        }
        process.exit(1);
      }
    });

  command.parse(process.argv);
}, 400);
