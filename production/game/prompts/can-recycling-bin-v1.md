# 캔 수거함 에셋 생성 기록 v1

- 생성일: 2026-09-05
- 도구: OpenAI 내장 `image_gen`
- 용도: 야외 부탄캔 잔여가스 제거 후 분리배출 상호작용용 투명 PNG
- 참고 이미지: `webgame-prototype/assets/masters/bg-outdoor-open-walkway-v2.png` (스타일·원근·조명 참고만 사용)

## 최종 프롬프트

```text
Use case: stylized-concept
Asset type: transparent web-game prop for the outdoor butane-can disposal scene
Primary request: Create one freestanding recycling collection bin specifically recognizable for empty metal cans, as a separate isolated prop.
Input images: Image 1 is a style, perspective, lighting, and palette reference only; do not reproduce its full scene.
Subject: a friendly public-space can recycling bin with a sturdy rectangular body, rounded top opening, and one simple pictogram of an aluminum can; no written words or numbers.
Style/medium: polished bright 2D cartoon game illustration matching Image 1's warm hand-painted outlines, soft shading, and family-friendly proportions.
Composition/framing: full object visible from base to top, subtle three-quarter front view suitable for placement on the courtyard ground around x 42.3%, y 46.4%; centered with generous transparent padding; coherent ground-contact perspective but no floor or cast-shadow background.
Lighting/mood: daylight from upper left, cheerful and clean.
Color palette: teal-blue body with warm yellow accent and dark navy outlines, harmonious with the supplied outdoor scene.
Constraints: genuinely transparent background with clean alpha edges; one object only; no scenery; no people; no loose trash; no gas canister shown inside; no brand or official logo; no text; no watermark. Keep the opening visually safe and non-industrial.
```

## 후처리

- 생성 원본을 1024×1536 PNG master로 보존했다.
- 알파 채널을 유지한 채 512×768 runtime PNG로 축소했다.
- 배경 이미지에 합성하지 않고 HTML/CSS로 위치와 크기를 조절한다.
