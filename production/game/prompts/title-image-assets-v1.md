# 승인 타이틀 이미지 적용 v1

사용자가 콘셉트 v4를 승인하고 비상호작용 제목의 이미지 사용을 허용함. 게임 에셋 스킬의 일관성 원칙 적용, AI 텍스트 미사용 일반 규칙보다 사용자 요청 우선. 버튼은 실제 HTML 유지. 제목 h2와 이미지 alt로 접근 가능한 이름 유지.

내장 image_gen 사용. 첫 생성은 시작 체크 배경, 결과 회색 광륜 배경이 남음. 시작 재시도도 체크 배경이 남아 기존에 승인한 결정적 마스킹 방식으로 전환. prepare_title_art_v1.py에서 닫힌 윤곽 밖을 투명 처리하며 내부 RGB 유지. 원본과 알파 버전 모두 masters에 보존.

출력: title-start-alpha-v1.png (1676×683), title-result-alpha-v1.png (2005×453).
실제 브라우저 시각 검수는 사용자 확인 대기. 생성 문구 육안 확인: 장기 외출 전 / 가스안전 점검! / 안전점검 완료!.

## 시작 프롬프트
Extract/recreate ONLY the TOP screen title lettering from this approved reference into a single isolated transparent PNG game title asset. Exact text on two lines: '장기 외출 전' (cream) and '가스안전 점검!' (golden yellow). Match approved thick rounded hand-lettered Korean forms, solid navy surrounding silhouette, thin white outer keyline, tiny gold star and lime check accent. Preserve spelling meticulously. Very short navy depth, NO duplicated white text shadows. NO puppy, no furniture, NO buttons, no bottom screen title, no subtitle. GENUINELY TRANSPARENT alpha background, not baked checkerboard. Wide tightly framed lettering with only a small transparent safety margin, whole artwork uncropped.

## 결과 프롬프트
Create ONLY the bottom screen's main title as isolated game lettering matching approved reference exactly: '안전점검 완료!' in ONE LINE. Chunky rounded hand-lettered golden yellow Hangul, solid navy silhouette hugging letters, thin white outer keyline, subtle short navy depth and tiny gold star / lime check accents. Match reference typography. No subtitle, no badges, no buttons, no scenery, no puppy. GENUINELY TRANSPARENT PNG alpha background, do NOT draw a checkerboard. Wide tightly framed lettering with small transparent safety margin, uncropped. Exact Korean spelling.
