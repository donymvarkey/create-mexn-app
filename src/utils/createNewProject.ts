import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { cloneRepoWithDegit, reinitializeGitRepo } from './gitOps.js';
import { updatePackageJson } from './packageOps.js';
import { createDockerFiles, createDotEnvFile } from './directoryOps.js';

export const createNewProject = async (
  projectDirectory: string,
  projectName: string,
  projectTemplate: string,
  options: { git?: boolean; docker?: boolean } = { git: true },
): Promise<{ dependencies: string[]; devDependencies: string[] }> => {
  let deps = {
    dependencies: [] as string[],
    devDependencies: [] as string[],
  };

  await cloneRepoWithDegit(projectDirectory, projectTemplate);

  // Create default .env and .env.example
  createDotEnvFile(projectDirectory, projectName);

  // Create Docker files if requested
  if (options.docker) {
    createDockerFiles(projectDirectory, projectName);
  }

  // Re-initialize Git repository if requested
  if (options.git !== false) {
    reinitializeGitRepo(projectDirectory);
  }

  // Update package.json
  const packageJsonPath = path.join(projectDirectory, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    deps = (await updatePackageJson(packageJsonPath, projectName)) as {
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
