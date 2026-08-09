import degit from 'degit';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { GIT_TEMPLATE_URL } from '../constants/index.js';

export const cloneRepoWithDegit = async (name: string, template: string) => {
  const emitter = degit(`${GIT_TEMPLATE_URL}/${template}`);
  await emitter.clone(name);
  return true;
};

/**
 * Re-initializes a fresh Git repository in the target directory.
 */
export const reinitializeGitRepo = (projectDirectory: string): boolean => {
  try {
    const gitDir = path.join(projectDirectory, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    execSync('git init -b main', { cwd: projectDirectory, stdio: 'ignore' });
    execSync('git add .', { cwd: projectDirectory, stdio: 'ignore' });
    execSync('git commit -m "Initial commit from create-mexn-app"', {
      cwd: projectDirectory,
      stdio: 'ignore',
    });
    return true;
  } catch {
    try {
      execSync('git init', { cwd: projectDirectory, stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
};
