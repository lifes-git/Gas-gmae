# Gas Safety AI Game & Video

2026 대한민국 가스안전 AI 게임·영상 공모전 일반부 프로젝트다. 현재 백엔드 없는 가스안전 웹게임 프로토타입을 중심으로 개발하며, 지식·반복 작업 스킬·역할별 에이전트를 함께 관리한다.

## 구조

- `knowledge/`: 공모요강, 수상작, 안전수칙, 제작 도구, 권리·제출 관련 단일 지식 원본
- `.agents/skills/`: 재사용 가능한 작업 절차
- `.agents/roles/`: 전문 에이전트의 책임·입력·출력·중단 조건
- `research/`: 출처 기반 심층 리서치 산출물
- `production/`: 향후 콘셉트, 대본, 콘티, 프롬프트, 편집 및 제출 자료
- `webgame-prototype/`: 브라우저에서 바로 실행할 수 있는 정적 웹게임 프로토타입

## 다른 PC에서 이어서 작업하기

```bash
git clone https://github.com/lifes-git/Gas-gmae.git
cd Gas-gmae
python3 -m http.server 8080 --directory webgame-prototype
```

브라우저에서 `http://127.0.0.1:8080`을 연다. `index.html`을 직접 열 수도 있지만, 브라우저별 `file://` 제한을 피하기 위해 로컬 서버 실행을 권장한다. Codex는 저장소 루트의 `AGENTS.md`와 `.agents/`의 역할·스킬 지침을 읽고 기존 작업을 이어간다.

## 현재 상태

소멍이 캐릭터를 활용한 `외출 전 위험요소 3개 찾기` 프로토타입을 제작 중이다. 승인된 거실·주방 배경과 수건·밸브 분리 에셋을 기반으로 장면 이동 및 확대 상호작용을 연결한 상태다. 밸브의 최종 잠김 방향과 전체 브라우저 QA는 아직 최종 검수 전이다.
