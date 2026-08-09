import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { updatePackageJson } from '../src/utils/packageOps.js';

describe('packageOps', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mexn-pkg-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('updatePackageJson should update metadata fields and extract dependencies', async () => {
    const pkgPath = path.join(tempDir, 'package.json');
    const initialPkg = {
      name: 'template-app',
      version: '0.0.1',
      dependencies: { express: '^4.18.0' },
      devDependencies: { typescript: '^5.0.0' },
    };
    fs.writeFileSync(pkgPath, JSON.stringify(initialPkg, null, 2));

    const result = (await updatePackageJson(pkgPath, 'Cool API App')) as {
      dependencies: string[];
      devDependencies: string[];
    };

    expect(result.dependencies).toEqual(['express']);
    expect(result.devDependencies).toEqual(['typescript']);

    const updatedPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(updatedPkg.name).toBe('cool-api-app');
    expect(updatedPkg.version).toBe('1.0.0');
    expect(updatedPkg.description).toBe('REST API for Cool API App');
  });
});
