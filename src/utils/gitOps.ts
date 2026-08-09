import degit from 'degit';
import { GIT_TEMPLATE_URL } from '../constants/index.js';

export const cloneRepoWithDegit = async (name: string, template: string) => {
  const emitter = degit(`${GIT_TEMPLATE_URL}/${template}`);
  await emitter.clone(name);
  return true;
};
