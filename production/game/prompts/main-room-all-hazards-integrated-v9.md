# 메인 탐색 장면 — 세 위험요소 통합 후보 v9

- 작성일: 2026-09-02
- 생성 도구: OpenAI built-in ImageGen
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결
- 입력 배경: `webgame-prototype/assets/masters/bg-room-clean-candidate-v4-2048x1152.png`
- 밸브 디자인 레퍼런스: 사용자 제공 `codex-clipboard-f76a9c40-96e9-4a4d-ac0b-045cf27d65d1.png`
- 생성 원본: `webgame-prototype/assets/masters/bg-room-all-hazards-integrated-v9-source.png`
- 2048×1152 검수본: `webgame-prototype/assets/masters/bg-room-all-hazards-integrated-v9-2048x1152.png`

## 제작 전략

- 가스 배관·밸브 본체처럼 움직이지 않는 설비는 장면에 통합한다.
- 가스레인지는 꺼진 상태로 장면에 통합한다.
- 수건과 부탄캔은 현재 위험 위치에서 배경과 같은 조명·접촉 그림자로 생성한다.
- 사용자 승인 후 실제로 움직이는 손잡이·수건·부탄캔만 분리 후보로 제작한다.
- 원·반짝임·체크·UI·캐릭터는 이미지에 굽지 않는다.

## 생성 프롬프트

```text
Use case: precise-object-edit
Asset type: final-candidate 16:9 main exploration master for a Korean gas-safety educational web game
Input images: Image 1 is the edit target and locked composition/style master. Image 2 is the exact design reference for how naturally the fixed gas pipe and valve should be integrated into the kitchen wall.
Primary request: Create ONE coherent unsafe exploration scene by adding all three approved interactive hazards in the same generation so their lighting, perspective, line softness, texture, and contact shadows belong to the room. Preserve the room layout and camera of Image 1.
Hazard 1 — fixed valve infrastructure: on the blue tiled backsplash directly beneath the range hood, add a thin simple vertical warm-gray household gas pipe and small compact valve matching Image 2. The upper pipe must visibly continue behind the hood; the lower pipe must enter the tiled wall through a subtle wall connection or service fitting, never end in midair. Use a small short muted-yellow single lever with a visible pivot, parallel to the pipe only as a safety-review draft. Keep it restrained and integrated, not an industrial centerpiece.
Hazard 2 — towel near heat source: place one soft folded pale-mint cotton kitchen towel on the countertop immediately to the right of the cooktop, close enough to clearly be a fire-safety hazard but not touching a burner. Give it a natural contact shadow and cloth folds. The gas cooktop must remain completely off with no flame, smoke, scorch, or heat effect.
Hazard 3 — used butane can indoors: place one intact used red portable butane fuel can lying horizontally on the open wooden floor in the lower center-left area between the living room and kitchen, forming a clear triangular distribution with the valve and towel. Give it correct cylindrical perspective and a soft floor contact shadow. It must be intact, not punctured, not leaking, and not near a flame.
Style: match Image 1 exactly—bright friendly polished 2D animation illustration, thin rounded low-contrast outlines, soft cel shading, warm daylight, slightly reduced saturation, coherent household scale. All three hazards must look painted into the same original scene, never like pasted stickers or floating overlays.
Composition: preserve the left living room, center entry, and right kitchen proportions; keep top-left objective, top-right progress, and lower-left mascot/caption safe zones visually clear. Hazards must be discoverable but not oversized; later hotspot circles will provide emphasis.
Constraints: add only the three described hazards; preserve all existing furniture, cabinets, hood, stove, doors, windows, plants, jars, floor, tiles, lighting direction, crop, and room structure as closely as possible. No characters, UI, hotspot rings, glow, sparkles, check marks, arrows, hands, text, numbers, logos, labels, warning icons, flame, smoke, gas cloud, damage, puncture, trash bin, or watermark. Produce one clean full-scene review image.
```

## 1차 자체 검수

- 가스레인지: 불꽃 없이 꺼진 상태.
- 부탄캔: 온전한 수평 캔, 누출·천공·가스 표현 없음.
- 밸브: 상단은 후드 뒤로 연결되나 하단 연결부는 추가 검토 필요.
- 수건: 조리대 오른쪽에 통합됐으나 전체 화면에서 다소 작게 보일 수 있음.
- 판정: `Revise 후보` — 사용자 구도·크기 검수와 안전 방향 검수 전 게임 연결 금지.

## v10–v11 사용자 수정

- 사용자 피드백: 밸브 손잡이 형태가 이상하며 수건을 꺼진 가스레인지 위에 널브러진 상태로 변경.
- v10 생성 편집: 수건을 완전히 꺼진 쿡탑 위에 느슨하게 걸치고 접촉 그림자를 통합함.
- 생성 모델이 밸브 손잡이를 반복해서 L자 형태로 만들어 장면 전체 재생성을 중단함.
- v11 고정 배경: 수건·부탄캔·배관 본체가 포함된 v10 장면에서 손잡이 영역만 배관의 깨끗한 좌측 픽셀을 대칭 복사해 복원함.
- v11 가동 레이어: 정면형 세로 캡슐 레버와 하단 원형 피벗을 4배 크기에서 그린 뒤 18×44 px 투명 PNG로 축소함.
- 손잡이 없는 배경: `webgame-prototype/assets/masters/bg-room-all-hazards-handleless-v11-2048x1152.png`
- 손잡이 레이어: `webgame-prototype/assets/masters/prop-valve-handle-front-draft-v11.png`
- 합성 검수본: `webgame-prototype/assets/masters/bg-room-all-hazards-revised-v11-2048x1152.png`
- 가스레인지: 모든 버너가 꺼진 상태이며 불꽃·열·연기·그을림 없음.
- 상태: 사용자 검수 대기 / 밸브 방향 안전 검수 대기 / 게임 미연결.
