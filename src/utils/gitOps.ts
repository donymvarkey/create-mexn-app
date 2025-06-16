import degit from 'degit';
import { GIT_TEMPLATE_URL } from '../constants/index.js';

/**
 * Clones a repository template using the `degit` tool.
 *
 * @param name - The name of the new project directory to create.
 * @param template - The template repository name or path to clone from.
 * @returns A promise that resolves to `true` if the cloning succeeds, or the error object if it fails.
 */
export const cloneRepoWithDegit = async (name: string, template: string) => {
  try {
    const emitter = degit(`${GIT_TEMPLATE_URL}/${template}`);
    await emitter.clone(`/${name}`);
    return true;
  } catch (error) {
    return error;
  }
};
