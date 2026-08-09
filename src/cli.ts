#!/usr/bin/env node
import cac from 'cac';
import path from 'path';
import chalk from 'chalk';
import {
  cancel,
  confirm,
  intro,
  isCancel,
  note,
  outro,
  select,
  spinner as clackSpinner,
} from '@clack/prompts';
import { execSync } from 'child_process';
import { displayAsciiArt } from './utils/displayAsciArt.js';
import { isDirectoryEmpty, isDirectoryPresent } from './utils/directoryOps.js';
import { showError } from './utils/logs.js';
import {
  getPackageInstallCommands,
  getTemplateRepo,
  getVersion,
  normalizePackageManagerOption,
  normalizeTemplateOption,
} from './utils/utils.js';
import { createNewProject } from './utils/createNewProject.js';
import { checkUpdate } from './utils/updateCheck.js';
import { CommandOptions, TemplateOptions } from './types/index.js';

interface CliOptions {
  template?: string;
  packageManager?: string;
  yes?: boolean;
  skipInstall?: boolean;
  git?: boolean;
  docker?: boolean;
  dryRun?: boolean;
}

const cli = cac('create-mexn-app');

cli
  .command(
    '[project-name]',
    'A CLI tool to scaffold a new MongoDB-Express-Node app',
  )
  .option(
    '-t, --template <template>',
    'Specify template (CommonJS | ESModules | Typescript)',
  )
  .option(
    '-p, --package-manager <installer>',
    'Specify package manager (npm | yarn | pnpm | bun)',
  )
  .option('-y, --yes', 'Use default options for prompts without asking')
  .option('--skip-install', 'Skip installing dependencies')
  .option('--no-git', 'Skip git repository re-initialization')
  .option('--docker', 'Generate Dockerfile and docker-compose.yml')
  .option('--dry-run', 'Preview scaffolding action without modifying disk')
  .action(async (projectNameInput: string | undefined, options: CliOptions) => {
    try {
      displayAsciiArt();
      intro(
        chalk.bgCyan.black(' create-mexn-app ') +
          chalk.dim(` v${getVersion()}`),
      );

      const projectName = projectNameInput || '.';
      const targetDir = path.resolve(process.cwd(), projectName);

      if (isDirectoryPresent(targetDir) && !isDirectoryEmpty(targetDir)) {
        cancel(
          `Directory ${chalk.bold(targetDir)} already exists and is not empty.`,
        );
        process.exit(1);
      }

      let selectedTemplate: TemplateOptions;

      if (options.template) {
        const normalized = normalizeTemplateOption(options.template);
        if (!normalized) {
          cancel(
            `Invalid template "${options.template}". Allowed values: CommonJS, ESModules, Typescript (or cjs, esm, ts)`,
          );
          process.exit(1);
        }
        selectedTemplate = normalized;
      } else if (options.yes) {
        selectedTemplate = 'Typescript';
      } else {
        const templateAnswer = await select({
          message: 'Select a template',
          options: [
            {
              value: 'Typescript',
              label: 'Typescript',
              hint: 'Recommended',
            },
            {
              value: 'ESModules',
              label: 'ESModules',
              hint: 'Modern JavaScript',
            },
            {
              value: 'CommonJS',
              label: 'CommonJS',
              hint: 'Standard Node.js CJS',
            },
          ],
        });

        if (isCancel(templateAnswer)) {
          cancel('Operation cancelled.');
          process.exit(0);
        }
        selectedTemplate = templateAnswer as TemplateOptions;
      }

      let includeDocker = options.docker;
      if (includeDocker === undefined && !options.yes) {
        const dockerAnswer = await confirm({
          message:
            'Include Docker configuration (Dockerfile & docker-compose.yml)?',
          initialValue: false,
        });

        if (isCancel(dockerAnswer)) {
          cancel('Operation cancelled.');
          process.exit(0);
        }
        includeDocker = Boolean(dockerAnswer);
      }

      const templateRepo = getTemplateRepo(selectedTemplate);

      if (options.dryRun) {
        note(
          `Target Directory: ${targetDir}\nTemplate: ${selectedTemplate} (${templateRepo})\nPackage Manager: ${options.packageManager || (options.yes ? 'npm' : 'Interactive Prompt')}\nGit Initialization: ${options.git !== false ? 'Enabled' : 'Disabled'}\nDocker Files: ${includeDocker ? 'Enabled' : 'Disabled'}`,
          'Dry Run Mode (No files written)',
        );
        outro(chalk.yellow('Dry run execution complete cleanly.'));
        return;
      }

      const spinner = clackSpinner();

      spinner.start(`Downloading template ${chalk.cyan(selectedTemplate)}...`);

      const deps = await createNewProject(
        targetDir,
        projectName,
        templateRepo,
        { git: options.git, docker: includeDocker },
      );

      spinner.stop(
        `Scaffolded ${chalk.cyan(selectedTemplate)} template in ${chalk.bold(targetDir)}.`,
      );

      if (options.skipInstall) {
        note(
          `Project created at ${targetDir}\n\nNext steps:\n${projectName !== '.' ? `  cd ${projectName}\n` : ''}  npm install`,
          'Skipped Dependency Installation',
        );
        outro('Scaffolding complete!');
        return;
      }

      let installer: CommandOptions;

      if (options.packageManager) {
        const normalized = normalizePackageManagerOption(
          options.packageManager,
        );
        if (!normalized) {
          cancel(
            `Invalid package manager "${options.packageManager}". Allowed values: npm, yarn, pnpm, bun`,
          );
          process.exit(1);
        }
        installer = normalized;
      } else if (options.yes) {
        installer = 'npm';
      } else {
        const pmAnswer = await select({
          message: 'Select a package manager to install dependencies',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'bun', label: 'bun' },
          ],
        });

        if (isCancel(pmAnswer)) {
          cancel('Operation cancelled.');
          process.exit(0);
        }
        installer = pmAnswer as CommandOptions;
      }

      const installCommand = getPackageInstallCommands(installer);

      // Render dependencies summary
      if (deps.dependencies && deps.dependencies.length > 0) {
        console.log(chalk.bold.yellowBright('\nDependencies:'));
        deps.dependencies.forEach((dep: string) =>
          console.log(chalk.dim(`  - ${dep}`)),
        );
      }

      if (deps.devDependencies && deps.devDependencies.length > 0) {
        console.log(chalk.bold.yellowBright('\nDev Dependencies:'));
        deps.devDependencies.forEach((dep: string) =>
          console.log(chalk.dim(`  - ${dep}`)),
        );
      }

      console.log('\n');
      spinner.start(
        `Installing dependencies with ${chalk.green(installer)}...`,
      );
      execSync(installCommand, {
        cwd: targetDir,
        stdio: 'inherit',
      });
      spinner.stop(
        `Dependencies installed successfully with ${chalk.green(installer)}.`,
      );

      const cdCommand = projectName !== '.' ? `cd ${projectName}\n` : '';
      note(`${cdCommand}${installer} run dev`, 'Success! Next steps:');

      const updateInfo = await checkUpdate();
      if (updateInfo.hasUpdate) {
        console.log(
          chalk.yellow(
            `  Update available: ${updateInfo.current} → ${updateInfo.latest} | Run: npx create-mexn-app@latest\n`,
          ),
        );
      }

      outro(chalk.green('Project initialized and ready to go! 🎉'));
    } catch (error: unknown) {
      if (error instanceof Error) {
        cancel(`Something went wrong: ${error.message}`);
        showError(error.message);
      } else {
        cancel('An unknown error occurred.');
      }
      process.exit(1);
    }
  });

cli.help();
cli.version(getVersion());
cli.parse();
