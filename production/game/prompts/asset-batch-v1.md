# 에셋 배치 v1 생성 프롬프트 기록

도구: built-in `image_gen`  
생성일: 2026-08-31

모든 배경 프롬프트에는 다음 잠금문을 공통 적용했다.

> Image 1 is the mandatory style, palette, lighting, material, line-weight, and spatial-continuity master. Match Image 1 exactly: polished 2D Korean educational game background, restrained dark-brown outlines, soft cel shading. Background only; no character, text, logo, watermark, cursor, hotspot, or interactive safety prop.

배경별 핵심 요청:

- `bg-valve-cabinet-closeup-v1`: 같은 집의 따뜻한 오크 수납장 내부, 중앙 밸브 장착 영역을 비우고 정면 16:9 확대.
- `bg-stove-counter-closeup-v1`: 같은 주방의 꺼진 4구 가스레인지와 조리대, 오른쪽 수건·바구니 배치 영역을 비움. 불꽃·빛·냄비 금지.
- `bg-butane-floor-closeup-v1`: 같은 거실의 오크 바닥과 크림 러그 가장자리, 중앙 캔 배치 영역을 비움.
- `bg-outdoor-ventilated-v1`: 같은 세계의 열린 옥외 테라스, 넓은 하늘과 나무, 중앙 작업 영역. 열원·차량·배출함·밀폐 유리 금지.
- `bg-entry-open-v1`: 같은 네이비 현관문이 열린 상태, 밝은 보행로, 캐릭터 이동 영역을 비움.

모든 소멍이 포즈 프롬프트에는 다음 잠금문을 공통 적용했다.

> Image 1 is the mandatory character master. Preserve the exact same face shape, floppy-ear size, eye spacing, tiny eyebrows, pink cheeks, pale-beige body color, two-head-tall proportions, tail, thick rounded dark-brown outline, and plain white neckerchief. Genuine transparent background; no emblem, text, logo, watermark, or identity drift.

포즈별 핵심 요청:

- `mascot-somyeongi-question-v1`: 화면 오른쪽을 가리키고 고개를 살짝 기울인 친근한 질문 포즈.
- `mascot-somyeongi-caution-v1`: 육구가 보이는 손바닥을 내민 부드러운 정지·주의 포즈.
- `mascot-somyeongi-success-v1`: 한 손 엄지, 다른 손 작은 환호 동작의 정답 포즈.
- `mascot-somyeongi-exit-v1`: 네이비 무지 백팩을 메고 오른쪽으로 걷는 포즈. 두 번의 가짜 체크무늬 배경 결과를 폐기하고 `background-extraction`으로 실제 RGBA를 확보했다.
