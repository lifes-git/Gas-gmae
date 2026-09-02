# 시작 화면 v2 — 인터뷰 승인

2026-09-02. 닫힌 현관 중심으로 거실·주방 일부와 생활 소품을 배치한다. 왼쪽 소멍이는 여행가방을 챙기다가 집 안을 돌아본다. 오른쪽 기존 제목·버튼 유지. 배경과 캐릭터+가방 투명 PNG를 분리한다. 기존 에셋 보존, 탐색 화면 변경 없음.

스타일 잠금: 크림·오크·네이비·하늘색, 둥근 갈색 외곽선, 선명한 2D 셀 셰이딩, 좌상단 낮빛. 캐릭터 기존 외형 유지. 배경 전체를 빈 벽으로 만들지 않는다. UI·문구·안전 조작은 생성 이미지에 포함하지 않는다. 캐릭터 활용 권리는 프로토타입 한정, 최종 제출 전 확인.

도구: 내장 image_gen. 사용자 시각 검수 대기.

## 출력·검수 기록

- 배경: `webgame-prototype/assets/masters/bg-title-entry-v2.png`, 1672×941. 실제 출력 해상도 유지, 인위적 확대 없음.
- 캐릭터: `webgame-prototype/assets/masters/mascot-somyeongi-title-v2.png`, 1206×1305. 첫 출력 체크무늬 포함 RGB는 제외. 추가 배경 제거 출력 hasAlpha=yes 확인.
- 배경 제거 프롬프트: Remove all checkerboard from this character and suitcase image and output a genuinely transparent PNG with alpha channel. Preserve the entire puppy and suitcase exactly: face, pose, colors, outlines and geometry. Include transparency in gaps between legs, between suitcase handle rails, and between suitcase and body. No white background, no checkerboard picture, no floor, no shadow. This is a clean cutout sprite.
- 원본을 runtime으로 복사. 시작 화면의 두 에셋 경로만 교체. 제목·버튼·탐색 화면·결과 화면·JS는 그대로 유지.
- 출력 육안 확인: 닫힌 문, 생활 소품, 거실·주방 일부, 여행가방 및 오른쪽을 향한 얼굴 확인. 몸통 방향은 요청보다 정면에 가까워 사용자 검수 대상.
- Art 판정: Revise / 사용자 검수 대기. 브라우저·실기기 검수는 요청에 따라 사용자 담당. 최종 최적화 및 캐릭터 권리 검수 별도. 이전 버전 보존.

## 배경 프롬프트

Use case: illustration-story. Create a fresh 16:9 crisp 2D cartoon background for a home gas-safety game TITLE SCREEN, no UI. Interior of a lived-in Korean family home, centered on a CLOSED navy entrance door in left third. Cream walls, light oak floor, soft clear daytime light from a left window. Around the entrance a low shoe cabinet, neatly placed slippers, small potted plant and wall hooks. A partial cozy sofa and blue curtain at far left, at far right a modest glimpse of kitchen cabinets and counter, no visible stove or safety equipment. Rich but organized room composition, NOT an empty cream wall: architectural depth, furniture and domestic details should occupy the frame naturally. Reserve the central right region for separately overlaid title and buttons by keeping contrast modest there, with subtle wall decoration above and low furniture below, rather than leaving the whole right half empty. Lower left foreground is clear floor for a separately composited puppy and suitcase. No puppy, people, luggage, letters, numbers, signage, logos, rings, UI, sparkles. Rounded dark brown outlines, clean soft cel shading, warm cream and oak plus sky blue and navy, sharp edges, no blur, no photorealism, no watercolor, no aged sepia. Gentle near-frontal perspective with coherent floor plane. Desired resolution 2048x1152.

## 캐릭터 프롬프트

Use case: identity-preserve. Reference image defines the exact identity of Somyeongi yellow floppy-eared puppy. Generate a NEW full-body pose for a game title screen: puppy preparing to leave home, body angled slightly toward viewer-left where the closed front door would be, head turned back toward viewer-right looking into the home before departure. Friendly attentive smile, NOT waving. One paw holds the extended handle of a small navy rolling travel suitcase standing beside puppy at viewer-left; other paw relaxed. Puppy and suitcase form a single coherent standalone transparent sprite with feet and suitcase wheels sharing the same ground line. Preserve reference face, large floppy ears, short limbs, two-heads-tall proportions, yellow cream fur, pink cheeks, oval eyes, brown rounded outlines, plain white triangular neckerchief. Crisp 2D cel shaded warm daytime game illustration, gentle upper-left lighting. Full body and entire suitcase visible with margin, no cropping. GENUINE transparent PNG alpha background; no drawn checkerboard, no white rectangle, no scenery, no floor, no sticker border, no logos or text. No other props. Do not redesign character.
