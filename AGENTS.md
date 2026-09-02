# Gas Safety AI Game & Video Project

이 저장소의 목표는 2026 대한민국 가스안전 AI 게임·영상 공모전 일반부에서 대상 경쟁력을 갖춘 게임 또는 홍보영상을 제작하는 것이다.

## 운영 원칙

- 확인 가능한 사실, 분석적 추론, 창작 가설을 명시적으로 구분한다.
- 공모요강과 가스안전 정보는 `knowledge/`의 단일 원본을 참조한다. 에이전트나 스킬 파일에 복제하지 않는다.
- 기획은 심사기준뿐 아니라 1인 제작, 퇴근 후 작업, Google AI Pro의 Flow 크레딧 제약을 함께 만족해야 한다.
- 영상 생성은 Google Flow의 Gemini Omni Flash와 Veo를 기본으로 하고, 최종 편집은 CapCut 무료 기능을 기본으로 한다.
- 안전 행동을 장면으로 표현하기 전 `knowledge/gas-safety/verified-safety-rules.md`에서 검증 상태를 확인한다.
- 유료 소재·기능, 라이선스가 불명확한 음악·폰트·음성은 승인 없이 사용하지 않는다.
- 사용한 AI 도구, 프롬프트, 생성·선택·수정·편집 내역을 기록한다.
- 게임은 백엔드 없는 정적 웹 배포를 기본으로 하며 로그인, 개인정보 수집, 온라인 랭킹은 별도 승인 없이는 추가하지 않는다.
- 게임의 안전 문구뿐 아니라 조작, 순서, 애니메이션, 정오답 피드백도 안전 검수 대상으로 삼는다.

## 역할 라우팅

- 전체 지휘와 단계 승인: `.agents/roles/contest-director.md`
- 수상작 조사: `.agents/roles/award-researcher.md`
- 가스안전 검증: `.agents/roles/safety-reviewer.md`
- 기획·대본·콘티: `.agents/roles/creative-planner.md`
- Google Flow 생성: `.agents/roles/flow-director.md`
- CapCut 편집: `.agents/roles/capcut-editor.md`
- 심사·권리·제출 검수: `.agents/roles/compliance-judge.md`
- 게임 범위·일정·승인 관리: `.agents/roles/game-product-manager.md`
- 게임 규칙·UX·학습 설계: `.agents/roles/safety-game-designer.md`
- 정적 웹게임 구현·테스트: `.agents/roles/web-game-developer.md`
- 게임 아트·에셋 제작: `.agents/roles/game-asset-art-specialist.md`

총괄 작업은 먼저 `contest-director` 역할을 읽고, 필요한 전문 역할과 스킬만 추가로 읽는다.
