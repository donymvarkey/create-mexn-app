import { describe, expect, it } from 'vitest';
import {
  getDependencies,
  getDevDependencies,
  getPackageInstallCommands,
  getTemplateRepo,
  getVersion,
  normalizePackageManagerOption,
  normalizeTemplateOption,
} from '../src/utils/utils.js';

describe('utils', () => {
  it('getVersion should return a valid version string', () => {
    const version = getVersion();
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('getTemplateRepo should map templates to repo keys', () => {
    expect(getTemplateRepo('CommonJS')).toBe('cjs');
    expect(getTemplateRepo('ESModules')).toBe('esm-js');
    expect(getTemplateRepo('Typescript')).toBe('esm-ts');
  });

  it('getPackageInstallCommands should map package managers to install commands', () => {
    expect(getPackageInstallCommands('npm')).toBe('npm install');
    expect(getPackageInstallCommands('yarn')).toBe('yarn');
    expect(getPackageInstallCommands('pnpm')).toBe('pnpm install');
    expect(getPackageInstallCommands('bun')).toBe('bun install');
  });

  it('getDependencies and getDevDependencies should handle objects safely', () => {
    expect(getDependencies({ express: '^4.18.0' })).toEqual(['express']);
    expect(getDependencies()).toEqual([]);
    expect(getDevDependencies({ typescript: '^5.0.0' })).toEqual([
      'typescript',
    ]);
    expect(getDevDependencies()).toEqual([]);
  });

  describe('normalizeTemplateOption', () => {
    it('should normalize valid template aliases', () => {
      expect(normalizeTemplateOption('commonjs')).toBe('CommonJS');
      expect(normalizeTemplateOption('cjs')).toBe('CommonJS');
      expect(normalizeTemplateOption('esmodules')).toBe('ESModules');
      expect(normalizeTemplateOption('esm')).toBe('ESModules');
      expect(normalizeTemplateOption('typescript')).toBe('Typescript');
      expect(normalizeTemplateOption('ts')).toBe('Typescript');
    });

    it('should return null for invalid template input', () => {
      expect(normalizeTemplateOption('invalid')).toBeNull();
      expect(normalizeTemplateOption(undefined)).toBeNull();
    });
  });

  describe('normalizePackageManagerOption', () => {
    it('should normalize valid package manager choices', () => {
      expect(normalizePackageManagerOption('npm')).toBe('npm');
      expect(normalizePackageManagerOption('YARN')).toBe('yarn');
      expect(normalizePackageManagerOption('pnpm')).toBe('pnpm');
      expect(normalizePackageManagerOption('bun')).toBe('bun');
    });

    it('should return null for invalid package manager input', () => {
      expect(normalizePackageManagerOption('invalid')).toBeNull();
      expect(normalizePackageManagerOption(undefined)).toBeNull();
    });
  });
});
