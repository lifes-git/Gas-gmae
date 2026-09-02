# 스토리보드 기반 장면·에셋 맵 v1

작성일: 2026-08-31  
기준: 원본 12컷의 화면 문법 + 확정된 3개 위험요소

## 해석 원칙

원본 이미지의 문구와 행동은 제작 지시가 아니라 참고 스토리보드다. 다음 두 부분은 확정 기획에 맞춰 교체한다.

- 원본 4–5컷 창문 환기 → `꺼진 가스레인지 주변 수건 발견·이동`
- 원본 9컷 송곳 천공 → `통풍이 잘되는 실외 선택 → 캔을 거꾸로 들어 노즐 누르기`

타이머와 네 번째 진행 원은 사용하지 않는다.

## 장면별 제작 에셋

| 컷 | 게임 장면 | 배경 | 독립 소품·상태 | 캐릭터 | UI·효과 |
|---:|---|---|---|---|---|
| 1 | 집 안 전체 탐색 0/3 | `bg-room-day` | 밸브 열림, 수건 위험 위치, 부탄캔 실내, 현관문 닫힘 | 소멍이 기본 안내 | 노란 hotspot 3개, 진행 원 0/3, 손 포인터 |
| 2 | 밸브 확대 | `bg-valve-cabinet-closeup` | `valve-open` | 소멍이 질문 | 닫기, 회전 안내, 노란 점선 원 |
| 3 | 밸브 잠금 성공 | 2컷과 동일 | `valve-closed` | 소멍이 정답 | 초록 체크, 회전 화살표, 작은 반짝임 |
| 4 | 수건 위험 발견 | `bg-stove-counter-closeup` | 꺼진 레인지, `towel-near-stove` | 소멍이 주의 | 닫기, 수건 hotspot, 손 포인터 |
| 5 | 수건 이동 | 4컷과 동일 | `towel-moving`, `safe-basket-empty` | 소멍이 안내 | 이동 경로 화살표 또는 드래그 잔상 |
| 6 | 수건 안전 보관 성공 | 4컷과 동일 | `towel-in-basket`, `safe-basket-filled` | 소멍이 정답 | 초록 체크, 반짝임 |
| 7 | 다 쓴 부탄캔 발견 | `bg-butane-floor-closeup` | `butane-used-indoor` | 소멍이 질문 | 닫기, 캔 hotspot, 손 포인터 |
| 8 | 처리 장소 선택 | `bg-location-choice` 또는 HTML 카드 | 실내 아이콘, 실외 아이콘 | 소멍이 주의 | 정답/오답 선택 카드 |
| 9 | 잔여가스 제거 순서 | `bg-outdoor-ventilated` | `butane-inverted-nozzle`, `butane-complete` | 소멍이 정답 | 순서 화살표, 금지 아이콘, 초록 체크 |
| 10 | 집 안 전체 완료 3/3 | `bg-room-day` 재사용 | 밸브 잠김, 수건 보관, 부탄캔 제거, 문 활성 | 소멍이 정답 | 체크 3개, 전체 반짝임 |
| 11 | 현관문 외출 | `bg-entry-open` | 열린 문, 실외 길 | 소멍이 외출 | 문 빛, 발걸음/이동 효과 |
| 12 | 결과 | `bg-result-celebration` | 없음 | 소멍이 엄지/축하 | 색종이, 다시하기, 수칙 다시보기 |

## 중복을 제거한 최종 이미지 목록

### 배경 7종

1. `bg-room-day` — 거실·주방 통합 허브, 위험 소품 없이 제작
2. `bg-valve-cabinet-closeup` — 밸브 소품이 빠진 수납장 내부
3. `bg-stove-counter-closeup` — 불꽃 없는 꺼진 가스레인지와 조리대
4. `bg-butane-floor-closeup` — 캔이 빠진 바닥/러그 확대
5. `bg-outdoor-ventilated` — 열원 없는 통풍되는 실외
6. `bg-entry-open` — 열린 현관과 밝은 외부 길
7. `bg-result-celebration` — 밝은 크림·노랑 결과 배경

`bg-location-choice`는 별도 래스터 대신 HTML/CSS 선택 카드로 만드는 편이 선명하고 접근성이 좋다.

### 안전 소품 12개 상태

- 밸브: `valve-open`, `valve-closed`
- 레인지: `stove-off` 1종만 사용
- 수건: `towel-near-stove`, `towel-moving`, `towel-in-basket`
- 보관 바구니: `basket-empty`, `basket-filled`
- 부탄캔: `butane-used-indoor`, `butane-inverted-nozzle`, `butane-complete`
- 현관문: `door-closed`, `door-open`

밸브 방향과 부탄캔 처리 자세는 안전 의미가 있으므로 안전 검수 전 `draft` 상태다.

### 소멍이 포즈 5종

- `somyeongi-guide`: 기본 안내
- `somyeongi-question`: 위험요소를 가리키는 질문
- `somyeongi-caution`: 손바닥을 내미는 주의
- `somyeongi-success`: 체크/엄지 정답
- `somyeongi-exit`: 가방을 메고 걷는 외출

소멍이 포즈는 프로토타입 전용이며 최종 제출 전 공식 캐릭터 활용 범위를 다시 확인한다.

### 코드로 제작할 UI·효과

- 진행 원 0/3–3/3, 초록 체크, 닫기 버튼
- 노란 hotspot 펄스, 손 포인터, 방향 화살표
- 성공 반짝임과 색종이
- 선택 카드와 정오답 테두리
- 말풍선과 모든 한글 문구

이미지에 글자를 포함하지 않고 HTML로 렌더링한다.

## 영상 필요성 판정

### 필수 영상: 없음

현재 게임은 영상 파일 없이 이미지 상태 전환과 CSS/DOM 애니메이션만으로 충분하다. 영상은 초기 용량, 모바일 재생 정책, 자막·접근성, 상태 동기화 부담을 늘린다.

### 영상 대신 구현할 동작

| 동작 | 권장 방식 |
|---|---|
| 밸브 90도 회전 | 열린/잠긴 PNG 또는 WebP 교체 + 250ms CSS 회전 |
| 수건 옮기기 | 독립 투명 이미지의 CSS 이동 또는 두 상태 교체 |
| 부탄캔 뒤집기 | 캔 투명 이미지 회전 + 노즐 강조; 실제 가스 분사 영상 없음 |
| 현관문 열기 | 닫힘/열림 상태 교체 또는 CSS transform |
| 소멍이 외출 | 4–6프레임 스프라이트 또는 CSS translate; 영상 불필요 |
| 성공 색종이 | CSS particle 8–12개 |

### 추후 선택 가능한 짧은 애니메이션

완성도 향상을 위해 필요하면 소멍이 외출 장면만 1–1.5초 WebP 스프라이트로 추가할 수 있다. MP4/WebM 영상은 권장하지 않는다.

## 제작 순서

1. 배경 7종의 구도와 팔레트 고정
2. 소멍이 5포즈 일관성 시트 제작
3. 안전 소품 상태 제작 후 안전 검수
4. UI/효과를 코드로 결합
5. 모바일 390×844와 데스크톱 1440×900에서 crop·hotspot 검수
