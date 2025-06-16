import fs from 'fs';
import { getDependencies, getDevDependencies } from './utils.js';

/**
 * Updates the package.json file with provided details.
 */
export const updatePackageJson = async (
  packageJsonPath: string,
  projectName?: string,
): Promise<object> => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  if (projectName) {
    packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
    packageJson.version = '1.0.0';
    packageJson.description = `REST API for ${projectName}`;
    packageJson.repository = { type: 'git', url: '' };
    packageJson.keywords = [];
    packageJson.author = '';
    packageJson.bugs = {};
    packageJson.homepage = '';
  }

  const dependencies = getDependencies(packageJson.dependencies);
  const devDependencies = getDevDependencies(packageJson.devDependencies);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  return { dependencies, devDependencies };
};
