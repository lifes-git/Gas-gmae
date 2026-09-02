# 분리형 가스밸브 에셋 v4

- 작성일: 2026-09-02
- 생성 도구: OpenAI built-in ImageGen
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결
- 합성 기준 배경: `webgame-prototype/assets/masters/bg-room-clean-candidate-v4-2048x1152.png`
- 투명 원본: `webgame-prototype/assets/masters/prop-valve-main-open-draft-v4-source.png`
- 배치용 후보: `webgame-prototype/assets/masters/prop-valve-main-open-draft-v4.png`
- 합성 검수본: `webgame-prototype/assets/masters/preview-room-valve-composite-v4.jpg`

## 제작 방식

승인된 배경은 다시 생성하지 않았다. 투명 밸브 에셋을 별도로 생성하고 알파 경계의 극저투명 픽셀만 정리한 뒤, 2048×1152 원본 배경의 고정 월드 좌표에 비파괴 합성했다.

## 채택 후보 프롬프트

```text
Use case: stylized-concept
Asset type: isolated transparent PNG game prop
Primary request: Draw a wall-mounted household gas shutoff valve assembly as one clean 2D animation-style prop for compositing over a kitchen illustration.
Subject: a short slim vertical warm-gray pipe with simple couplings, a compact brass valve body, two small rear wall brackets, and exactly ONE straight yellow lever extending upward from the right side of a clear circular pivot. The one lever is parallel to the pipe for this review draft, obviously graspable, and has empty clearance for a later 90-degree rotation.
Style: friendly polished flat 2D animation, rounded dark-brown outlines, simple two-tone cel shading, very limited metal texture, warm daylight colors, same simplified detail level as a children's educational web game; not photorealistic and not 3D.
Composition: centered vertical object, slight left three-quarter view, full object visible, generous empty margin, object about 70 percent of image height.
Background requirement: output a real transparent alpha channel. Every pixel outside the object and its two tiny contact shadows must be fully transparent.
Constraints: isolated object only; exactly one yellow lever; crisp anti-aliased outline; no wall, no tiles, no room, no colored backdrop, no black backdrop, no white backdrop, no checkerboard pattern, no halo, no ambient glow, no text, no symbols, no arrows, no hands, no hotspot, no sparkles, no flame, no gas, no watermark.
```

## 합성 정보

- 배치용 크기: 122×224 px
- 배치 좌표: x=1579, y=306
- 기준 월드: 2048×1152
- 화면별 별도 좌표 보정 없이 배경과 같은 비율로 확대·축소할 예정

## 안전 메모

- 레버가 세로 배관과 평행한 초기 시안이다.
- 실제 열림·잠김 방향은 안전 검수 후 확정한다.
- 승인 전에는 게임의 최종 상태 에셋으로 사용하지 않는다.

## v5 정면 수정

- 사용자 피드백: 기존 밸브가 정면이 아니라 측면을 보는 듯함.
- 수정: 회전축을 정원으로 보이는 정면 시점으로 변경하고 손잡이의 넓은 면을 화면과 평행하게 배치.
- 생성 결과의 체크무늬가 실제 픽셀로 포함되어, 연결된 밸브 실루엣만 명도·채도 기반으로 추출하고 가장자리에 0.65px 안티앨리어싱을 적용함.
- 정면 투명 에셋: `webgame-prototype/assets/masters/prop-valve-main-front-draft-v5.png`
- 정면 합성 검수본: `webgame-prototype/assets/masters/preview-room-valve-front-composite-v5.jpg`
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결

## v6 크기·가림 수정

- 사용자 피드백: 밸브 크기가 크고 배관 상단이 환풍구보다 앞에 보임.
- 배치 크기: 40×216 px, 이전 56×300 px 배치의 약 72%.
- 배치 좌표: x=1620, y=296, 기준 월드 2048×1152.
- 레이어 순서: 원본 배경 → 밸브 → 원본 환풍구 전면부 복원.
- 환풍구 가림 영역: `(1508, 276)–(1752, 330)`.
- 배치용 투명 에셋: `webgame-prototype/assets/masters/prop-valve-main-front-placement-v6.png`
- 합성 검수본: `webgame-prototype/assets/masters/preview-room-valve-scaled-occluded-v6.jpg`
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결

## v7 배경 결합형 단순 디자인

- 사용자 제공 직전 통합 장면의 밸브를 형태·비례·표현 밀도 레퍼런스로 사용함.
- 승인된 깨끗한 방 이미지는 색감·선명도·조명 레퍼런스로만 사용하고 재생성하지 않음.
- 변경: 가는 회색 배관, 작은 밸브 본체, 짧고 저채도인 노란 손잡이, 얇고 낮은 대비의 외곽선, 단순한 2단 명암.
- 생성 결과의 체크무늬 픽셀은 연결된 밸브 실루엣만 추출해 제거함.
- 투명 마스터: `webgame-prototype/assets/masters/prop-valve-main-simple-draft-v7.png`
- 2048×1152 배치본: `webgame-prototype/assets/masters/prop-valve-main-simple-placement-v7.png` (22×216 px)
- 배치 좌표: x=1629, y=296.
- 환풍구 전면을 마지막에 복원해 배관 상단이 환풍구 뒤로 들어가게 처리함.
- 합성 검수본: `webgame-prototype/assets/masters/preview-room-valve-simple-v7.jpg`
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결

## v8 벽 접촉 단서 보강

- 사용자 피드백: 단순화된 밸브가 여전히 공중에 떠 보임.
- 밸브 디자인과 승인 배경은 변경하지 않음.
- 추가 레이어: 밸브 알파에서 만든 오른쪽 아래 방향의 저농도 접촉 그림자.
- 추가 레이어: 배관 뒤쪽의 얇은 벽 고정 스트랩 2개와 작은 나사 표현.
- 추가 레이어: 배관 하단의 타일 벽 진입 마감판.
- 상단 배치 y를 296에서 288로 올리고 환풍구 전면 복원 영역을 y=334까지 확장해 더 깊게 가림.
- 레이어 순서: 배경 → 접촉 그림자 → 고정 스트랩·하단 마감판 → 밸브 → 환풍구 전면.
- 접촉 그림자: `webgame-prototype/assets/masters/prop-valve-contact-shadow-v8.png`
- 고정부: `webgame-prototype/assets/masters/prop-valve-wall-mounts-v8.png`
- 합성 밸브: `webgame-prototype/assets/masters/prop-valve-main-mounted-v8.png`
- 합성 검수본: `webgame-prototype/assets/masters/preview-room-valve-mounted-v8.jpg`
- 상태: 사용자 검수 대기 / 안전 상태 미확정 / 게임 미연결
