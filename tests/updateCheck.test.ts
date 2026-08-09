import { describe, expect, it } from 'vitest';
import { checkUpdate } from '../src/utils/updateCheck.js';

describe('updateCheck', () => {
  it('checkUpdate should return a result object without throwing', async () => {
    const result = await checkUpdate();
    expect(result).toHaveProperty('hasUpdate');
    expect(result).toHaveProperty('current');
    expect(typeof result.hasUpdate).toBe('boolean');
  });
});
