import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  createSwaggerFiles,
  createDotEnvFile,
  isDirectoryEmpty,
  isDirectoryPresent,
  emptyDirectory,
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

  it('emptyDirectory should clear directory contents but keep the directory and .git intact', () => {
    // Create some files and folders
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'hello');
    fs.mkdirSync(path.join(tempDir, 'subdir'));
    fs.writeFileSync(path.join(tempDir, 'subdir', 'other.txt'), 'world');
    fs.mkdirSync(path.join(tempDir, '.git'));
    fs.writeFileSync(path.join(tempDir, '.git', 'config'), 'gitdata');

    expect(isDirectoryEmpty(tempDir)).toBe(false);

    emptyDirectory(tempDir);

    const remainingFiles = fs.readdirSync(tempDir);
    expect(remainingFiles).toEqual(['.git']);
    expect(fs.existsSync(path.join(tempDir, '.git', 'config'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, 'file.txt'))).toBe(false);
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

  it('createSwaggerFiles should generate swagger.ts for esm-ts', () => {
    createSwaggerFiles(tempDir, 'esm-ts');
    const swaggerPath = path.join(tempDir, 'swagger.ts');
    expect(fs.existsSync(swaggerPath)).toBe(true);

    const content = fs.readFileSync(swaggerPath, 'utf-8');
    expect(content).toContain("import swaggerAutogen from 'swagger-autogen'");
  });

  it('createSwaggerFiles should generate swagger.js for cjs', () => {
    createSwaggerFiles(tempDir, 'cjs');
    const swaggerPath = path.join(tempDir, 'swagger.js');
    expect(fs.existsSync(swaggerPath)).toBe(true);

    const content = fs.readFileSync(swaggerPath, 'utf-8');
    expect(content).toContain(
      "const swaggerAutogen = require('swagger-autogen')()",
    );
  });
});
