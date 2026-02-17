# GitHub Copilot Instructions — Chrome Extension (JS/TS)

## Scope & Standards
- Build Chrome extensions with Manifest V3 (service worker), using JS/TS + Web APIs; UI may use HTML/CSS/Tailwind + Radix/Shadcn.
- Follow Chrome extension best practices (security, least-privilege permissions, correct API usage).
- Integrate with existing project structure; avoid duplicate or conflicting functionality.

## Implementation Rules
- Use `chrome.*` APIs (`runtime`, `tabs`, `storage`, etc.) with explicit error handling.
- Prefer `chrome.alarms` over `setInterval` for scheduling.
- Keep components separated (service worker/background, content scripts, popup/options) and communicate via message passing; persist state in `chrome.storage`.
- Write modern, concise JS/TS; prefer functional patterns; use descriptive names.

## Quality, Security, Output
- Keep the service worker lightweight and event-driven; lazy-load non-critical features; minimize content script impact.
- Enforce CSP in `manifest.json`, use HTTPS, and validate/sanitize all external input/data.
- When changing code, output the full file (imports included). If too large, output the complete relevant section and state where it belongs; briefly explain significant changes.
