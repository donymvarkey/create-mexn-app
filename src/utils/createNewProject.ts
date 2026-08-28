import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { cloneRepo, reinitializeGitRepo } from './gitOps.js';
import { updatePackageJson } from './packageOps.js';
import {
  createDotEnvFile,
  createSwaggerFiles,
  updateReadme,
} from './directoryOps.js';

export const createNewProject = async (
  projectDirectory: string,
  projectName: string,
  projectTemplate: string,
  options: { git?: boolean; swagger?: boolean; commitInitial?: boolean } = {
    git: true,
  },
): Promise<{ dependencies: string[]; devDependencies: string[] }> => {
  let deps = {
    dependencies: [] as string[],
    devDependencies: [] as string[],
  };

  await cloneRepo(projectDirectory, projectTemplate);

  // Create default .env and .env.example
  createDotEnvFile(projectDirectory, projectName);

  // Update the README with the badge
  updateReadme(projectDirectory, projectName);

  // Create swagger configuration if requested
  if (options.swagger) {
    createSwaggerFiles(projectDirectory, projectTemplate);
  }

  // Re-initialize Git repository if requested
  if (options.git !== false) {
    reinitializeGitRepo(projectDirectory, projectName, options.commitInitial);
  }

  // Update package.json
  const packageJsonPath = path.join(projectDirectory, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    deps = (await updatePackageJson(
      packageJsonPath,
      projectName,
      options.swagger,
    )) as {
      dependencies: string[];
      devDependencies: string[];
    };
  } else {
    console.warn(
      chalk.yellow('Warning: package.json not found. Skipping update.'),
    );
  }
  return deps;
};
