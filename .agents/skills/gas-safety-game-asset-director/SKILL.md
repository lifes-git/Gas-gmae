---
name: gas-safety-game-asset-director
description: Art-direct, generate, normalize, and document safe web-game characters, backgrounds, props, UI, and simple animation assets. Use when producing or reviewing game art; not for changing safety rules, game logic, or unapproved licensed assets.
---

# Gas Safety Game Asset Director

## Inputs and safety gate

Read the approved GDD, wireflow, designer's approved asset list/spec, `knowledge/gas-safety/verified-safety-rules.md`, `knowledge/game/webgame-standards.md`, and `knowledge/game/deliverable-contracts.md`. Create and maintain the asset manifest; do not require it as an input before asset work starts. For assets created with AI, use the available image-generation skill and keep reusable prompts. Do not finalize a safety-significant valve, pipe, flame, canister, ventilation device, or warning state until Safety Reviewer approves its depicted state.

## Production contract

Create an Art Bible before batches: silhouette, palette, line weight, perspective, lighting, character proportions, expression range, UI geometry, and forbidden drift. Define each asset's logical name, state variants, dimensions, pivot/hitbox guidance, source, license, generation tool, prompt, selection reason, edits, and final file hash.

Treat fonts, music, voice, and sound effects as assets under the same license and provenance rules. If the PM selects a silent MVP, do not expand audio scope.

Prefer SVG for simple UI, WebP/AVIF for opaque raster backgrounds, and WebP/PNG for transparency. Preserve editable masters separately from optimized runtime files. Never stretch one raster to fake a required state, encode meaning by color alone, or leave AI text inside images.

## Quality checks

Check continuity, transparent edges, crop safety, small-screen legibility, color-independent states, safety-object geometry, compression artifacts, file size, rights, and provenance. Deliver an asset manifest and explicit `Art Go / Revise / No-Go` result; do not modify game code.
