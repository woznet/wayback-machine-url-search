## Plan: Fix Wayback Machine Extension Issues

Fix all issues identified in the code review: critical bugs (typo, regex, trimming), moderate improvements (encoding, modern JS, validation, error handling), minor polish (README, manifest action, .gitignore), and add a popup with tooltip and settings toggle. Uses Vitest for unit testing.

**Phases (6 phases)**

1. **Phase 1: Set Up Vitest and Fix Critical Bugs**
    - **Objective:** Initialize a test environment with Vitest, then fix the 3 critical issues — manifest typo, HTML entity in regex, and missing trim on selection text.
    - **Files/Functions to Modify/Create:**
      - `package.json` — create with Vitest dev dependency and test script
      - `vitest.config.js` — create with basic config
      - `src/url-utils.js` — extract `isUrl` into its own module for testability
      - `src/background.js` — import `isUrl` from module; add `.trim()` to `info.selectionText`; fix regex `&amp;` → `&`
      - `src/manifest.json` — fix "Achieve" → "Archive"
    - **Tests to Write:**
      - `src/__tests__/url-utils.test.js`:
        - `test-isUrl-basic-valid` — common valid URLs pass
        - `test-isUrl-basic-invalid` — non-URLs are rejected
        - `test-isUrl-ampersand` — URLs with `&` in query strings match correctly
        - `test-isUrl-trimmed-input` — URLs with leading/trailing whitespace are handled after trim
    - **Steps:**
        1. Create `package.json` with Vitest dependency and `"test": "vitest run"` script
        2. Create `vitest.config.js`
        3. Extract `isUrl` function into `src/url-utils.js` and export it
        4. Write unit tests in `src/__tests__/url-utils.test.js`
        5. Run `npm install` then `npm test` — tests should fail (regex still has `&amp;` bug)
        6. Fix the regex in `url-utils.js`, add `.trim()` in `background.js`, fix manifest typo
        7. Update `background.js` to import from `url-utils.js`
        8. Run `npm test` — tests should pass

2. **Phase 2: Modernize JS and Improve URL Handling**
    - **Objective:** Replace `var` with `const`/`let`, add `encodeURIComponent` for selection text, replace custom regex with `URL` constructor, and add error handling on `chrome.tabs.create`.
    - **Files/Functions to Modify/Create:**
      - `src/url-utils.js` — replace regex body with `URL` constructor validation
      - `src/background.js` — `var` → `const`/`let`; `encodeURIComponent` on selection text; `.catch()` on `chrome.tabs.create`
    - **Tests to Write:**
      - `src/__tests__/url-utils.test.js` (update existing):
        - `test-isUrl-url-constructor` — valid http/https URLs accepted
        - `test-isUrl-edge-cases` — ports, query strings, fragments, paths
        - `test-isUrl-non-http-protocols` — ftp, mailto, data, javascript rejected
        - `test-isUrl-invalid-formats` — random strings, partial URLs rejected
    - **Steps:**
        1. Update/add tests for the new `URL`-constructor-based `isUrl` and edge cases
        2. Run `npm test` — new tests should fail
        3. Refactor `url-utils.js` to use `URL` constructor
        4. Refactor `background.js`: `var` → `const`/`let`, add `encodeURIComponent` for selection text, add `.catch()` on `chrome.tabs.create`
        5. Run `npm test` — all tests should pass

3. **Phase 3: Add Popup with Tooltip**
    - **Objective:** Add a browser action popup that displays the extension name, a brief description, and a button to search the current page's URL on the Wayback Machine. Include a tooltip on the toolbar icon.
    - **Files/Functions to Modify/Create:**
      - `src/popup.html` — create popup UI with extension title, description, and "Search current page" button
      - `src/popup.js` — handle button click: get active tab URL, open Wayback Machine search
      - `src/popup.css` — basic styling for the popup
      - `src/manifest.json` — add `action` key with `default_popup`, `default_icon`, and `default_title` (tooltip)
    - **Tests to Write:**
      - `src/__tests__/popup.test.js`:
        - `test-buildWaybackUrl` — verify URL construction for the popup button
    - **Steps:**
        1. Write test for the popup URL-building logic
        2. Run `npm test` — test should fail
        3. Create `popup.html`, `popup.css`, and `popup.js`
        4. Extract shared URL-building logic if needed
        5. Update `manifest.json` with `action` key including `default_popup`, `default_icon`, and `default_title`
        6. Run `npm test` — tests should pass

4. **Phase 4: Add Settings/Options Page with Popup Toggle**
    - **Objective:** Create an options page where users can toggle the popup on/off. When disabled, clicking the toolbar icon does nothing (or shows a minimal indicator). Persist the setting via `chrome.storage.sync`.
    - **Files/Functions to Modify/Create:**
      - `src/options.html` — create settings UI with toggle for popup visibility
      - `src/options.js` — handle toggle state, save to `chrome.storage.sync`
      - `src/options.css` — basic styling for options page
      - `src/background.js` — listen for storage changes and dynamically set/clear the popup via `chrome.action.setPopup`
      - `src/manifest.json` — add `options_page` or `options_ui`, add `storage` permission
    - **Tests to Write:**
      - `src/__tests__/options.test.js`:
        - `test-default-setting` — popup enabled by default
        - `test-toggle-persistence` — verify toggle value is read/written correctly
    - **Steps:**
        1. Write tests for settings logic
        2. Run `npm test` — tests should fail
        3. Create `options.html`, `options.css`, and `options.js`
        4. Update `background.js` to read setting on startup and listen for changes, using `chrome.action.setPopup` to enable/disable the popup
        5. Update `manifest.json` with `options_ui` and `storage` permission
        6. Run `npm test` — tests should pass

5. **Phase 5: Fix README and Consistency**
    - **Objective:** Fix inconsistent naming in README, update documentation to reflect new popup and settings features.
    - **Files/Functions to Modify/Create:**
      - `README.md` — standardize all references to "Wayback Machine URL Search"; document popup and settings features; update installation and usage sections
    - **Tests to Write:** (none)
    - **Steps:**
        1. Update all instances of "Wayback Machine Search" to "Wayback Machine URL Search" in README
        2. Add documentation for the popup feature and settings toggle
        3. Update usage instructions to describe both context menu and popup workflows

6. **Phase 6: Add .gitignore for Build Artifacts**
    - **Objective:** Add a `.gitignore` to exclude build artifacts, dependencies, and generated files.
    - **Files/Functions to Modify/Create:**
      - `.gitignore` — create with entries for `*.crx`, `*.pem`, `*.zip`, `node_modules/`, `dist/`, `coverage/`
    - **Tests to Write:** (none)
    - **Steps:**
        1. Create `.gitignore` with appropriate patterns for Chrome extension development and Node.js/Vitest artifacts
