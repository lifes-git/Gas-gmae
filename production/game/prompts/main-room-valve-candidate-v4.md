# 메인 탐색 화면 밸브 시안 v4

- 작성일: 2026-09-02
- 생성 도구: OpenAI built-in ImageGen
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결
- 편집 기준: `webgame-prototype/assets/masters/bg-room-clean-candidate-v4-2048x1152.png`
- 출력 후보: `webgame-prototype/assets/masters/bg-room-valve-candidate-v4-source.png`

## 사용자 확정 조건

- 위치: 주방 후드 바로 아래 파란 타일 벽
- 형태: 회색 세로 배관과 노란 레버형 손잡이
- 조작: 손잡이의 회전축과 90도 회전 여유가 명확해야 함
- 배경과 연결된 벽 고정형 설비로 보이며 공중에 떠 보이지 않아야 함
- 원, 광원, 반짝임, UI는 이번 시안에 포함하지 않음

## 생성 프롬프트

```text
Use case: precise-object-edit
Asset type: 16:9 main exploration background concept for a Korean gas-safety educational web game
Input image: edit target; preserve it exactly except for the requested gas valve assembly
Primary request: Add one believable household gas shutoff valve assembly to the blue tiled backsplash directly beneath the range hood, clearly mounted to the wall and visually connected to the kitchen rather than floating.
Subject: a moderately exposed slim gray vertical metal gas pipe with realistic wall brackets and fittings, plus a compact high-visibility yellow lever handle attached to a clear central pivot. The lever must visibly look graspable and rotatable by a player, with enough clearance around it for a 90-degree turn. Show the initial prototype lever parallel to the vertical pipe; this orientation is a safety-review draft, not final approval.
Placement: on the blue tiled wall directly below the right half of the range hood, above and slightly to the right of the cooktop; keep clear of the upper-right UI safe zone and do not cover the stove. Pipe ends and brackets must meet the wall/hood area plausibly, never suspended in midair.
Style: match the existing bright friendly polished 2D animation illustration exactly, including line weight, weak three-quarter perspective, soft cel shading, palette, daylight, surface texture, and scale.
Composition: valve large enough to discover at 2048x1152 but still believable as a household fitting; do not change room composition or camera.
Constraints: change only the requested valve and pipe assembly; preserve every wall tile, cabinet, hood, stove, countertop, furniture, lighting, colors, crop, and resolution. No hotspot circle, glow, sparkles, arrow, hand cursor, labels, text, logo, character, flame, gas cloud, warning symbol, or watermark. Keep the stove off. Produce one clean full-scene review image.
```

## 안전 메모

- 초기 레버는 세로 배관과 평행한 시안이다.
- 실제 열림·잠김 방향과 최종 90도 회전 상태는 `GS-OUTING-01` 안전 검수 후 확정한다.
- 검수 전 게임 문구나 상호작용의 최종 안전 상태로 사용하지 않는다.
