import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  createDockerFiles,
  createDotEnvFile,
  isDirectoryEmpty,
  isDirectoryPresent,
} from '../src/utils/directoryOps.js';

describe('directoryOps', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mexn-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('isDirectoryPresent should correctly verify existence', () => {
    expect(isDirectoryPresent(tempDir)).toBe(true);
    expect(isDirectoryPresent(path.join(tempDir, 'nonexistent'))).toBe(false);
  });

  it('isDirectoryEmpty should report empty status accurately', () => {
    expect(isDirectoryEmpty(tempDir)).toBe(true);
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'hello');
    expect(isDirectoryEmpty(tempDir)).toBe(false);
  });

  it('createDotEnvFile should generate .env and .env.example', () => {
    createDotEnvFile(tempDir, 'My Test App');
    const envPath = path.join(tempDir, '.env');
    const envExamplePath = path.join(tempDir, '.env.example');

    expect(fs.existsSync(envPath)).toBe(true);
    expect(fs.existsSync(envExamplePath)).toBe(true);

    const envContent = fs.readFileSync(envPath, 'utf-8');
    expect(envContent).toContain('PORT=5000');
    expect(envContent).toContain(
      'MONGO_URI=mongodb://localhost:27017/my-test-app',
    );
  });

  it('createDockerFiles should generate Dockerfile, docker-compose.yml, and .dockerignore', () => {
    createDockerFiles(tempDir, 'Docker Test App');
    const dockerfilePath = path.join(tempDir, 'Dockerfile');
    const dockerComposePath = path.join(tempDir, 'docker-compose.yml');
    const dockerIgnorePath = path.join(tempDir, '.dockerignore');

    expect(fs.existsSync(dockerfilePath)).toBe(true);
    expect(fs.existsSync(dockerComposePath)).toBe(true);
    expect(fs.existsSync(dockerIgnorePath)).toBe(true);

    const composeContent = fs.readFileSync(dockerComposePath, 'utf-8');
    expect(composeContent).toContain('mongodb://mongo:27017/docker-test-app');
  });
});
