import { describe, it, expect } from 'vitest';
import { isUrl, buildWaybackUrl } from '../url-utils.js';

describe('isUrl', () => {
  it('should accept valid http/https URLs', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('https://www.example.com/path')).toBe(true);
    expect(isUrl('http://test.org/page')).toBe(true);
    expect(isUrl('https://example.com/search?q=test&page=2')).toBe(true);
    expect(isUrl('https://example.com/path?a=1&b=2&c=3')).toBe(true);
  });

  it('should reject non-URL strings', () => {
    expect(isUrl('not a url')).toBe(false);
    expect(isUrl('')).toBe(false);
    expect(isUrl('just-some-text')).toBe(false);
    expect(isUrl('hello world')).toBe(false);
    expect(isUrl('12345')).toBe(false);
  });

  it('should handle URLs with ports', () => {
    expect(isUrl('https://example.com:8080')).toBe(true);
    expect(isUrl('http://localhost:3000/path')).toBe(true);
  });

  it('should handle URLs with fragments', () => {
    expect(isUrl('https://example.com/page#section')).toBe(true);
    expect(isUrl('https://example.com/page?q=1#top')).toBe(true);
  });

  it('should reject non-http protocols', () => {
    expect(isUrl('ftp://example.com')).toBe(false);
    expect(isUrl('mailto:user@example.com')).toBe(false);
    expect(isUrl('javascript:alert(1)')).toBe(false);
    expect(isUrl('data:text/html,<h1>Hi</h1>')).toBe(false);
    expect(isUrl('file:///etc/passwd')).toBe(false);
  });

  it('should handle URLs without protocol prefix', () => {
    // Without a protocol, the URL constructor can't parse these
    // so we prepend https:// and check if it's valid
    expect(isUrl('example.com')).toBe(true);
    expect(isUrl('www.example.com/path')).toBe(true);
  });

  it('should reject invalid URL formats', () => {
    expect(isUrl('http://')).toBe(false);
    expect(isUrl('https://')).toBe(false);
    expect(isUrl('://')).toBe(false);
    expect(isUrl('http://.')).toBe(false);
  });
});

describe('buildWaybackUrl', () => {
  it('should build a valid Wayback Machine URL', () => {
    expect(buildWaybackUrl('https://example.com')).toBe('https://web.archive.org/web/*/https://example.com');
  });

  it('should return empty string for falsy input', () => {
    expect(buildWaybackUrl('')).toBe('');
    expect(buildWaybackUrl(null)).toBe('');
    expect(buildWaybackUrl(undefined)).toBe('');
  });
});
