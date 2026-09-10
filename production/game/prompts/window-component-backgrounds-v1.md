# Window component backgrounds v1

Date: 2026-09-10

Tool: OpenAI built-in `image_gen`

Use case: `precise-object-edit`

## Goal

Prepare clean room backgrounds for a layered window component. The window states will be supplied later as one shared transparent state sheet so closed/open frames cannot drift in size or hardware placement.

## Stage 1 daytime background

Source: `webgame-prototype/assets/masters/stage-1/backgrounds/bg-living-entry-no-towel-v2.png`

Final prompt: Remove the entire far-left living-room window assembly—including curtains, ties, rod, glass, outdoor view, sash, sill, trim, handles, and frame—and reconstruct the region as continuous warm cream interior wall. Preserve the exact 1672×941 canvas, sofa silhouette, all other room objects, daytime lighting, style, colors, line weight, perspective, and sharpness. Leave no patch edge, opening, recess, outline, shadow, hardware, scenery, text, logo, watermark, crop, blur, or restyling.

## Stage 2 sunset background

Source: `webgame-prototype/assets/stage-2/backgrounds/bg-stage2-living-sunset-v1.jpg`

Final prompt: Remove the entire far-left living-room window assembly—including curtains, ties, rod, glass, outdoor view, sash, sill, trim, handles, and frame—and reconstruct the region as continuous warm cream interior wall. Preserve the exact 1672×941 canvas, sofa silhouette, all other room objects, sunset illumination and floor reflections, style, colors, line weight, perspective, and sharpness. Leave no patch edge, opening, recess, outline, shadow, hardware, scenery, text, logo, watermark, crop, blur, or restyling.

## Human edits

- Saved both generated PNGs as versioned masters.
- Converted the Stage 2 master to a JPEG runtime candidate with `sips` quality 88.
- Did not connect either background to runtime before visual approval and the shared window component are complete.

## Shared curtainless window component v4

References:

- `webgame-prototype/assets/masters/stage-1/backgrounds/bg-living-entry-windowless-v1.png` — authoritative room perspective, palette, line weight, and soft painted style
- `webgame-prototype/assets/stage-2/backgrounds/bg-stage2-living-window-open-v1.jpg` — outward-opening action reference only

Final prompt: Create one horizontal two-cell sprite sheet containing closed and outward-open states of the same tall, narrow, curtainless wooden double-casement window. Match the reference room's warm hand-painted game illustration, muted honey-beige wood, soft shading, and medium-brown outlines. Use an intermediate wall-aligned perspective: the left vertical edge is about 3% taller than the right edge, the top trim and sill recede toward a far-right vanishing point with roughly 4% vertical change across the frame, and the right side has only 5–7% apparent depth reduction. The result should read as a subtle six-degree three-quarter view—neither strongly side-facing nor perfectly frontal. Lock the fixed outer frame, sill, trim, hinges, and handle family between states; only rotate the two leaves outward in the open state. Use a uniform RGB(255,0,255) chroma-magenta background through every empty and glazing pixel. Include no curtains, rod, wall, room, scenery, glass fill, text, UI, logo, or watermark.

Human processing:

- Built-in image generation returned an opaque chroma-key master because direct alpha generation twice produced baked checkerboard pixels.
- Converted chroma-magenta pixels to RGBA alpha with deterministic `sharp` pixel processing; window artwork was not regenerated during this step.
- Split the equal sheet cells and trimmed transparent padding into closed/open runtime PNGs.
- Verified both runtime files report `hasAlpha: yes` and tested them over the daytime and sunset windowless backgrounds.
- Rejected and deleted v2 because its front-facing, product-like presentation did not follow the wall perspective closely enough.
- Rejected and deleted v3 because its 8–12 degree angle read too strongly side-facing. A subsequent nearly frontal draft was not saved to the project. V4 uses measured intermediate convergence.
- V4 was integrated as a shared Stage 1/Stage 2 layer at a 290px reference-canvas height and positioned at `(38, 38)` on the 1672×941 scene. Both stages use `perspective(900px) rotateY(-7deg)` so the window remains upright while turning slightly left in 3D space; no Z-axis tilt is used. The exterior-view layer remains a separate follow-up asset.
