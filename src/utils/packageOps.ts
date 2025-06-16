import fs from 'fs';
import { getDependencies, getDevDependencies } from './utils.js';

/**
 * Updates the contents of a package.json file at the specified path.
 *
 * If a `projectName` is provided, it updates several fields in the package.json:
 * - Sets the `name` field to a kebab-case version of the project name.
 * - Sets the `version` to "1.0.0".
 * - Sets the `description` to "REST API for {projectName}".
 * - Initializes the `repository`, `keywords`, `author`, `bugs`, and `homepage` fields.
 *
 * After updating, it writes the changes back to the file system.
 * It also extracts and returns the dependencies and devDependencies using helper functions.
 *
 * @param packageJsonPath - The file path to the package.json file.
 * @param projectName - (Optional) The name of the project to update the package.json fields.
 * @returns An object containing the extracted `dependencies` and `devDependencies`.
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
