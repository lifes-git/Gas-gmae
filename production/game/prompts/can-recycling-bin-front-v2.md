# 정면형 캔 수거함 에셋 생성 기록 v2

- 생성일: 2026-09-05
- 도구: OpenAI 내장 `image_gen`
- 용도: 야외 부탄캔 분리배출 클릭 목적지
- 참고 이미지 1: `webgame-prototype/assets/masters/bg-outdoor-open-walkway-v2.png` — 스타일·조명·팔레트
- 참고 이미지 2: `webgame-prototype/assets/masters/prop-can-recycling-bin-v1.png` — 파랑·노랑 배색과 캔 픽토그램

## 최종 프롬프트

```text
Use case: stylized-concept
Asset type: revised transparent web-game prop for the outdoor butane-can disposal scene
Primary request: Redesign the can recycling bin as a clean, straight-on front-facing object. The bin itself must be fully opaque and solid, never translucent.
Input images: Image 1 is the exact outdoor scene style, daylight, palette, and line-weight reference. Image 2 is the previous bin concept; retain only its blue-and-yellow palette, rounded friendly shape, top opening, and simple can pictogram, but correct the camera angle to a symmetrical front view.
Subject: one freestanding public-space collection bin for empty metal cans, rectangular body, rounded top, centered circular opening, centered can pictogram, no written words or numbers.
Style/medium: polished bright 2D cartoon game illustration matching Image 1; warm hand-painted outlines and soft cel shading, less glossy and less 3D than Image 2.
Composition/framing: perfectly centered, straight front elevation with both side edges equally visible or not visible; full base and top shown; compact silhouette suitable for a small distant prop whose bottom-center anchors at x 32%, y 48% of the supplied scene.
Lighting/mood: soft daylight from upper left, cheerful and clean.
Color palette: opaque teal-blue body, warm yellow top accent, dark navy outline, harmonious with Image 1.
Constraints: genuinely transparent canvas outside the object, but every surface of the bin body is 100% opaque; crisp clean alpha edges; no floor, no backdrop, no cast-shadow rectangle, no scenery, no people, no loose trash, no gas canister inside, no brand, no official logo, no text, no watermark.
```

## 후처리

- 1024×1536 PNG master를 보존했다.
- 알파 채널을 유지해 512×768 runtime PNG로 축소했다.
- 화면에서는 하단 중앙을 `x 32%, y 48%`에 고정한다.
