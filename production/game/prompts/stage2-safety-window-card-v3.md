# Stage 2 안전수칙 창문 카드 v3

## 제작 방식

새 장면을 생성하지 않고 실제 Stage 2 화면을 브라우저에서 렌더링한 뒤 카드 비율로 캡처했다.

- 원본 배경: `assets/stage-2/backgrounds/bg-stage2-living-sunset-windowless-v1.jpg`
- 열린 창문: `assets/common/props/prop-window-casement-wall-perspective-open-v4.png`
- 창밖 풍경: `assets/common/backgrounds/bg-window-view-sunset-v1.jpg`
- 기준 화면: 1672×941
- 캡처 범위: x 0, y 58, width 735, height  313
- 출력 배율: 2× (1470×626)

## 선택 이유

Stage 2 본편과 창문 위치, `rotateY(-7deg)` 원근, 노을 색감, 현관문과 벽 장식 구도를 완전히 일치시키기 위해 생성형 재해석 대신 실제 런타임 레이어 합성을 사용했다.

## 제외 시안

정면 창문을 새로 생성한 v1과 이중 배경 축소를 사용한 v2는 폐기했다.
