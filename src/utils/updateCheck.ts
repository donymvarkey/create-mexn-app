import { getVersion } from './utils.js';

export interface UpdateCheckResult {
  hasUpdate: boolean;
  latest?: string;
  current: string;
}

/**
 * Checks npm registry asynchronously for a newer published version of create-mexn-app.
 */
export const checkUpdate = async (): Promise<UpdateCheckResult> => {
  const current = getVersion();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(
      'https://registry.npmjs.org/create-mexn-app/latest',
      {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      },
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = (await response.json()) as { version?: string };
      if (data.version && data.version !== current) {
        return {
          hasUpdate: true,
          latest: data.version,
          current,
        };
      }
    }
  } catch {
    // Ignore network timeouts or offline errors silently
  }
  return { hasUpdate: false, current };
};
