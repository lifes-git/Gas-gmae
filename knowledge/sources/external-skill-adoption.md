# 외부 스킬 채택 기록

조사일: 2026-08-22

## Adapt

### Google Flow Scripting Skill

- 원본: https://github.com/agbelemi/google-flow-scripting-skill
- 라이선스: MIT로 표시됨
- 차용 범위: 캐릭터·환경·소품·상태 인벤토리, 연속성 프로필, first/last frame·extend·edit 계획, 감사 로그 개념
- 제외: 고정된 패널 수·영상 길이, 현재 Flow UI와 공식 문서로 검증되지 않은 모델 정보
- 이유: 직접 관련성이 높지만 신생 비공식 프로젝트이므로 통째 설치보다 절차만 개작

### Social Media Skills

- 원본: https://github.com/social-media-skills/skills
- 라이선스: MIT로 표시됨
- 차용 범위: 2열 AV 스크립트, 장면 카드, 런타임 계산, 샷리스트, continuity bible, 저비용 반복 후 최종화, 영상 오류 QC, CapCut 편집 순서
- 제외: SNS 성장 지표, WoopSocial 등 외부 서비스 의존, 변동 가능한 가격·약관 주장

## Reference only

### AKARI Video

- 원본: https://github.com/AkariLabs/akari-video
- 라이선스: MIT로 표시됨
- 참고: 연구→스토리보드→편집→QC 단계 계약 구조
- 미채택 이유: 별도 Theia/Node/ffmpeg 생태계와 자체 편집기 의존

### cut.skill

- 원본: https://github.com/ygtec/cut.skill
- 참고: 백업·dry-run·QA 개념
- 미채택 이유: 라이선스 미확인, CapCut 내부 draft 직접 조작과 MCP/HTTP 자동화가 버전·보안에 취약

### gflow-cli

- 원본: https://github.com/ffroliva/gflow-cli
- 참고: 배치·캐릭터·체인 아이디어
- 미채택 이유: Google 계정 세션과 Playwright UI 자동화, 약관·셀렉터 안정성 위험

## 공식 구조 기준

- 현행 예제: https://github.com/openai/plugins
- 빌드 가이드: https://developers.openai.com/plugins/build/plugins
- 영상·CapCut·Google Flow 전용 공식 스킬은 조사 당시 확인되지 않아 공식 구조와 검증 원칙만 적용한다.

