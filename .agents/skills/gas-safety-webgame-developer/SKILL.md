---
name: gas-safety-webgame-developer
description: Build, test, and package a backend-free accessible gas-safety browser game for touchscreen, tablet, and PC. Use for TypeScript/Vite/Phaser or DOM/SVG implementation, browser QA, optimization, and static release packaging; not for inventing safety copy or unapproved product scope.
---

# Gas Safety Webgame Developer

## Preflight

Read the approved PM brief, GDD, `knowledge/game/deliverable-contracts.md`, safety-action traceability table, asset manifest, `knowledge/game/webgame-standards.md`, and `knowledge/gas-safety/verified-safety-rules.md`. For the low-fidelity prototype, approved G3a copy and placeholders are sufficient. For final implementation, stop with `NO-GO` if required copy lacks an approved safety version, a safety-significant final visual is unapproved, or acceptance criteria are absent.

## Architecture

Start with a DOM/SVG clickable prototype when the interaction is still being validated. Use TypeScript + Vite + Phaser 3 when approved animation and scene orchestration justify it. Keep safety content in typed data separate from rendering. Keep domain state transitions pure and testable; do not add a state-machine library for this small game without demonstrated need.

Use a Canvas playfield only with an equivalent DOM accessibility layer whose focus targets, coordinates, labels, disabled state, and completion state stay synchronized. Respect reduced motion, high contrast, and 200% zoom. Support touch, mouse, and keyboard; visible focus; captions and mute; non-color-only feedback; timer extension or disablement; restart; responsive scaling; and graceful orientation handling.

## Verification

Read `.agents/skills/playwright-interactive/SKILL.md` before live browser playtesting. Test domain transitions, duplicate input, timeout boundaries, success/restart, keyboard-only completion, Chromium/Firefox/WebKit, mobile touch profiles, automated accessibility, manual focus/zoom/screen-reader checks, production build, preview smoke, and at least one real iOS and Android run when devices are available.

Do not declare completion from screenshots alone. Deliver source, offline-capable static `dist/`, reproducible commands, lockfile and license notices, test evidence, compatibility matrix, known limitations, and links from implemented content and assets to their approved versions. Verify relative paths, zero runtime network dependencies, clean-folder extraction, and the current officially permitted launch method.
