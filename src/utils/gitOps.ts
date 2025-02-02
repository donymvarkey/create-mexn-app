import { simpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';
import degit from 'degit';
import { GIT_TEMPLATE_URL } from '../constants/index.js';

/**
 * Clones a repository to the target directory.
 */
export const cloneRepository = async (
  gitUrl: string,
  targetDir: string,
): Promise<void> => {
  await simpleGit().clone(gitUrl, targetDir);
};

/**
 * Removes existing Git details and initializes a new Git repository.
 */
export const initializeNewGitRepo = async (
  targetDir: string,
): Promise<void> => {
  const gitDir = path.join(targetDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }
  await simpleGit(targetDir).init();
};

export const cloneRepoWithDegit = async (name: string, template: string) => {
  const emitter = degit(`${GIT_TEMPLATE_URL}/${template}`);
  return await emitter.clone(`/${name}`);
};
