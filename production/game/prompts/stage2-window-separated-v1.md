# Stage 2 separated window assets v1

## Windowless living-room background

- Tool: built-in `image_gen`
- Input: `webgame-prototype/assets/stage-2/backgrounds/bg-stage2-living-sunset-v1.jpg`
- Use case: `precise-object-edit`
- Request: remove only the complete left living-room window, curtain rod, and blue curtains; reconstruct the area as a continuous cream wall while preserving the original 1672x941 composition, furniture, linework, and sunset palette.
- Selection: user approved the clean wall reconstruction.

## Closed window in-place layer

- Tool: built-in `image_gen`, followed by alpha cleanup and in-place normalization.
- Inputs: the original closed-window background and the approved windowless background.
- Use case: `background-extraction`
- Request: retain the original scene-relative position, scale, crop, lighting, and perspective of the closed left window, including its frame, sunset view, curtain rod, and tied blue curtains. Keep the full 16:9 coordinate system and make everything outside the assembly transparent.
- Human edits: removed baked neutral checker pixels, normalized the generated assembly to the original window region, and placed it on a transparent 1672x941 canvas for direct zero-offset compositing.
- Selection: user approved the in-scene composition before alpha normalization.

## Runtime guidance

- Composite the layer at `left: 0; top: 0` over the matching windowless background.
- Do not stretch or independently recenter the layer.
- Preserve the source aspect ratio across responsive layouts.
