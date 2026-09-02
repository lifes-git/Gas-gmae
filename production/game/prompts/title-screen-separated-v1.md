# 시작 화면 분리 제작 v1

2026-09-02. 사용자 승인 방향: 시작 배경과 소멍이를 분리하고 현재 코드의 좌측 캐릭터·우측 제목/버튼 스타일을 유지한다. 탐색 화면과 게임 규칙은 변경하지 않는다.

## 아트 규격

- 배경: 16:9, 크림 벽·오크 바닥·네이비 현관·맑은 낮, 선명한 2D 셀 셰이딩. 오른쪽 절반은 제목용 저밀도 영역.
- 캐릭터: 기존 소멍이 외형 고정, 투명 PNG, 전신 환영 포즈, 좌상단 확산광. 글자·로고·바닥·스티커 테두리 없음.
- 제목 및 버튼은 기존 HTML/CSS 유지. 이미지에 UI를 생성하지 않는다.
- 신규 버전으로 저장하며 기존 에셋은 보존한다. 최종 캐릭터 활용 권리는 제출 전 별도 확인한다.

## 도구 및 프롬프트

## 결과 및 검수 기록

- 배경 원본: `webgame-prototype/assets/masters/bg-title-entry-v1.png`, 1672×941, 1480271 bytes. 요청 해상도와 실제 출력은 다르며 인위적 확대는 하지 않았다.
- 캐릭터 원본: `webgame-prototype/assets/masters/mascot-somyeongi-title-v1.png`, 1240×1269, 908564 bytes, sips hasAlpha=yes.
- 캐릭터 첫 출력은 체크무늬가 포함된 RGB 이미지여서 제외했다. 내장 도구로 아래 프롬프트를 사용해 배경 제거 후 선택했다.
- 후속 프롬프트: Remove the entire checkerboard background from this puppy asset, including gaps between limbs, scarf ends and tail. Output genuinely transparent PNG with an alpha channel. Preserve the puppy exactly unchanged: identical shape, colors, expression, proportions, outlines and full body. Do not paint a white background or a checkerboard representation. Transparent pixels outside the puppy, no shadow, no border. This is a game sprite cutout, not a picture of a cutout.
- 원본 PNG를 runtime으로 복사했다. 기존 스타일 유지, 시작 화면 배경과 캐릭터 경로만 변경. 탐색 화면/결과 화면/안전 문구/게임 JS 변경 없음.
- Art 판정: Revise — 사용자 시각 검수 대기. 도구 출력 육안 확인과 파일 알파 확인만 수행. 브라우저 및 실기기 검수는 사용자 담당; 최종 웹 용량 최적화 별도.


도구: 내장 image_gen. 신규 배경 생성 및 기존 캐릭터 정체성 참조 생성. 사용자 시각 검수 전 후보 상태.

### Background

Use case: illustration-story. Asset type: separate title-screen background for a Korean family-friendly point-and-click gas-safety web game, landscape 16:9. Generate a fresh crisp high-resolution illustration, not a screenshot or UI mockup. A welcoming home entrance viewed from inside, open navy-blue wooden door toward left third revealing a sunny garden path, soft blue sky and green shrubs; warm cream walls, light oak floor, modest wooden trim. Clean rounded dark-brown outlines and soft cel shading, polished cheerful 2D casual game illustration, restrained texture, no blur, no depth-of-field, no sepia wash, no 3D. Daylight from left. Composition supports an independently overlaid large yellow puppy in left foreground and HTML title/buttons on RIGHT: keep right 50 percent a calm uncluttered cream wall with gentle warm light, no furniture or high-contrast seams through center-right. Keep floor visible along bottom and clear space on lower left for mascot overlay. All environmental perspective coherent. No characters, text, logos, signs, UI, buttons, rings, sparkle effects, gas appliances, fire or hazards. 2048x1152 preferred.

### Mascot

Use case: identity-preserve. Asset type: standalone transparent PNG title-screen mascot. Reference image is identity and illustration style reference only. Create the SAME yellow puppy Somyeongi as reference, with identical floppy ears, face, oval shining dark eyes, small eyebrows, pink cheek blush, white blank triangular neck scarf, dark-brown rounded outline, large head and short body. Full body, both feet and all ears fully visible with 6 percent padding. Cheerful welcoming pose: standing, viewer-right paw raised showing pads as in reference, other paw relaxed. Facing viewer with a slight friendly tilt. Crisp smooth 2D cel shading, clean edges, soft upper-left daylight matching a warm cream/oak home entrance, no glow, no blur, no paper grain. Actual transparent alpha background, NOT white, NOT checkerboard. No scene, floor, cast shadow, sticker border, backpack, new accessories, lettering, logo or watermark. Preserve character identity rather than redesign. Single character only, 1024x1024 preferred.
