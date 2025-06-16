#!/usr/bin/env node
/**
 * Entry point for the create-mexn-app CLI tool.
 *
 * This script scaffolds a new MongoDB-Express-Node application based on user input.
 * It provides an interactive CLI using Commander and Inquirer to:
 * - Display ASCII art branding.
 * - Prompt for project name and template type (CommonJS, ESModules, Typescript).
 * - Create a new project directory and initialize it with the selected template.
 * - Prompt for a package manager (npm, yarn, pnpm) and install dependencies.
 * - Display the list of dependencies and devDependencies used in the project.
 * - Handle errors gracefully and provide user-friendly feedback.
 *
 * Utilities and helpers are imported for directory operations, logging, template selection,
 * and project creation.
 *
 * @file CLI entry point for scaffolding a new MongoDB-Express-Node app.
 * @module cli
 */

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
console.log('\n');

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
        console.log('\n');
        // Create a directory with the given project name
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
        console.log('\n');

        const deps = (await createNewProject(
          targetDir,
          projectName,
          template,
        )) as Record<string, string[]>;

        console.log('\n');

        const packageManager = await inquirer.prompt([
          {
            type: 'list',
            name: 'installer',
            message: 'Select a package manager to install dependencies',
            choices: ['npm', 'yarn', 'pnpm'],
          },
        ]);
        console.log(
          chalk.greenBright(
            `Install packages using ${packageManager.installer}`,
          ),
        );
        const command = getPackageInstallCommands(packageManager.installer);

        console.log('\n');

        // Show dependencies used in the project
        console.log(chalk.bold.yellowBright('Dependencies'));
        console.log(chalk.blue('---------------------------------'));
        deps.dependencies.map((dep: string) =>
          console.log(chalk.blue(`${dep}`)),
        );
        console.log(chalk.blue('---------------------------------'));
        console.log('\n');

        // Show devDependencies used in the project
        console.log(chalk.bold.yellowBright('Dev Dependencies'));
        console.log(chalk.blue('---------------------------------'));
        deps.devDependencies.map((dep: string) =>
          console.log(chalk.blue(`${dep}`)),
        );
        console.log(chalk.blue('---------------------------------'));
        console.log('\n');
        // Install dependencies
        spinner.start(`Install dependencies using ${packageManager.installer}`);
        execSync(command, {
          cwd: targetDir,
          stdio: 'inherit',
        });
        console.log('\n');
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
