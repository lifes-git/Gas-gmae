# 공개 스킬 검토 보고서

조사일: 2026-08-22

## 결론

현재 프로젝트에 그대로 설치할 만큼 공식적이고 완전히 일치하는 영상기획·Google Flow·CapCut 스킬은 확인되지 않았다. 공개 MIT 스킬의 전문 절차만 프로젝트용으로 개작하고, 변동 가능한 제품 정보는 Google과 CapCut 공식 문서로 다시 검증하는 방식을 채택했다.

## 채택 후보

| 후보 | 판정 | 활용 |
|---|---|---|
| https://github.com/agbelemi/google-flow-scripting-skill | Adapt | 인물·환경·소품·상태 인벤토리와 Flow 연속성·감사 로그 |
| https://github.com/social-media-skills/skills | Adapt | 2열 AV 대본, 장면 카드, 런타임, 샷리스트, Veo 프롬프트 craft, CapCut 편집 단계 |
| https://github.com/AkariLabs/akari-video | Reference only | 연구→콘티→편집→QC의 단계 계약 |
| https://github.com/ygtec/cut.skill | Reference only | 백업·dry-run 개념만 참고 |
| https://github.com/ffroliva/gflow-cli | Reject for execution | 계정 세션과 UI 자동화 위험 |

## 공식 기반

- 현행 OpenAI 플러그인 예제: https://github.com/openai/plugins
- 공식 빌드 가이드: https://developers.openai.com/plugins/build/plugins

과거 `openai/skills` 저장소는 deprecated 상태이므로 현행 구조 기준으로 사용하지 않는다.

## 공급망 원칙

- 원저장소와 라이선스를 확인한다.
- 포크나 비공식 인스톨러를 기본 신뢰하지 않는다.
- 계정 세션, 브라우저 자동화, 내부 draft 파일 조작 코드는 실행하지 않는다.
- 외부 스킬의 제품 가격·기능·약관 주장은 공식 문서로 재검증한다.
- 실제 차용 범위와 제외 이유를 `knowledge/sources/external-skill-adoption.md`에 기록한다.

