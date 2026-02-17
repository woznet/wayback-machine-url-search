## Phase 1 Complete: Fix Critical Bugs

Set up Vitest testing framework and fixed all 3 critical bugs: manifest typo, HTML entity in regex, and missing trim on selection text. Extracted `isUrl` into a testable module.

**Files created:**
- `package.json` — project config with Vitest dev dependency and test script
- `vitest.config.js` — basic Vitest configuration
- `src/url-utils.js` — extracted `isUrl` function with fixed regex
- `src/__tests__/url-utils.test.js` — 4 unit tests for URL validation

**Files changed:**
- `src/manifest.json` — fixed "Internet Achieve" → "Internet Archive"; added `"type": "module"` to background
- `src/background.js` — added ES module import of `isUrl`; added `.trim()` on selection text; removed local `isUrl` function; replaced `var` with `const`/`let`

**Functions created/changed:**
- `isUrl()` — moved to `src/url-utils.js`, regex `&amp;` fixed to `&`, exported as ES module
- Context menu click handler — now trims selection text before validation and URL construction

**Tests created:**
- `isUrl > should match basic valid URLs`
- `isUrl > should reject non-URL strings`
- `isUrl > should match URLs with ampersand in query strings`
- `isUrl > should handle trimmed input (pre-trimmed by caller)`

**Review Status:** APPROVED (after minor revision: `var` → `const`/`let`)

**Git Commit Message:**
```
fix: critical bugs in URL validation and manifest

- Fix "Internet Achieve" typo to "Internet Archive" in manifest
- Fix HTML entity &amp; in isUrl regex to literal &
- Add .trim() to selection text before URL validation
- Extract isUrl into url-utils.js module for testability
- Add Vitest testing with 4 unit tests for URL validation
- Add ES module support to manifest background service worker
```
