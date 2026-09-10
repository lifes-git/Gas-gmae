# Window exterior views v1

Date: 2026-09-10

Tool: OpenAI built-in `image_gen`

Use case: `stylized-concept`, followed by `lighting-weather`

## Day view

Reference: `webgame-prototype/assets/masters/stage-1/backgrounds/bg-living-entry-no-towel-v2.png`

Final prompt: Generate only the outdoor scenery visible through the living-room window: a calm Korean apartment neighborhood, pale blue sky, soft white clouds, leafy green trees, distant residential buildings and low mountains. Match the reference's polished soft hand-painted children's web-game illustration, restrained outlines and gentle cel shading. Compose for a tall narrow window crop. No window, frame, glass, curtains, interior, people, animals, text, UI, logo or watermark.

## Sunset view

References: the Stage 2 sunset room and the generated day view.

Final prompt: Recreate the identical outdoor composition at warm sunset after several days. Preserve the buildings, mountains, trees, clouds and framing; change only the time-of-day lighting and sky color. Use an amber-orange horizon, peach and muted-blue upper sky, and soft golden rim light. No window, frame, glass, curtains, interior, people, animals, seasonal leaves, fire, smoke, text, UI, logo or watermark.

## Processing and integration

- Preserved the generated PNG masters under `webgame-prototype/assets/masters/common/backgrounds/`.
- Created 512×768 JPEG runtime assets at quality 86 with `sharp`.
- Layer order is windowless exterior view, then transparent window frame.
- Stage 1 uses the day view; Stage 2 uses the sunset view.
- The shared window stack moved from reference-canvas y=38 to y=50, retaining a 290px height and `perspective(900px) rotateY(-7deg)`.
