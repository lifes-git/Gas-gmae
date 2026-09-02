# 탐색 화면 클린 배경 — 메모 UI 스타일 연결

사용자 승인: 왼쪽 거실·가운데 현관·오른쪽 주방 유지. 밸브·수건·부탄캔 제외. 시안 승인 전 게임 미적용.

아트 잠금: 현재 탐색 배경은 구도 참조, 시작 화면 v2는 선·색·셀 셰이딩 참조. 크림/오크/네이비/하늘색, 맑은 낮, 선명한 2D. 밸브 조립체(노출 배관 포함)는 별도 에셋을 위한 깨끗한 타일로 처리. 꺼진 레인지 등 고정 가구 유지. UI·캐릭터·문구 제외.

도구: 내장 image_gen. 구도 참조 `bg-room-layered-unsafe-hd-v3.webp`, 스타일 참조 `bg-title-entry-v2.png`. 기존 파일 비파괴, 신규 마스터만 저장. 안전 소품 합성은 후속 승인 단계.

## 프롬프트

출력: `webgame-prototype/assets/masters/bg-room-clean-memo-v1.png`, 실제 1672×941, 1951274 bytes. 요청 해상도보다 작으며 확대 보정하지 않았다. 육안 확인상 왼쪽 거실/중앙 현관/오른쪽 주방 구도와 세 소품 부재 확인. 타일 및 고정 가구 세부 좌표는 기존과 달라 이후 합성 시 재정렬 필요. Art 판정: 사용자 검수 대기(Revise), 런타임 미적용. 원본 및 기존 코드 보존.

Use case: illustration-story. Generate a fresh high-resolution clean exploration-room background for a Korean gas-safety point-and-click game. Image 1 is COMPOSITION reference only; Image 2 is LINEWORK/COLOR/SHADING reference only. Retain image 1's overall arrangement and camera: left 40% living room with cream sofa, blue curtains, wide daylight window, wood coffee table/rug and TV at far left; center closed navy front door with shoe area; right 45% kitchen with cream upper cabinets, blue tile backsplash, sink, black range hood and fully OFF gas stove, light countertop peninsula and stools; wicker storage on far right. Keep major furniture positions close to image 1. Redraw cleanly in image 2's crisp polished 2D cartoon style: defined rounded brown outlines, simple soft cel shading, warm cream and light oak, navy and soft blue accents, controlled warm daylight, no photorealistic textures, no painterly blur, no sepia haze. IMPORTANT CLEAN PLATE: absolutely NO gas valve, yellow valve handle, exposed gas pipe or hose assembly on wall; that location below the hood toward right should be continuous uninterrupted blue tiles ready for a separate complete valve/pipe sprite. Absolutely NO towel or cloth on stove/counter, no butane can or gas cylinder anywhere. Keep stove OFF and unobstructed. No characters, suitcase, UI, text, logos, markers, circles, sparkles, numbers or empty prop silhouettes. Preserve natural modest lived-in decorative plants, pillows, books and closed entry door, but clean clear floor in lower center and clean counter for later compositing. All perspectives, floor contacts, lighting and shadows consistent. This is one full-bleed 16:9 room illustration, not a collage. Aim for 2048x1152 or higher native detail. No upscaled blurry look.
