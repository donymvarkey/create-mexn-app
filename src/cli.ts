#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { displayAsciiArt } from './utils/displayAsciArt.js';
import { isDirectoryEmpty, isDirectoryPresent } from './utils/directoryOps.js';
import { showError } from './utils/logs.js';
import { updatePackageJson } from './utils/packageOps.js';
import { getVersion, showHelp } from './utils/utils.js';
import { getTemplateRepo } from './constants/index.js';
import { cloneRepoWithDegit } from './utils/gitOps.js';

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
    .helpOption('-h, --help', 'Display help information')
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

        // Clone boilerplate code repo from github
        spinner.start(`Downloading template ${template}`);

        await cloneRepoWithDegit(targetDir, template);
        spinner.succeed(chalk.green('Download success'));
        spinner.succeed(chalk.green(`Project ${targetDir} created`));

        // Remove existing Git details and initialize new Git repo
        // spinner.start('Resetting Git repository...');
        // await initializeNewGitRepo(targetDir);
        // spinner.succeed(chalk.green('New Git repository initialized.'));

        // Update package.json
        const packageJsonPath = path.join(targetDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          spinner.start('Updating package.json...');
          await updatePackageJson(packageJsonPath, projectName);
          spinner.succeed(chalk.green('Updated success.'));
        } else {
          console.warn(
            chalk.yellow('Warning: package.json not found. Skipping update.'),
          );
        }

        // Install dependencies
        spinner.start('Installing dependencies...');
        execSync('npm install', {
          cwd: targetDir,
          stdio: 'inherit',
        });
        spinner.succeed(chalk.green('Dependency installation complete'));

        // ! Not required as provided a .env.example in the template code itself
        // Create a .env file inside the project.
        //   spinner.start("Creating .env file");
        //   createDotEnvFile(targetDir, projectName);
        //   spinner.succeed(chalk.green("env file created successfully!"));

        //   console.log(
        //     chalk.green(`To get started, run cd ${projectName} and npm run dev`)
        //   );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        spinner.fail(chalk.red(`Error: ${error.message}`));
        showError(
          `Something went wrong while initiating a project: ${error.message}`,
        );
        process.exit(1);
      }
    });

  command.on('--help', showHelp);
  command.on('--version', getVersion);

  command.parse(process.argv);
}, 400);
