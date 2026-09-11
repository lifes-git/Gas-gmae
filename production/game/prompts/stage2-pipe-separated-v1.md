# Stage 2 배관 분리 에셋 v1

## 기준 원본

- `webgame-prototype/assets/stage-2/backgrounds/bg-stage2-kitchen-sunset-v1.jpg`
- 원본을 반복 편집하지 않고 배경과 소품을 각각 원본에서 한 번씩 생성했다.

## 배관 제거 배경

Use case: precise-object-edit. Remove only the complete vertical gas pipe assembly on the far-right tiled wall and reconstruct the beige tile wall. Preserve the exact 1672×941 composition, camera, cabinets, hood, tile grid, sunset lighting, countertop, basket, fully-off stove, knobs, lower cabinetry, palette, linework and sharpness. No seam, blur, text, character, UI, glow or watermark.

## 배관 분리 소품

Use case: background-extraction. Isolate only the complete far-right vertical household gas pipe: slim dark-silver pipe, couplings, wall brackets and central round valve body. Match the source's restrained proportions, sunset highlights, dark-brown outline and 2D cel shading. Render on uniform chroma green `#00FF00`; no yellow handle, wall, tiles, furniture, glow, text, UI, flame, gas cloud, soap or bubbles.

## 후처리와 선택 기록

- 투명을 직접 요청한 첫 결과는 체크무늬가 실제 픽셀로 포함되어 폐기했다.
- 단색 분리본은 `production/game/scripts/chroma-key-to-alpha.cjs`로 알파 변환하고 투명 여백을 잘라냈다.
- Stage 1의 승인된 `prop-valve-handle-alpha-v2.png`를 중앙 밸브 몸통 크기에 맞춰 확대하고 왼쪽을 향한 잠김 상태로 회전해 결합했다. 손잡이 너비는 최종 290px이며, 축은 몸통 시각 중심보다 24px 아래로 보정했다. Stage 1에서 잠그고 외출한 상태가 Stage 2에도 이어지며, 조립은 `compose-stage2-pipe.cjs`로 재현한다.
- 형광 테두리는 래스터에 굽지 않고 Stage 1 창문과 동일한 흰색 `drop-shadow` CSS 규격으로 적용했다.
- 배관은 안전상태를 지시하지 않는 시각 초안이며, `GS-LEAK-02` 승인 전 상태는 `prototype-art-review`로 유지한다.
