#!/usr/bin/env node
import { Command } from "commander";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { displayAsciiArt } from "./utils/displayAsciArt.js";
import {
  createDotEnvFile,
  isDirectoryEmpty,
  isDirectoryPresent,
} from "./utils/directoryOps.js";
import { showError } from "./utils/logs.js";
import { GIT_TEMPLATE_URL } from "./constants/index.js";
import { cloneRepository, initializeNewGitRepo } from "./utils/gitOps.js";
import { updatePackageJson } from "./utils/packageOps.js";
import { getVersion, showHelp } from "./utils/utils.js";

const command = new Command();
const spinner = ora();

displayAsciiArt();

command
  .name("create-mexn-app")
  .description("A CLI tool to scaffold a new MongoDB-Express-Node app")
  .version(
    getVersion(),
    "-v, --version",
    "Displays the current version of the CLI tool"
  )
  .helpOption("-h, --help", "Display help information")
  .argument("[project-name]", "Name of the project", ".")
  .action(async (projectName) => {
    try {
      // create a directory with the given project name
      const targetDir = projectName
        ? path.resolve(process.cwd(), projectName)
        : process.cwd();

      if (isDirectoryPresent(targetDir) && !isDirectoryEmpty(targetDir)) {
        showError(
          `${targetDir} already exists at this location and is not empty`
        );

        process.exit(1);
      }

      // Clone boilerplate code repo from github
      spinner.start(
        `Cloning repository from ${GIT_TEMPLATE_URL} into ${targetDir}`
      );
      await cloneRepository(GIT_TEMPLATE_URL, targetDir);
      spinner.succeed(chalk.green("Repository cloned successfully."));

      // Remove existing Git details and initialize new Git repo
      spinner.start("Resetting Git repository...");
      await initializeNewGitRepo(targetDir);
      spinner.succeed(chalk.green("New Git repository initialized."));

      // Update package.json
      const packageJsonPath = path.join(targetDir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        spinner.start("Updating package.json...");
        await updatePackageJson(packageJsonPath, projectName);
        spinner.succeed(chalk.green("package.json updated successfully."));
      } else {
        console.warn(
          chalk.yellow("Warning: package.json not found. Skipping update.")
        );
      }

      // Install dependencies
      spinner.start("Installing dependencies...");
      execSync("npm install", {
        cwd: targetDir,
        stdio: "inherit",
      });
      spinner.succeed(chalk.green("Dependencies installed successfully."));

      // ! Not required as provided a .env.example in the template code itself
      // Create a .env file inside the project.
      //   spinner.start("Creating .env file");
      //   createDotEnvFile(targetDir, projectName);
      //   spinner.succeed(chalk.green("env file created successfully!"));

      //   console.log(
      //     chalk.green(`To get started, run cd ${projectName} and npm run dev`)
      //   );
    } catch (error: any) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
      showError(
        `Something went wrong while initiating a project: ${error.message}`
      );
      process.exit(1);
    }
  });

command.on("--help", showHelp);
command.on("--version", getVersion);

command.parse(process.argv);
