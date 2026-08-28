import { downloadTemplate } from 'giget';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { GIT_TEMPLATE_URL } from '../constants/index.js';

export const cloneRepo = async (name: string, template: string) => {
  try {
    // giget uses a slightly different syntax than degit.
    // Since our GIT_TEMPLATE_URL is 'github:donymvarkey/create-mexn-app-templates'
    // We want to download a specific subdirectory (template).
    // Giget syntax for github subdirectories: 'github:owner/repo/subdir'
    const fullTemplateUrl = `${GIT_TEMPLATE_URL}/${template}`;

    await downloadTemplate(fullTemplateUrl, {
      dir: name,
      force: true, // Will overwrite if dir exists (we handle emptiness logic beforehand)
    });

    return true;
  } catch (error) {
    throw new Error(
      `Failed to download template from ${GIT_TEMPLATE_URL}/${template}. Please check your internet connection or GitHub rate limits. Details: ${(error as Error).message}`,
    );
  }
};

/**
 * Re-initializes a fresh Git repository in the target directory.
 */
export const reinitializeGitRepo = (
  projectDirectory: string,
  projectName: string,
  commitInitial: boolean = false,
): boolean => {
  try {
    const gitDir = path.join(projectDirectory, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    execSync('git init -b main', { cwd: projectDirectory, stdio: 'ignore' });

    if (commitInitial) {
      execSync('git add .', { cwd: projectDirectory, stdio: 'ignore' });
      const safeProjectName =
        projectName === '.' ? 'create-mexn-app' : projectName;
      execSync(`git commit -m "Initial commit for ${safeProjectName}"`, {
        cwd: projectDirectory,
        stdio: 'ignore',
      });
    }

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
