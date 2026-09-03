# 주방 화풍 일치 재생성

- 날짜: 2026-09-03
- 도구: built-in image_gen
- 기준: 기존 bg-stove-counter-basket-v3.png를 화풍·색감·구도 참조로 제공. 거절된 시안은 입력하지 않음.
- 결과: production/game/concepts/kitchen-style-matched-controls-v2.png
- 상태: 검토 시안, 런타임 미적용. 안전 상태 최종 승인 아님.
- 육안 확인: 원래의 얇은 후드, 서랍 손잡이, 부드러운 명암과 배치를 유지하는 방향. 레인지 앞쪽 손잡이 네 개 추가, 불꽃 없음. 이전 시안의 두꺼운 전면 패널은 제거됨. 세부 버너 형태에는 변화가 있어 사용자 확인 필요.

## 생성 프롬프트

Generate a fresh high-quality kitchen game background using the attached image ONLY as the authoritative STYLE, COLOR and COMPOSITION REFERENCE. Reconstruct a new clean illustration, not a cumulative paint-over. The result must look like the exact same game's art by the same artist. Highest priority: retain reference's softly modeled dimensional shading, fine restrained outlines, muted creamy beige cupboards, subtle peach-beige tiles, warm natural oak counter and floor, softly shaded navy cabinetry. NO flat vector appearance, NO heavy black contour, NO increased orange saturation, NO harsh black contrast, NO redesigned furniture. Match reference framing and geometry closely: 16:9 frontal view with a little countertop top surface visible; cream upper cupboards with small round dark knobs, SLIM under-cabinet black hood (not chimney shaped) at right, empty wicker basket at x28% on left countertop, thin flush black four-burner cooktop spanning x55%-88% near y52%-59%, right fixed metal pipe at x90% with handleless round valve hub at y35%, identical closed lower navy drawers with horizontal bronze pulls. Intentional addition ONLY: FOUR distinct small stove control knobs, neatly spaced on cooktop's front top control strip. Warm brushed-silver slim ring bases and charcoal raised grip ridges with tiny ivory index marks in neutral OFF position, enough contrast to distinguish knobs without looking like UI or an oversized front oven panel. Preserve slim inset cooktop silhouette, do NOT create bulky stove front or oven. All burners OFF, absolutely no flames or glow. No text, no UI, no towel, no yellow valve lever, no can, no characters. Fresh crisp details without oversharpening, blur or mottled AI textures. Wide 1672x941 layout.
