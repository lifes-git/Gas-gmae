# Stage 2 배관·밸브 일체형 v2

- 생성일: 2026-09-11
- 도구: Codex 내장 image generation
- 용도: Stage 2 주방 배관, 배관 점검 확대 모달, 안전수칙 카드와 진행 슬롯 공통 에셋
- 참조 1: `webgame-prototype/assets/masters/stage-1/backgrounds/bg-stove-controls-v4.png` — Stage 1 배관 그림체와 재질
- 참조 2: `webgame-prototype/assets/masters/stage-1/props/prop-valve-handle-alpha-v2.png` — 노란 손잡이 형태·색·회전축
- 참조 3: `webgame-prototype/assets/stage-2/props/prop-stage2-gas-pipe-with-handle-v1.png` — 세로 배관 구도와 왼쪽 잠김 상태

## 최종 생성 지시

Stage 1과 동일한 어린이용 웹게임 일러스트 스타일로 배관 몸통, 원형 밸브 몸통, 노란 손잡이가 처음부터 하나의 물체처럼 그려진 세로형 에셋을 생성한다. 손잡이는 Stage 1에서 잠근 상태가 이어지도록 수평 왼쪽을 향한다. 배관과 손잡이의 외곽선, 원근, 따뜻한 금속 명암을 일치시키고 배경·문자·거품·상호작용 테두리는 넣지 않는다. 투명 추출을 위해 균일한 순녹색 크로마 배경으로 생성한다.

## 후처리

- `production/game/scripts/chroma-key-to-alpha.cjs`로 녹색 배경을 실제 알파로 변환
- 생성 원본은 master 폴더에 보존
- 런타임 결과는 384×1396 RGBA PNG

