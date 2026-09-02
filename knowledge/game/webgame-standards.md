# 가스안전 웹게임 기술·품질 기준

확인일: 2026-08-31

## 기본 기술 결정

- 1차 프로토타입은 DOM/SVG 기반 클릭 흐름으로 빠르게 검증한다.
- 애니메이션과 장면 연출이 승인되면 TypeScript + Vite + Phaser 3로 구현한다.
- 게임 규칙과 안전 상태는 렌더링에서 분리한 순수 TypeScript 상태 모델로 둔다.
- 기본 장면은 Boot, Preload, Title, Room/Stage, Result로 분리한다.
- 서버, API, 데이터베이스는 사용하지 않는다. 필요한 로컬 진행 정보만 버전이 붙은 `localStorage`에 저장할 수 있다.

## 접근성과 입력

- Canvas hotspot마다 같은 기능을 제공하는 실제 HTML 버튼 또는 접근 가능한 대체 목록을 둔다.
- Tab, Enter, Space만으로 게임 전체를 완료할 수 있어야 한다.
- 완료·오류 상태는 색상에만 의존하지 않고 아이콘과 텍스트를 함께 쓴다.
- 내부 터치 목표 크기는 최소 44×44 CSS px로 삼고 hover에 의존하지 않는다.
- 제한시간은 교육 모드에서 해제 또는 연장할 수 있어야 한다.
- 음소거, 자막, 보이는 포커스, `aria-live` 피드백을 제공한다.

## 성능과 에셋

- 기준 화면은 1280×720, 반응형 `FIT`과 중앙 정렬을 기본으로 한다.
- 초기 전송량 목표는 5MB 이하로 두고 정적 배경은 장당 약 300~500KB를 목표로 최적화한다.
- 배경은 WebP/AVIF, 투명 오브젝트는 WebP/PNG, 벡터 UI는 SVG를 우선 검토한다.
- 오디오는 첫 사용자 제스처 뒤 시작하고 초기 preload를 최소화한다.

## 테스트 게이트

1. 상태 모델: 정답·오답·중복 입력·타이머 경계·완료/재시작 단위 테스트
2. Chromium, Firefox, WebKit 및 모바일 터치 프로필 E2E 테스트
3. 키보드만으로 전체 클리어
4. axe 자동 검사와 포커스 순서·200% 확대·스크린리더 수동 검사
5. production build와 preview smoke test
6. 실제 iOS Safari와 Android Chrome에서 각 1회 확인

## 출처

- 공모요강: https://www.kgs-aicontest.com/summary
- OpenAI 브라우저 게임 워크플로: https://learn.chatgpt.com/use-cases/browser-games
- Phaser Input: https://docs.phaser.io/phaser/concepts/input
- Phaser Scenes: https://docs.phaser.io/phaser/concepts/scenes
- Phaser Scale Manager: https://docs.phaser.io/api-documentation/3.90.0/class/scale-scalemanager
- Vite 정적 배포: https://vite.dev/guide/static-deploy.html
- Playwright 에뮬레이션: https://playwright.dev/docs/emulation
- Playwright 접근성 테스트: https://playwright.dev/docs/accessibility-testing
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
