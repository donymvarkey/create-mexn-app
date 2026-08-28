import fs from 'fs';
import { getDependencies, getDevDependencies } from './utils.js';

/**
 * Updates the package.json file with provided details.
 */
export const updatePackageJson = async (
  packageJsonPath: string,
  projectName?: string,
  includeSwagger?: boolean,
): Promise<{ dependencies: string[]; devDependencies: string[] }> => {
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

  if (includeSwagger) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      'swagger-ui-express': '^5.0.1',
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'swagger-autogen': '^2.23.7',
    };

    // Add a script to run swagger autogen
    const isTs =
      packageJsonPath.includes('esm-ts') ||
      packageJson.devDependencies?.typescript;
    packageJson.scripts = {
      ...packageJson.scripts,
      swagger: isTs ? 'ts-node swagger.ts' : 'node swagger.js',
    };
  }

  const dependencies = getDependencies(packageJson.dependencies);
  const devDependencies = getDevDependencies(packageJson.devDependencies);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  return { dependencies, devDependencies };
};
