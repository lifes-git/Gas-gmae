# 게임 산출물·승인 계약

## 고정 산출물

- `production/game/product-brief.md`: 목표, MVP, 제외 범위, 기기, 일정, 인수조건
- `production/game/gdd.md`: 핵심 루프, 상태 전이, 화면, 정오답 피드백
- `production/game/safety-traceability.csv`: 안전 주장과 게임 상태 승인 기록
- `production/game/asset-manifest.csv`: 에셋 출처·권리·AI 생성·최적화 기록
- `production/game/test-report.md`: 기능·접근성·호환성·플레이테스트 증거
- `production/game/release-checklist.md`: 실행영상과 HTML 패키지 최종 판정

폴더가 아직 없으면 해당 역할이 자신의 첫 산출물을 만들 때 생성한다. 기존 파일이 있으면 덮어쓰기 전에 현재 내용을 읽고 보존한다.

## 안전 추적표 필수 열

`rule_id, context, screen_state, player_action, visible_copy, allowed_depiction, forbidden_depiction, reviewer, status, review_date, version`

- `status`는 `draft`, `approved`, `rejected` 중 하나다.
- 개발 빌드는 승인된 `version`만 참조한다.
- 문구, 순서, 애니메이션, 정오답 피드백 중 하나라도 의미가 바뀌면 재승인한다.

## 에셋 manifest 필수 열

`asset_id, logical_role, state, source_type, source_url, license, ai_tool, prompt_log, human_edits, safety_review, runtime_path, dimensions, bytes, hash, status`

- 폰트, 음악, 음성, 효과음도 에셋으로 기록한다.
- 라이선스 증거 또는 생성·수정 이력이 없으면 `approved`가 될 수 없다.

## 프로토타입 승인 순서

1. G3a: GDD, 안전 문구, placeholder 상태 승인
2. 저충실도 DOM/SVG 프로토타입 제작
3. G3b: 실제 클릭 순서, 상태 변화, 오답·힌트·보상 안전 승인
4. 최종 아트 제작 및 안전 소품 상태 승인
5. 본 구현과 회귀 테스트

## HTML 패키지 인수조건

- 공식 2차 안내 전에는 `dist/` 정적 폴더와 압축본을 기본 제출 후보로 유지한다.
- 상대 경로와 Vite `base` 설정을 검증한다.
- 런타임 네트워크 요청이 없어야 하며 CDN, 외부 폰트, 원격 분석에 의존하지 않는다.
- 압축을 새 폴더에 해제한 뒤 승인된 실행 방식으로 처음부터 끝까지 플레이한다.
- `file://` 직접 실행 필요 여부와 로컬 서버 허용 여부는 2차 공식 안내가 오면 다시 확정한다.
- lockfile, 오픈소스 라이선스 고지, 실행 방법, 지원 브라우저를 포함한다.

## 플레이테스트 최소 지표

- 설명 없이 첫 조작 성공 여부
- 전체 완료 시간과 2~3분 범위 달성 여부
- 오조작 횟수와 막힌 화면
- 플레이 직후 기억한 안전 행동과 잘못 기억한 내용
- 터치, 마우스, 키보드 각각의 완료 가능 여부

실제 대상 연령 참여자를 확보하지 못하면 성인 대리 테스트임을 명시하고 미성년자 테스트를 했다고 주장하지 않는다. PM이 합격 기준을 사전에 정하고 수정 후 동일 과제로 재시험한다.
