import { describe, it, expect } from 'vitest';
import { DEFAULT_SETTINGS } from '../settings.js';

describe('settings', () => {
  it('should have popupEnabled default to true', () => {
    expect(DEFAULT_SETTINGS.popupEnabled).toBe(true);
  });

  it('should export DEFAULT_SETTINGS as a frozen-like object with expected keys', () => {
    expect(DEFAULT_SETTINGS).toHaveProperty('popupEnabled');
    expect(Object.keys(DEFAULT_SETTINGS)).toEqual(['popupEnabled']);
  });
});
