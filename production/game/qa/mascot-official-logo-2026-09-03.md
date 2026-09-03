# 소멍이 스카프 공식 심볼 적용

- 공식 출처: https://www.kgs.or.kr/kgs/adcc/view.do
- 원본 벡터: https://www.kgs.or.kr/asset/img/comm/logo.svg
- 원본 보존: webgame-prototype/assets/masters/kgs-official-signature.svg
- 방식: 원본 SVG의 심볼 경로 6개 및 그라데이션 정의 유지, 국문 워드마크 제외. 스카프 크기에 맞춰 균등 축소·위치·회전만 적용.
- 캐릭터: 기존 PNG 6종을 그대로 base64 임베드한 독립 SVG. 캐릭터 PNG 바이트, 크기, 투명도 변경 없음. 신규 AI 생성 없음.
- 재현: node production/game/tools/build-mascot-logo-sprites.mjs
- 런타임 연결: index.html, game.js, kitchen-scenes.js의 안내·질문·주의·성공·시작·종료 이미지 경로.
- 검증: SVG 6개 렌더링을 한 장으로 확인. 로고가 흰 스카프 안에 위치. JavaScript 문법 검사 및 diff 검사. 실제 모바일 플레이 확인은 별도.
- 사용권: 사용자 요청에 따른 개발용 적용. 공식 다운로드 제공과 별개로 공모전의 캐릭터/CI 사용·변형 허용 범위는 제출 전 최종 확인 필요.
