# Progress valve closed icon v1

생성일: 2026-09-10
도구: OpenAI built-in `image_gen`
용도: Stage 1 밸브 완료 Progress slot 전용 합성 PNG
참고 이미지: `webgame-prototype/assets/masters/stage-1/props/prop-valve-handle-alpha-v2.png`

## 생성 프롬프트

```text
Use case: stylized-concept
Asset type: small game UI progress icon, transparent PNG
Input image: Image 1 is the style and exact yellow handle reference
Primary request: create one cohesive front-facing household gas valve assembly icon containing a short vertical gray metal gas pipe, a round central valve joint, and the same yellow lever handle in the completed closed pose pointing horizontally to the LEFT
Style/medium: polished warm 2D cartoon game illustration matching Image 1; softly painted materials, dark brown-gray outline, rounded friendly shapes, subtle highlights and shadows
Composition/framing: centered square composition; entire pipe, joint, and handle fully visible; strong readable silhouette at 42–52 CSS pixels; generous transparent padding; symmetrical vertical pipe with the joint at center
Color palette: neutral silver-gray pipe and joint, yellow-orange handle matching Image 1
Constraints: genuinely transparent background with clean alpha edges; one single isolated object; no badge, no circle backdrop, no wall, no text, no symbols, no watermark; keep the handle unambiguously attached to the round joint; handle points left; no flame and no gas leak depiction
Avoid: photorealism, flat CSS gradients, vector-like geometric primitives, extra valves, detached parts, perspective angle, checkerboard background
```

첫 결과에는 체크무늬가 실제 픽셀로 포함되어 폐기했다. 다음 프롬프트로 배경만 제거했다.

```text
Use case: background-extraction
Asset type: small game UI progress icon, transparent PNG
Input image: Image 1 is the exact valve assembly to preserve
Primary request: remove only the gray-and-white checkerboard background and replace it with genuine transparent alpha
Constraints: preserve the valve assembly exactly—same shape, proportions, left-pointing yellow handle, pipe, joint, colors, painterly cartoon texture, outlines, highlights, shadows, scale, and centered placement; clean antialiased transparent edges; no halo; no text; no watermark; no new objects
Avoid: changing or redrawing the valve, adding a backdrop, retaining any checkerboard pixels
```

## 후처리

- Pillow Lanczos 방식으로 1254×1254 원본을 512×512로 축소했다.
- PNG 알파 채널 범위가 0–255인지 확인했다.
- 안전 상태: 왼쪽을 향한 가로 손잡이. `GS-OUTING-01` 최종 방향 승인은 아직 필요하다.
