# 《두 번째 알림은 오지 않게》 가족 서사 Flow 생성 프롬프트 v3

> **보존용 구버전:** 최신 사용자 승인 서사와 전문 에이전트 검수를 반영한 실제 생성은 `production/flow/second-alert-family-production-package-v4.md`를 우선한다.

작성일: 2026-08-24  
승인 대본: `production/scripts/second-alert-av-script-v2.md`  
승인 쇼트리스트: `production/storyboards/second-alert-scene-cards-v2.md`

Flow 캐릭터 생성·신체 만들기·음성 운용은 `production/flow/flow-character-system-guide-v1.md`를 먼저 따른다.

## 1. 제작 결론

- Flow는 인물·공간·행동·카메라 움직임이 깨끗한 **편집용 원본**만 생성한다.
- 휴대전화 배지, `우리 집 화재 감지`, 붉은 가장자리 맥동, 모든 한글, 최종 효과음과 음악은 CapCut에서 만든다.
- 한 생성 클립에는 핵심 행동 하나만 둔다.
- 영상 안에서 화재·연기·폭발·대피를 생성하지 않는다. 위험은 `알림을 받고 멈춘 가족 + 식은 빈 식탁`으로 표현한다.
- F12A 손잡이 OFF와 F12B 불꽃 완전 소화는 다른 쇼트로 분리하고 프레임 단위로 검수한다.
- 아래 프롬프트는 영어 원문을 그대로 복사해 사용한다. Flow UI에서 지원하는 실제 길이와 모델 비용은 생성 직전에 다시 확인한다.

## 2. 화면과 편집 규격

- 화면비: `16:9 Landscape`
- 최종 출력: `1920×1080`, 24 또는 30fps 중 프로젝트 전체 하나로 고정
- 생성 길이: 현재 사용자 환경이 10초 고정이면 모두 10초로 생성하고 필요한 2~6초만 사용
- 중요 피사체: 화면 가장자리 10% 안쪽
- 하단 15%: 후편집 자막을 위해 중요 디테일 금지
- 기본 카메라: 고정 또는 매우 느린 단일 이동
- 기본 연기: 절제된 일상적 반응, 대사·립싱크 없음
- 생성 오디오: 최종본에서 음소거. 사운드 디자인은 CapCut에서 교체

## 3. 고정 핸들과 참조 자산

### 기존 승인 자산

| 핸들 | 파일 | 용도 |
|---|---|---|
| `CAST-A-FRONT` | `production/references/엄마-정면-참조-v2.png` | 엄마 정면 신원 |
| `CAST-A-SIDE` | `production/references/엄마-측면-참조-v2.png` | 엄마 측면 신원 |
| `ENV-K1` | `production/references/저녁준비-미완성-가스불켜짐-v1.png` | 최신 주방 구조·룩 |
| `ENV-K1-EMPTY` | `production/references/저녁준비-미완성-가스불켜짐-v1.png` | 미완성 저녁과 주방 구조 |
| `PROP-G1-ON` | `production/references/가스레인지-불켜짐-근접-v1.png` | 레인지 ON 상태 |
| `PROP-G1-OFF` | `production/references/가스레인지-불꺼짐-근접-v1.png` | 레인지 OFF 상태 |

### 신규로 먼저 승인할 자산

| 핸들 | 제안 파일 | 고정 내용 |
|---|---|---|
| `CAST-B` | `production/references/아빠-전신-참조-v1.png` | 40대 초반 한국인 아빠, 차콜 재킷, 흰 무지 셔츠, 검은 출근가방 |
| `CAST-C` | `production/references/딸-교복-전신-참조-v2.png` | 16세 한국인 딸, 흰 셔츠·남색 니트 조끼·차콜 교복 바지·남색 백팩 |
| `ENV-E1` | `production/references/아파트-엘리베이터홀-저녁-v1.png` | 아파트 1층 엘리베이터 홀, 닫힌 문·게시판·세로 거울·따뜻한 천장등 |
| `ENV-S1` | `production/references/고등학교-정문-푸른저녁-v1.png` | 열린 보행자 교문, 경비실과 불 켜진 교사동이 보이는 푸른 저녁의 고등학교 정문 |
| `ENV-D1` | `production/references/저녁준비-미완성-가스불켜짐-v1.png` | 승인된 주방·미완성 3인 식탁·소파·협탁 전화·개방형 거실·베란다 통합 공간 |

신규 참조가 승인되기 전에는 F03·F04·F07·F08·F09·F14 본 생성을 시작하지 않는다.

## 4. 신규 참조 이미지 생성 프롬프트

참조 이미지는 영상 쇼트보다 단순하게 만든다. 정면 또는 3/4 시점, 단색에 가까운 배경, 중립 표정, 손과 소품이 가려지지 않는 구도를 사용한다.

### REF-B — 아빠

```text
Character reference image of a Korean father in his early forties, short neat black hair, calm ordinary face, charcoal-gray lightweight business jacket over a completely plain white shirt, dark trousers, carrying one simple unbranded black work bag in his left hand. Neutral standing pose, three-quarter front view, both hands visible, restrained realistic styling, soft neutral studio background, even soft light, full-body commercial film casting reference, horizontal 16:9 with generous space around the body. No tie, no glasses, no jewelry, no logo, no badge, no readable text, no phone, no dramatic expression, no extra person, no duplicate limbs, no malformed hands, no watermark.
```

### REF-C — 아이

```text
Character reference image of an ordinary sixteen-year-old Korean daughter with a low black ponytail. She wears a completely plain fictional high-school uniform: crisp white long-sleeve collared shirt, dark-navy V-neck knitted vest, straight dark-charcoal uniform trousers, simple gray sneakers, and one unbranded navy backpack worn on both shoulders. Neutral standing pose, three-quarter front view, both hands visible, realistic age-appropriate Korean styling, soft neutral studio background, even soft light, full-body commercial-film casting reference. No school emblem, crest, name tag, tie, ribbon, skirt, logo, readable text, phone, makeup glamour, celebrity resemblance, extra person, malformed hands, watermark.
```

### REF-E1 — 엘리베이터

```text
Empty contemporary office elevator interior in Korea, matte warm-gray metal wall panels, closed center-opening doors, one simple vertical button panel on frame-right with blank unlit circular buttons, warm soft ceiling light, clean understated corporate architecture, centered symmetrical camera from the back wall at adult chest height, 35mm lens feeling, cinematic grounded realism, horizontal 16:9. No company name, no floor numbers, no safety instruction text, no logo, no mirror, no person, no phone, no advertising screen, no emergency event, no smoke, no red light, no watermark.
```

### REF-S1 — 고등학교 정문

```text
Ordinary Korean high-school main gate at blue hour after evening supplementary study, open pedestrian gate between simple brick-and-stone pillars, small guard booth, bicycle rack, paved path leading to a four-story classroom building with several warm lit windows, no institution identity and no crowd. Eye-level wide shot from the sidewalk at a slight angle, natural 35mm lens, cinematic grounded realism, horizontal 16:9. No readable school name, no emblem, no banner, no letters, no numbers, no logo, no uniformed crowd, no vehicles, no emergency lighting, no smoke, no watermark.
```

### REF-D1 — 세 자리 식탁

```text
Bright oak dining table connected visually to the approved small Korean apartment kitchen ENV-K1, viewed from a slightly elevated fixed angle. Exactly three place settings arranged as a family triangle: one on frame-left, one centered on the far side, one on frame-right. Each setting has one plain white rice bowl, one plain white soup bowl, one metal spoon and one pair of metal chopsticks. Exactly three small shared side-dish plates sit near the center. Warm 3200K evening light with subtle cool blue window fill. The approved black two-burner gas stove is visible deep in the background with one small steady blue flame beneath one stainless steel pot on the left burner. Cinematic grounded realism, horizontal 16:9. No people, no fourth place setting, no packaging, no brand, no readable text, no alcohol, no smoke, no orange flame, no extra burner, no warped tableware, no watermark.
```

## 5. 공통 프롬프트 블록

장면별 본문 뒤에 해당 블록 하나를 붙인다. 서로 다른 블록을 섞지 않는다.

### `COMMON-HOME-ON` — 엄마·주방·불 ON

```text
Ten-second editable source clip. Hold the opening state nearly still from 0.0 to 2.0 seconds, perform the one specified action once from 2.0 to 6.0 seconds, then hold the final state from 6.0 to 10.0 seconds. Preserve CAST-A identity, low-tied black hair, cream long-sleeve shirt, dark navy apron, ENV-K1 geometry, PROP-G1 geometry and every object position. The stainless pot stays centered on the front-left burner above exactly one small uniform steady blue flame; the right burner stays fully off. Cinematic grounded realism, contemporary Korean apartment, warm 3200K practical light with subtle cool evening fill, restrained natural acting, horizontal landscape 16:9, 24fps feeling. No dialogue, no music; generated audio will be muted. Keep essential subjects inside the inner ten-percent safe area and keep the lower fifteen percent free of essential detail.

No subtitles, no readable text, no letters, no numbers, no logo, no watermark, no app interface, no notification badge, no coral graphic, no red glow, no red mist, no gas cloud, no haze, no smoke, no orange or yellow flame, no second lit burner, no boil-over, no spill, no fire accident, no explosion, no emergency responder, no extra person, no child, no appliance geometry change, no extra burner, no duplicated knob, no duplicate phone, no malformed hands, no extra fingers, no camera shake, no cartoon style.
```

### `COMMON-FATHER` — 아빠·엘리베이터

```text
Ten-second editable source clip. Preserve CAST-B identity, charcoal jacket, plain white shirt, black work bag, and the ENV-E1 apartment elevator-hall geometry. His face, shoulders, torso and feet remain oriented toward the closed elevator doors. Cinematic grounded realism, restrained natural acting, warm neutral lobby light, horizontal landscape 16:9, 24fps feeling. No dialogue, no music; generated audio will be muted. Keep essential subjects inside the inner ten-percent safe area and keep the lower fifteen percent free of essential detail.

No subtitles, no readable text, no letters, no numbers, no readable floor display, no apartment name, no logo, no watermark, no app interface, no notification badge, no red glow, no emergency light, no smoke, no fire, no explosion, no panic, no extra person, no visible person reflection, no mirror duplicate, no duplicate phone, no malformed hands, no extra fingers, no door deformation, no camera shake, no cartoon style.
```

### `COMMON-TEEN` — 아이·출입구

```text
Ten-second editable source clip. Hold the opening state nearly still from 0.0 to 2.0 seconds, perform the one specified action once from 2.0 to 6.0 seconds, then hold the final state from 6.0 to 10.0 seconds. Preserve CAST-C identity, plain white school shirt, dark-navy knitted vest, dark-charcoal uniform trousers, gray sneakers, navy backpack, and ENV-S1 geometry. Cinematic grounded realism, restrained natural acting, cool blue-hour exterior with warm classroom light, horizontal landscape 16:9, 24fps feeling. No dialogue, no music; generated audio will be muted. Keep essential subjects inside the inner ten-percent safe area and keep the lower fifteen percent free of essential detail.

No subtitles, no readable text, no letters, no numbers, no institution name, no logo, no watermark, no app interface, no notification badge, no red glow, no emergency vehicle, no smoke, no fire, no explosion, no panic, no crowd, no extra foreground person, no duplicate phone, no malformed hands, no extra fingers, no camera shake, no cartoon style.
```

### `COMMON-TABLE` — 가족 식탁

```text
Ten-second editable source clip. Preserve ENV-D1 camera height, lens, table position, exactly three place settings, all bowls, spoons, chopsticks and side dishes in identical positions. Preserve the connected ENV-K1 kitchen geometry in the deep background. Cinematic grounded realism, warm 3200K evening light with subtle cool blue window fill, horizontal landscape 16:9, 24fps feeling. No dialogue, no music; generated audio will be muted. Keep essential subjects inside the inner ten-percent safe area and keep the lower fifteen percent free of essential detail.

No subtitles, no readable text, no letters, no numbers, no logo, no watermark, no packaging, no fourth place setting, no duplicated tableware, no moving dishes, no spilled food, no smoke, no fire accident, no explosion, no emergency response, no malformed hands, no extra fingers, no extra person beyond the explicitly requested family members, no camera shake, no cartoon style.
```

## 6. 영상 쇼트별 최종 프롬프트

### F01 — 함께 먹을 저녁의 약속

- 목표 사용 구간: 3초
- 추천: ENV-D1 정지 이미지에 CapCut 100→103% 푸시인 적용. 영상 생성이 필요할 때만 Omni 4초
- 참조: `ENV-D1` 시작 프레임 1장만 사용. 다른 공간 참조를 동시에 넣지 않는다.
- 시작 → 종료: 완성된 세 자리 식탁, 불 ON → 같은 상태 유지

```text
Animate the provided ENV-D1 start frame without redesigning or replacing any part of the apartment. Preserve the exact kitchen, dining table, exactly three chairs, exactly three complete place settings, exactly three shared side dishes, sofa, side table, dark phone, open living room, balcony doors, stove geometry, stainless pot and every object position. The camera performs one extremely slow, smooth three-percent push-in toward the empty three-person dinner table. Nothing else moves except an almost imperceptible natural shimmer of the one small steady blue gas flame on the left burner. The right burner remains fully off. Hold the first second and final second nearly still for editing. Four-second horizontal 16:9 cinematic source clip, grounded Korean apartment realism, no dialogue and no music. No person entering, no chair movement, no tableware movement, no moving phone, no steam plume, no lighting change, no focus breathing, no parallax distortion, no architecture change, no extra object, no text, no logo, no smoke, no orange flame, no second lit burner, no camera shake, no cut.
```

### F02 — 엄마의 조리와 멀리 있는 알림

- 목표 사용 구간: 5초
- 추천: Omni 10초 또는 Fast 8초
- 참조: `CAST-A-FRONT`, `CAST-A-SIDE`, `ENV-K1`, `PROP-G1-ON`
- 시작 → 종료: 엄마가 젓는 중 → 눈만 거실 방향으로 이동

```text
CAST-A is already gently stirring the stainless steel pot with a wooden ladle. She performs exactly one action: her eyes shift toward an off-screen sound coming from the living room while her head, torso, feet and stirring rhythm remain nearly unchanged. Medium waist-up shot from a forty-five-degree angle, 35mm lens, locked camera. Compose the open kitchen threshold on frame-right to establish that the unseen phone is outside the kitchen. Apply COMMON-HOME-ON. No visible phone, no reaching, no head turn, no walking, no second action.
```

### F03 — 아빠의 귀가 시작

- 목표 사용 구간: 3초
- 추천: Fast 또는 Omni
- 참조: `CAST-B`, `ENV-E1`
- 시작 → 종료: 홀에서 문을 바라보는 아빠 → 체중만 조금 옮기고 계속 대기

```text
CAST-B stands on the right third of the ENV-E1 apartment elevator hall with his face, shoulders, torso and feet oriented toward the closed doors centered in frame. The black work bag hangs from his left hand and one blank-screen phone stays lowered in his right hand. He performs exactly one action: shifts his weight slightly while continuing to wait and stare at the doors. Medium-wide rear three-quarter shot from behind his left shoulder, eye-level 35mm lens. Hold briefly, then perform one extremely slow smooth three-to-five-percent physical dolly-in and hold the final frame. Apply COMMON-FATHER. No digital zoom, no dolly-out, no button press, no phone interaction, no door opening, no readable number, no visible person reflection, no smile to camera.
```

### F04 — 아이의 귀가 시작

- 목표 사용 구간: 3초
- 추천: Fast 또는 Omni
- 참조: `CAST-C`, `ENV-S1`
- 시작 → 종료: 교문 안쪽에서 이미 걷는 중 → 보도를 향해 계속 걷는 상태로 컷

```text
CAST-C is already walking slowly from inside the open pedestrian gate of ENV-S1 toward the sidewalk, remaining within the central sixty percent of the frame. The navy backpack stays on both shoulders and one blank-screen phone remains lowered in the right hand without being viewed. She performs exactly one continuous action: takes only one to two small natural steps and remains in motion through the final frame. Preserve her exact saved sixteen-year-old face, youthful proportions and low ponytail in one stable three-quarter view toward her walking direction. Medium full shot from head to below the knees, eye-level 50mm lens, locked camera. Keep the gate and classroom building recognizable but slightly out of focus. Begin after movement has started and cut on an active stride. Apply COMMON-TEEN. No wide-angle distortion, no fast walking, no slowing down, no pause, no stop, no posing, no head turn, no head bobbing, no face morphing, no running, no crowd, no looking at the phone, no looking at camera.
```

### F05 — 잘못된 첫 선택

- 목표 사용 구간: 5초
- 추천: Omni 10초
- 참조: `CAST-A-SIDE`, `ENV-K1`, `PROP-G1-ON`
- 시작 → 종료: 주방 안 문턱 앞 → 문턱을 넘어 거실 쪽에서 정지

```text
CAST-A stands one step inside the kitchen threshold, hands empty, facing toward the living room on frame-right. She performs exactly one action: takes one natural step across the threshold into the living-room side and stops immediately, while turning only slightly toward the unseen phone. The camera remains inside the kitchen so the pot and one small steady blue flame on the front-left burner stay clearly visible on frame-left for the entire clip. Wide side-profile composition, 28mm lens, locked camera, strong left-to-right spatial axis. Apply COMMON-HOME-ON, except CAST-A is explicitly allowed to cross the kitchen threshold exactly once as described. No phone in hand, no second step, no leaving frame, no stove interaction, no flame change.
```

### F06 — 최초 알림 확인용 깨끗한 원본

- 목표 사용 구간: 3초
- 추천: Omni 10초
- 참조: `CAST-A-SIDE`, `ENV-K1`
- 시작 → 종료: 거실 테이블의 전화 앞 → 전화 한 대를 들어 시선 높이 아래에서 정지

```text
On a small living-room side table immediately outside the approved kitchen threshold, one matte black unbranded smartphone rests face-up with a completely dark blank screen. CAST-A performs exactly one action: picks up that single phone with her anatomically correct right hand and holds it still below chest height, looking down at the blank screen. The lit kitchen with the pot above one small steady blue flame remains softly visible in the background. Tight hand-and-torso shot, 65mm lens, locked camera, shallow depth of field. Apply COMMON-HOME-ON, except CAST-A is now on the living-room side and the phone is explicitly present. No generated screen light, no text, no icon, no badge, no finger tap, no second hand on phone, no alarm reaction.
```

후편집: 0.2초 정지, 코랄 배지 1개, 첫 맥박, 미래 섬광 진입을 추가한다.

### F07 — 아빠에게 도착한 미래 경고

- 목표 사용 구간: 4초
- 추천: Omni 10초
- 참조: `CAST-B`, `ENV-E1`, 가능하면 F03 채택본 마지막 프레임
- 시작 → 종료: 엘리베이터 문을 보던 아빠 → 전화 화면을 보고 동작 정지

```text
CAST-B stands in the exact same right-third position and door-facing orientation established in F03. The black work bag remains in his left hand and a dark-gray-cased unbranded smartphone is held low in his right hand with a completely black blank screen. He performs exactly one action: lowers only his gaze from the closed elevator doors to the phone and becomes completely still, his expression changing only from neutral to quietly concerned. Match the F03 camera axis from behind his left shoulder, use a tighter 50mm medium close shot, and keep the camera locked with no zoom or dolly. Apply COMMON-FATHER. No screen illumination, no text, no icon, no tapping, no phone vibration, no red light, no panic, no door movement, no visible person reflection, no second action.
```

후편집: 검정 화면 위에 브랜드 없는 `우리 집 화재 감지` 카드와 얇은 코랄 가장자리 맥동을 넣는다.

### F08 — 아이에게 도착한 미래 경고

- 목표 사용 구간: 4초
- 추천: Omni 10초
- 참조: `CAST-C`, `ENV-S1`, 가능하면 F04 채택본 마지막 프레임
- 시작 → 종료: 출입구 밖에 선 아이 → 전화 화면을 보고 발걸음 정지

```text
CAST-C stands just outside ENV-S1 in the exact wardrobe, backpack position and blue-hour light established in F04. A navy-cased unbranded smartphone is already held in both anatomically correct hands below chest height with a completely black blank screen. The teenager performs exactly one action: lowers the gaze to the phone and freezes mid-intention to walk home, with restrained quiet concern and no panic. Medium close shot from slightly above hand level, 65mm lens, locked camera. Apply COMMON-TEEN. No screen illumination, no text, no icon, no tapping, no phone vibration, no red light, no walking, no crying, no second action.
```

후편집: F07과 동일한 경고 카드·크기·색·타이밍을 적용한다.

### F09 — 오지 못한 저녁

- 목표 사용 구간: 6초
- 추천: F01 기준 이미지 재사용 + CapCut 편집 우선. 새 생성은 실패할 때만 사용
- 참조: `ENV-D1`, `ENV-K1`, `PROP-G1-ON`
- 시작 → 종료: 세 자리 빈 식탁 → 김만 서서히 사라짐

```text
The exact same untouched table, camera, lens, three empty chairs, exactly three place settings, bowls, spoons, chopsticks and side dishes from F01 remain perfectly fixed. The only action is that the faint natural food steam slowly becomes less visible, suggesting time has passed and the shared dinner did not happen. The connected kitchen remains present deep in frame. Slightly elevated fixed composition, 50mm lens, absolutely locked camera, very subtle gradual cooling of color temperature without changing exposure. Apply COMMON-TABLE. No person, no chair movement, no disappearing object, no burned food, no damage, no ash, no smoke, no fire, no emergency light, no red light.
```

권장 편집 대안: F01 정지 프레임을 6초 유지하고 김 오버레이만 약화한다. 생성 재시도보다 연속성이 높다.

### F10 — 원인을 돌아보다

- 목표 사용 구간: 4초
- 추천: Omni 10초
- 참조: `CAST-A-SIDE`, `ENV-K1`, `ENV-D1`, `PROP-G1-ON`
- 시작 → 종료: 빈 식탁을 보던 엄마 → 머리와 어깨를 주방 불꽃 쪽으로 돌림

```text
CAST-A stands still beside the untouched three-place dinner table, facing the empty chairs. She performs exactly one controlled action: slowly turns only her head and shoulders toward the kitchen behind her. Across the depth of the frame, one small uniform steady blue flame beneath the stainless pot on the front-left burner becomes the clear point of focus. Over-the-shoulder composition, 50mm lens, CAST-A softly focused in the foreground and the blue flame sharp in the background, locked camera. Apply COMMON-HOME-ON. No walking, no phone visible, no stove interaction, no panic, no lighting change, no additional person.
```

후편집: F06–F09의 미래 가장자리 효과를 F10 초반에만 유지한 뒤 휴대전화 배지 안으로 접는다.

### F11 — 선택 직전의 멈춤

- 목표 사용 구간: 3초
- 추천: F05 시작 프레임 재사용 + 미세 패럴랙스 우선
- 참조: `CAST-A-SIDE`, `ENV-K1`, `PROP-G1-ON`
- 시작 → 종료: 문턱을 넘으려는 자세 → 발을 내딛기 전에 멈춤

```text
CAST-A stands on the kitchen side of the threshold facing the living room, with the right foot slightly prepared to step but still fully inside the kitchen. She performs exactly one action: stops the intended step before crossing the threshold and settles both feet firmly on the kitchen floor. The pot and one small steady blue flame on the front-left burner remain clearly visible on frame-left. Wide side-profile shot matching the exact camera axis and 28mm lens of F05, locked camera. Apply COMMON-HOME-ON. No crossing the threshold, no phone visible, no head turn, no walking back yet, no stove interaction, no second action.
```

### F12A — 손잡이를 OFF 끝까지

- 목표 사용 구간: 4초
- 우선순위: 안전한 정상 사용 환경의 직접 매크로 촬영 > 엄격 검수한 Omni 생성
- 참조: `PROP-G1-ON`, 가능하면 정확한 손잡이 시작·종료 상태 이미지
- 시작 → 종료: 사용 중인 왼쪽 화구 대응 손잡이를 잡음 → 정의된 OFF 끝점에서 정지

```text
One anatomically correct adult female right hand is already gripping only the single control knob that physically corresponds to the active front-left burner of the approved unbranded black-glass two-burner stove PROP-G1. The hand performs exactly one continuous mechanical action: rotates that one knob smoothly to its defined OFF stop and holds it completely still. The burner and flame remain outside the frame. Preserve exactly two stove knobs total, their spacing, appliance edges and materials throughout. Extreme macro close-up from slightly above, 85mm lens, locked camera, neutral warm light, physically accurate instructional realism, horizontal 16:9. Ten seconds, with the rotation between 2.0 and 5.0 seconds and the final position held from 5.0 to 10.0 seconds. No generated OFF text, no letters, no invented symbol, no second hand, no other knob movement, no extra finger, no knob duplication, no appliance deformation, no camera movement, no cut.
```

즉시 폐기: 대응 손잡이가 불명확함, 손가락 오류, 손잡이 수·위치 변화, 다른 손잡이 움직임, 종료 상태가 기준 이미지와 다름.

### F12B — 파란 불꽃 완전 소화

- 목표 사용 구간: 2초
- 우선순위: 안전한 정상 사용 환경의 직접 매크로 촬영 > ON/OFF 참조를 사용한 Fast/Omni 생성
- 시작 참조: `PROP-G1-ON`
- 종료 참조: `PROP-G1-OFF`

```text
The one small uniform blue gas flame beneath the centered stainless steel pot on the approved front-left burner remains steady from 0.0 to 3.0 seconds, reduces smoothly once from 3.0 to 5.0 seconds, becomes completely extinguished, and then remains fully dark and unchanged from 5.0 to 10.0 seconds. The right burner remains fully off throughout. Match the exact appliance, pot, burner, camera position and materials of PROP-G1-ON and PROP-G1-OFF. Extreme macro close-up at burner level, 85mm lens, locked camera, neutral warm light, physically accurate instructional realism, horizontal 16:9. No hand, no knob, no residual flame, no reignition, no smoke, no steam burst, no orange or yellow flame, no second lit burner, no geometry change, no camera movement, no cut.
```

즉시 폐기: 잔불, 재점화, 주황·노랑 불꽃, 연기, 화구 구조 변화, 다른 화구 점화.

### F13 — 불을 끈 뒤 알림 확인

- 목표 사용 구간: 3초
- 추천: Omni 10초
- 참조: `CAST-A-FRONT`, `CAST-A-SIDE`, `ENV-K1`, `PROP-G1-OFF`
- 시작 → 종료: 꺼진 화구를 확인한 엄마 → 거실의 전화 한 대를 들어 확인

```text
The approved front-left burner is fully dark with no flame and the right burner is also off. On the living-room side table immediately outside the kitchen threshold, one matte black unbranded smartphone rests face-up with a completely dark blank screen. CAST-A performs exactly one action: calmly picks up that single phone with her anatomically correct right hand and holds it below chest height, glancing at the blank screen. The fully extinguished stove remains visible in the background. Tight medium shot, 50mm lens, locked camera, warm restored evening light. Preserve CAST-A identity, wardrobe, ENV-K1 and PROP-G1-OFF. No screen light, no text, no icon, no badge, no finger tap, no red glow, no second phone, no cooking continuation, no touching the stove, no flame, no smoke, no extra person, no malformed hands.
```

후편집: 평범한 개인 알림 배지 1개만 잠시 표시하고 미래 경고 전파는 넣지 않는다.

### F14 — 돌아온 가족의 첫 숟가락

- 목표 사용 구간: 3초
- 추천: 얼굴 노출을 줄인 Omni 10초. 실패 시 손만 보이는 탑숏으로 전환
- 참조: `CAST-A`, `CAST-B`, `CAST-C`, `ENV-D1`, `ENV-K1`, `PROP-G1-OFF`
- 시작 → 종료: 세 사람이 이미 앉아 있음 → 각자 수저 하나를 들어 식사를 시작

```text
CAST-A, CAST-B and CAST-C are already seated in their fixed places around the exact ENV-D1 table: CAST-C on frame-left, CAST-B centered on the far side, CAST-A on frame-right. The camera frames them from shoulders down so identity continuity depends mainly on the approved wardrobe, not facial detail. They perform one synchronized family action: each person lifts exactly one metal spoon naturally from the table and holds it just above the matching bowl, beginning dinner together. The approved kitchen remains softly visible in the background with both gas burners fully off and no flame. Slightly elevated medium-wide composition matching F01, 50mm lens, locked camera, warm 3200K evening light, restrained ordinary family warmth. Apply COMMON-TABLE. Exactly three people, exactly three place settings, exactly three spoons lifted, no dialogue, no toast, no waving, no food entering mouths, no extra hand, no duplicated utensil, no fourth person, no screen, no phone, no flame, no smoke.
```

저비용 대체 프롬프트:

```text
Top-down close view of exactly three family members' anatomically correct hands at the approved ENV-D1 table, with only sleeves identifying them: plain white school-shirt sleeve beneath a dark-navy knitted vest on frame-left, charcoal jacket at the far side, cream shirt with navy apron on frame-right. Exactly three hands each lift exactly one metal spoon once above exactly three matching bowls. All tableware remains fixed. Both gas burners visible deep in frame are fully off. Locked camera, warm evening light, cinematic grounded realism, horizontal 16:9. No faces, no extra person, no extra hand, no duplicated spoon, no fourth place setting, no text, no phone, no flame, no smoke.
```

### F15 — 엔드카드

Flow에서 생성하지 않는다. CapCut에서 5초 정지 그래픽으로 만든다.

```text
두 번째 알림은 오지 않게.
자리를 뜨기 전, 가스불부터 끄세요.
```

- 첫 줄은 기억 문구, 둘째 줄은 행동 문구로 위계를 구분한다.
- 마지막 0.5초는 모든 그래픽 움직임을 멈춘다.
- KGS 로고는 공식 제공 파일과 사용 허용 범위를 확인한 경우에만 사용한다.

## 7. 생성 순서와 게이트

### Gate A — 신규 세계 고정

1. `REF-D1` 식탁
2. `REF-B` 아빠
3. `REF-E1` 엘리베이터
4. `REF-C` 아이
5. `REF-S1` 출입구

승인 조건: 브랜드·문자 없음, 복장과 공간이 단순함, 기존 주방과 같은 저녁 팔레트.

### Gate B — 가장 위험한 네 쇼트

1. F05: 엄마가 문턱을 실제로 넘지만 켜진 불이 화면에 남음
2. F12B: 불꽃이 완전히 꺼지고 마지막 상태 유지
3. F12A: 정확히 한 손잡이만 OFF로 이동
4. F14: 정확히 세 사람·세 자리·세 수저

네 쇼트가 모두 통과하기 전에는 전체 본 생성을 진행하지 않는다.

### Gate C — 재사용 쌍

- F03 채택 프레임 → F07 참조
- F04 채택 프레임 → F08 참조
- F01 기준 프레임 → F09와 F14 카메라 기준
- F05 시작 프레임 → F11 기준
- F12B 종료 프레임 → F13과 F14의 OFF 상태 기준

## 8. CapCut 분업

- V1: Flow 원본
- V2: 휴대전화 화면 교체·마스크
- V3: 미래 섬광의 코랄 가장자리 맥동
- A1: 개인 알림 두 음
- A2: 변형된 미래 경고 두 음
- A3: 생활음·음악
- A4: 마지막 내레이션
- T1: 엔드카드

### 경고 그래픽 규칙

- 색: 코랄 레드 `#F04444`, 순백 대비를 피하고 채도 70~85%
- 엄마의 최초 알림: 원형 배지 1개, 내용 미노출
- 아빠·아이 미래 경고: 동일한 브랜드 없는 카드에 `우리 집 화재 감지`
- 실제 재난문자, 스마트홈 앱, OS 알림 디자인을 복제하지 않는다.
- 붉은 효과는 화면 표면과 가장자리에만 존재한다. 공간 속 가스·연기·불꽃처럼 움직이지 않는다.

### 시간 전환 규칙

- F06에서 0.2초 정지 후 F07로 하드컷.
- F07→F08은 동일 경고음의 두 번째 음으로 매치컷.
- F08→F09는 아이 화면의 붉은 면을 이용한 컬러 매치컷.
- F10→F11은 미래 장면이 F06의 배지 안으로 접힌 뒤 직접 컷. 일반 역재생 효과 금지.
- F11→F12A→F12B는 안전 의미를 위해 하드컷. 디졸브 금지.

## 9. 즉시 폐기 기준

- 불꽃이 주황·노랑이거나 오른쪽·복수 화구에 존재
- 손잡이와 화구의 대응이 틀리거나 모호함
- F12B 종료 시 잔불·재점화·연기
- 레인지 화구·손잡이 수 또는 구조 변화
- 생성 영상 안의 읽을 수 있는 글자·브랜드·앱 UI
- 아빠·아이의 의상·가방·공간이 재사용 쌍 사이에서 변함
- F14에 네 번째 사람·네 번째 자리·추가 손·추가 수저가 생김
- 미래 효과가 실제 가스·연기·불꽃으로 보임
- 사고·폭발·대피를 오락적으로 묘사
- 유명인·유명 캐릭터와 식별 가능한 유사성

## 10. 생성 로그

각 결과는 `production/templates/flow-generation-log.md`에 다음을 기록한다.

- 장면 ID와 후보 번호
- 실제 복사한 프롬프트 전문
- 사용 모델·길이·해상도
- 참조 이미지 파일명과 순서
- 생성일·실제 차감 크레딧
- 원본 결과 파일명
- 채택·보류·폐기와 구체적 이유
- 인물·손·가스레인지·불꽃·문자·카메라·안전 의미 검수 결과
- CapCut에서 추가할 화면·색·사운드·속도 변경

## 11. 크레딧 절약 우선순위

1. F01·F09는 같은 기준 이미지로 해결한다.
2. F11은 F05 시작 프레임으로 정지 패럴랙스 처리한다.
3. F03/F07, F04/F08은 동일 환경과 첫 채택 프레임을 재사용한다.
4. F14는 얼굴 없는 손 탑숏을 먼저 테스트한다.
5. F12A/B는 반복 생성보다 검증 가능한 직접 매크로 촬영 또는 승인된 ON/OFF 프레임 컷을 우선한다.
6. Quality는 기본 계획에서 사용하지 않는다. 대표 쇼트 한 개가 반드시 필요한 경우에만 별도 승인한다.
