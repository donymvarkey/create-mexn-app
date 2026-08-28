import fs from 'fs';
import path from 'path';

/**
 * Checks if a directory is empty.
 * Ignores hidden files like .git or .DS_Store to be less strict.
 */
export const isDirectoryEmpty = (dirPath: string): boolean => {
  const files = fs.readdirSync(dirPath);
  // It's empty if there are no files or only hidden files (like .git, .DS_Store)
  return files.length === 0 || files.every((f) => f.startsWith('.'));
};

/**
 * Checks if a directory is present.
 */
export const isDirectoryPresent = (dirPath: string): boolean => {
  return fs.existsSync(dirPath);
};

/**
 * Empties a directory completely, removing all contents but keeping the directory itself.
 */
export const emptyDirectory = (dirPath: string): void => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    // Keep .git directory untouched if it exists, to avoid deleting git history
    if (file === '.git') continue;
    fs.rmSync(path.resolve(dirPath, file), { recursive: true, force: true });
  }
};

/**
 * Creates default .env and .env.example files in the project if absent.
 */
export const createDotEnvFile = (dirPath: string, projectName: string) => {
  const sanitizedName = (projectName || 'mexn-app')
    .toLowerCase()
    .replace(/\s+/g, '-');
  const envContent = `PORT=5000\nMONGO_URI=mongodb://localhost:27017/${sanitizedName}\nNODE_ENV=development\n`;

  const envPath = path.join(dirPath, '.env');
  const envExamplePath = path.join(dirPath, '.env.example');

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
  }
  if (!fs.existsSync(envExamplePath)) {
    fs.writeFileSync(envExamplePath, envContent);
  }
};

/**
 * Creates Swagger configuration file.
 */
export const createSwaggerFiles = (dirPath: string, templateType: string) => {
  const isTypescript = templateType === 'esm-ts';
  const isCJS = templateType === 'cjs';

  const swaggerExt = isTypescript ? 'ts' : 'js';

  let swaggerContent = '';

  if (isCJS) {
    swaggerContent = `const swaggerAutogen = require('swagger-autogen')();\n\nconst doc = {\n  info: {\n    title: 'MEXN API',\n    description: 'API Documentation for MEXN Application'\n  },\n  host: 'localhost:5000'\n};\n\nconst outputFile = './swagger-output.json';\nconst routes = ['./index.js'];\n\nswaggerAutogen(outputFile, routes, doc);\n`;
  } else {
    swaggerContent = `import swaggerAutogen from 'swagger-autogen';\n\nconst doc = {\n  info: {\n    title: 'MEXN API',\n    description: 'API Documentation for MEXN Application'\n  },\n  host: 'localhost:5000'\n};\n\nconst outputFile = './swagger-output.json';\nconst routes = ['./index.${swaggerExt}'];\n\nswaggerAutogen()(outputFile, routes, doc);\n`;
  }

  fs.writeFileSync(path.join(dirPath, `swagger.${swaggerExt}`), swaggerContent);
};

/**
 * Adds a "Scaffolded with create-mexn-app" badge to the generated README.md.
 */
export const updateReadme = (dirPath: string, projectName: string) => {
  const readmePath = path.join(dirPath, 'README.md');
  const badgeMarkdown = `\n[![Scaffolded with create-mexn-app](https://img.shields.io/badge/Scaffolded_with-create--mexn--app-blue)](https://github.com/donymvarkey/create-mexn-app)\n`;
  const defaultReadme = `# ${projectName}\n${badgeMarkdown}\nThis project was bootstrapped with [create-mexn-app](https://github.com/donymvarkey/create-mexn-app).\n`;

  if (fs.existsSync(readmePath)) {
    const existingContent = fs.readFileSync(readmePath, 'utf-8');
    // Prepend the badge if it's not already there
    if (!existingContent.includes('Scaffolded with create-mexn-app')) {
      // Find the first heading to insert the badge right after it
      const lines = existingContent.split('\n');
      let inserted = false;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
          lines.splice(i + 1, 0, badgeMarkdown);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        lines.unshift(badgeMarkdown);
      }

      fs.writeFileSync(readmePath, lines.join('\n'));
    }
  } else {
    fs.writeFileSync(readmePath, defaultReadme);
  }
};
