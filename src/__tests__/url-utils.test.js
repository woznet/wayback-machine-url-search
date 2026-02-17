import { describe, it, expect } from 'vitest';
import { isUrl } from '../url-utils.js';

describe('isUrl', () => {
  it('should match basic valid URLs', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('https://www.example.com/path')).toBe(true);
    expect(isUrl('example.com')).toBe(true);
  });

  it('should reject non-URL strings', () => {
    expect(isUrl('not a url')).toBe(false);
    expect(isUrl('')).toBe(false);
    expect(isUrl('just-some-text')).toBe(false);
    expect(isUrl('hello world')).toBe(false);
  });

  it('should match URLs with ampersand in query strings', () => {
    expect(isUrl('https://example.com/search?q=test&page=2')).toBe(true);
    expect(isUrl('https://example.com/path?a=1&b=2&c=3')).toBe(true);
  });

  it('should handle trimmed input (pre-trimmed by caller)', () => {
    // These test that the function works with clean input
    // The trimming responsibility is on the caller (background.js)
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://test.org/page')).toBe(true);
  });
});
