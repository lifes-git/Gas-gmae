# Stage 2 상호작용 사운드 설계

상태: 프로토타입 적용

창문 열림과 엔딩 만화의 발걸음·전화벨은 Pixabay의 실제 폴리 음원을 게임 길이와 음량에 맞게 가공해 재생한다. 번호 입력음, 나머지 UI 효과음과 완료 차임은 Web Audio API로 실시간 합성한다. 설정의 `음악·효과음`이 꺼지면 재생하지 않으며, 동일 효과음의 빠른 중복 입력은 개별 cooldown으로 차단한다.

| 이벤트 | 사운드 ID | 표현 | 길이/의도 |
|---|---|---|---|
| 창문 손잡이 누름 | `windowLatch` | 짧은 딸깍 | 조작 입력 확인 |
| 창문 열림 | `windowOpen` | 실제 창문의 짧은 삐걱 소리 | 자연환기 시작 |
| 비눗물 붓 선택 | `toolSelect` | 가벼운 2음 | 안전한 도구 획득 |
| 라이터 선택 | `toolWrong` | 하강하는 차단음 | 점화음 없이 위험 선택 거부 |
| 연결부 닦기 | `brushScrub` | 짧은 솔질 잡음 | 붓 애니메이션 동기화 |
| 1번 정상 | `bubbleNormal` | 작고 밝은 거품음 | 정상 피드백 |
| 2번 누출 의심 | `bubbleWarning` | 거품음 + 낮은 경고음 | 폭발·가스 분출 묘사 없이 주의 환기 |
| 안전수칙 카드 | `safetyCard` | 종이 펼침 + 알림음 | 교육 정보 전환 |
| 진행 슬롯 수집 | `collect` | 상승 3음 | 완료 아이템 기록 |
| 실외 도착 | `storyStep` | 실제 한 걸음 원본을 0.36초 간격으로 배치한 세 걸음 | 첫 번째 만화 컷의 걷는 동작과 동기화 |
| 번호 입력 | `phoneDial` | 짧은 3음 전화 키패드 톤 | 실제 3×4 번호 패드 클로즈업과 동기화 |
| 전문가 전화 연결 | `phoneRing` | 실제 전화벨의 첫 2.8초 | 실외 전화 카툰 컷 등장과 동기화 |
| Stage 2 완료 | `stageComplete` | 짧은 4음 징글 | 두 미션 완료 |

구현 파일:

- `webgame-prototype/app/common/audio/sound-data.js`
- `webgame-prototype/app/common/audio/audio-manager.js`
