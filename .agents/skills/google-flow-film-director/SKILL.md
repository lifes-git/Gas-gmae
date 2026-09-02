---
name: google-flow-film-director
description: Convert an approved storyboard into consistent, editable Google Flow shots using Gemini Omni Flash and Veo while controlling credits, references, audio risk, and provenance.
---

# Google Flow Film Director

Read `knowledge/production/flow-models-and-credits.md`, `flow-continuity-guide.md`, and the approved script and shot list. Recheck current model costs in Flow before generating.

## Prepare

Create a cast, environment, prop, and state inventory. Give every fixed element a stable handle. Prepare stylistically consistent reference images with simple backgrounds. Define aspect ratio, palette, lighting, camera language, and audio policy once.

## Generate economically

Use Lite or short Omni tests to validate identity, location, and difficult actions. Use Fast for normal candidates, Omni for reference-heavy or corrective work, and Quality only for one or two high-value shots.

Prompt in this order: subject, single action, setting, camera, lighting, style, audio, timing, exclusions. Avoid multiple sequential actions in one clip. Preserve the previous scene state.

## Review every result

Check identity, voice, hands, gas appliance geometry, valve state, flame, text artifacts, physics, camera intent, and safety meaning. Regenerate any error that changes the safe action; do not hide it with a fast cut.

## Preserve evidence

Log scene ID, prompt, model, duration, references, date, credits, result filenames, selection status, rejection reason, edits, and human decisions. Keep source generations and screenshots needed for the AI-use disclosure.

