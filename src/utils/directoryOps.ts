import fs from 'fs';
import path from 'path';

/**
 * Checks if a directory is empty.
 */
export const isDirectoryEmpty = (dirPath: string): boolean => {
  const files = fs.readdirSync(dirPath);
  return files.length === 0;
};

/**
 * Checks if a directory is present.
 */
export const isDirectoryPresent = (dirPath: string): boolean => {
  return fs.existsSync(dirPath);
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
 * Creates Dockerfile, docker-compose.yml, and .dockerignore files.
 */
export const createDockerFiles = (dirPath: string, projectName: string) => {
  const sanitizedName = (projectName || 'mexn-app')
    .toLowerCase()
    .replace(/\s+/g, '-');

  const dockerfileContent = `FROM node:22-alpine\n\nWORKDIR /app\n\nCOPY package*.json ./\n\nRUN npm install\n\nCOPY . .\n\nEXPOSE 5000\n\nCMD ["npm", "run", "dev"]\n`;

  const dockerComposeContent = `version: '3.8'\n\nservices:\n  app:\n    build: .\n    ports:\n      - '5000:5000'\n    environment:\n      - PORT=5000\n      - MONGO_URI=mongodb://mongo:27017/${sanitizedName}\n      - NODE_ENV=development\n    depends_on:\n      - mongo\n    volumes:\n      - .:/app\n      - /app/node_modules\n\n  mongo:\n    image: mongo:latest\n    ports:\n      - '27017:27017'\n    volumes:\n      - mongo-data:/data/db\n\nvolumes:\n  mongo-data:\n`;

  const dockerIgnoreContent = `node_modules\nnpm-debug.log\ndist\n.git\n.env\n`;

  fs.writeFileSync(path.join(dirPath, 'Dockerfile'), dockerfileContent);
  fs.writeFileSync(
    path.join(dirPath, 'docker-compose.yml'),
    dockerComposeContent,
  );
  fs.writeFileSync(path.join(dirPath, '.dockerignore'), dockerIgnoreContent);
};
