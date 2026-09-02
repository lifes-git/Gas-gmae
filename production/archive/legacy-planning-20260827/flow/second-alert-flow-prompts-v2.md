# 《두 번째 알림은 오지 않게》 Flow 생성 프롬프트 v2

> **보존용 구버전:** 엄마 1인·주방 중심안이다. 가족 서사 `Go` 승인 이후의 실제 생성에는 `production/flow/second-alert-family-flow-prompts-v3.md`를 우선한다.

작성일: 2026-08-23  
협업 검토: 영상기획·Google Flow 감독·CapCut 편집·가스안전/공모전 심사

## 생성 게이트

현재 사용자 Flow 환경에서는 모든 원본을 10초로 생성한다. 본 생성 전에 `S01 → S04 → S09B → S09A` 순서로 테스트하며 네 장면이 모두 통과해야 나머지를 생성한다.

모든 장면은 `16:9 Landscape`로 생성한다. CapCut 캔버스와 최종 출력은 `1920×1080`으로 고정한다. 아래 장면별 과거 길이 표기가 있더라도 실제 생성 길이는 모두 10초가 우선이며, 편집에서 필요한 3~8초만 사용한다.

- S01: 전화와 파란 불꽃이 첫 3초 안에 함께 읽힘.
- S04: 정확히 한 걸음 뒤 몸 전체가 주방 쪽 문턱 안에 정지.
- S09B: 불꽃 완전 소화 후 마지막 1초간 완전 OFF.
- S09A: 사용 중인 왼쪽 화구에 대응하는 손잡이 하나만 조작.

## 참조 핸들

| 핸들 | 파일 |
|---|---|
| CAST 정면 | `production/references/엄마-정면-참조-v2.png` |
| CAST 측면 | `production/references/엄마-측면-참조-v2.png` |
| 주방/룩 | `production/references/REF-MASTER-K1-v2.png` |
| 빈 주방 | `production/references/REF-ENV-K1-wide-v1.png` |
| 레인지 ON | `production/references/가스레인지-불켜짐-근접-v1.png` |
| 레인지 OFF | `production/references/가스레인지-불꺼짐-근접-v1.png` |

`CAST-A`는 30대 후반~40대 초반의 한국인 여성 어머니다. 낮게 묶은 검은 머리, 크림색 셔츠, 남색 앞치마를 모든 장면에서 유지한다. 화면 왼쪽은 레인지, 오른쪽은 문턱이며 이동축을 뒤집지 않는다.

## 모든 프롬프트 뒤에 붙일 공통 블록

```text
Ten-second clip. Hold the opening state almost still from 0.0 to 2.0 seconds, perform the single action once at a natural pace from 2.0 to 6.0 seconds, then hold the final state almost still from 6.0 to 10.0 seconds without adding a second action. The camera, kitchen layout, stove geometry, identity, hairstyle and wardrobe remain stable throughout. Keep all important subjects inside the inner ten percent safe area and leave the lower fifteen percent free of essential detail. Cinematic grounded realism, contemporary Korean apartment, warm 3200K practical lighting with subtle cool evening window fill, restrained natural acting, horizontal landscape 16:9 composition, 24fps feeling. No dialogue, no soundtrack and no music; generated audio will be muted in editing.

no subtitles, no readable text, no letters, no numbers, no logo, no watermark, no notification UI, no app icon, no glowing orb, no coral glow, no red mist, no red smoke, no red flame, no gas cloud, no haze, no smoke, no orange or yellow flame, no flame on the right burner, no second lit burner, no oversized or flickering flame, no boil-over, no spill, no fire, no explosion, no emergency response, no child, no extra person, no person leaving the kitchen, no appliance geometry change, no extra burner, no duplicated knob, no duplicate phone, no malformed hands, no extra fingers, no camera shake, no cartoon style
```

> 알림 구슬, 붉은 얼굴 반사, 모든 문자와 최종 사운드는 Flow에서 생성하지 않고 CapCut에서 합성한다.

## S01 — 전화 진동과 켜진 불

- 길이: 10초 고정 생성 → 약 3초 사용
- 참조: 빈 주방 + 레인지 ON
- 예상 사용 구간: 어두운 화면 1초 → 점등·진동 → 점등 유지까지 약 3초

```text
A matte black unbranded smartphone rests face-up on the right side of the kitchen counter with its screen completely dark. From 0.0 to 2.0 seconds, the phone remains completely still and dark. At about 2.5 seconds, the phone screen suddenly wakes with a soft neutral white-blue glow and the phone makes exactly one short subtle vibration, suggesting an incoming call without showing any interface. From 3.0 to 10.0 seconds, the softly illuminated screen remains steady and the phone stays still. In the lower-left background, a stainless steel pot remains centered on the left burner above one small uniform steady blue gas flame; the right burner remains fully off. Extreme close-up, 85mm macro lens, shallow depth of field, locked camera with an almost imperceptible three-centimeter push-in. Both the illuminated phone and the blue gas flame must remain recognizable in the same frame. Warm 3200K kitchen lighting with subtle cool evening window fill, horizontal landscape 16:9, cinematic grounded realism. No readable text, no caller name, no phone number, no call buttons, no app icon, no notification badge, no logo, no brand-specific interface, no hand, no second vibration, no ringtone, no dialogue, no smoke, no orange flame, no second lit burner, no boil-over, no warped stove. Ten seconds.
```

## S02 — 시선만 이동

- 길이: 10초 고정 생성 → 약 5초 사용
- 참조: CAST 정면·측면 + 주방/룩 + 레인지 ON
- 시작/종료: 이미 젓는 중 → 손과 몸은 유지하고 눈만 전화 쪽으로 이동

```text
CAST-A is already gently stirring the stainless steel pot with her right hand. She makes only one action: her eyes shift toward the matte black smartphone resting on the counter while her head, body and stirring rhythm remain almost still. The phone is never touched. The pot remains centered on the left burner above one small uniform steady blue flame and the right burner remains off. Medium waist-up shot from a forty-five-degree angle, 35mm lens, locked camera. Ten seconds.
```

## S03 — 전화 집기

- 길이: 10초 고정 생성 → 약 5초 사용
- 참조: CAST 측면 + 주방/룩 + 레인지 ON
- 시작/종료: 국자는 이미 받침 위 → 오른손으로 전화 한 대만 들어 허리 높이에 정지

```text
The wooden ladle is already resting safely on a spoon rest. CAST-A makes exactly one action: with her anatomically correct right hand, she picks up the single matte black smartphone from the counter and holds it naturally at waist height. The phone screen remains completely black. The pot continues cooking on the left burner above one small uniform steady blue flame in the background; the right burner stays off. Close right-side shot, 65mm lens, locked camera, wrists and fingers fully inside frame. Ten seconds.
```

## S04 — 문턱 안쪽까지 한 걸음

- 길이: 10초 고정 생성 → 약 5초 사용
- 참조: CAST 측면 + 주방/룩 + 레인지 ON
- 시작/종료: 전화 든 채 주방 안 → 정확히 한 걸음, 몸 전체가 주방 쪽 문턱 안에서 정지

```text
CAST-A holds the black smartphone naturally in her right hand. She turns slightly away from the stove, takes exactly one slow step from left to right toward the kitchen threshold, and stops completely with her entire body remaining on the kitchen side of the threshold. She does not cross into the hallway. The stove, pot and one small steady blue flame on the left burner remain clearly visible on the far left throughout. Wide side-profile shot, 28mm lens, locked camera. Ten seconds. No second step, no walking out of frame and no stove interaction.
```

## S05 — 나비효과 시작용 배경판

- 길이: 10초 고정 생성 → 약 7초 사용
- 참조: CAST 측면 + 주방/룩 + 레인지 ON
- 시작/종료: 어머니는 화면 오른쪽 문턱 안에 정지, 레인지는 왼쪽 ON 상태

```text
CAST-A remains completely still at the far-right kitchen threshold holding the black smartphone, with her entire body inside the kitchen. On the far left, the pot remains centered above one small steady blue flame on the left burner. The camera makes one very slow smooth lateral move that connects the pot area to the round wall clock while preserving both the woman and the lit burner in frame. Leave clean negative space through the middle of the kitchen for later motion graphics. Ten seconds. No walking, no looking down at the phone and no lighting change.
```

## S06 — 확산용 고정 와이드

- 길이: 10초 고정 생성 → 약 8초 사용
- 참조: CAST 측면 + 주방/룩 + 레인지 ON

```text
CAST-A stands completely still at the far-right kitchen threshold holding the black smartphone, with only natural breathing. Her entire body remains inside the kitchen. On the far left, the pot remains above one small steady blue flame on the left burner. Symmetrical locked wide shot, 24mm lens, with generous clean wall, floor and counter space for later motion graphics. Lighting and exposure remain constant. Ten seconds. No steam, no walking, no phone interaction and no camera movement.
```

## S07 — 깨달음

- 길이: 10초 고정 생성 → 약 6초 사용
- 참조: CAST 정면 + 주방/룩
- Flow에서는 붉은 구슬과 반사를 만들지 않는다.

```text
CAST-A stands at the kitchen threshold facing forward. She makes one subtle emotional change: her neutral distracted expression slowly becomes quietly uneasy and attentive, as if she has remembered something important. Her body remains still and her eyes focus just beyond the camera. Centered medium close-up, 50mm lens, locked camera, neutral warm kitchen light and clean foreground space on frame-left for a later graphic overlay. Ten seconds. No panic, no crying, no exaggerated fear and no colored light on her face.
```

## S08 — 불꽃을 돌아보기

- 길이: 10초 고정 생성 → 약 4초 사용
- 참조: CAST 측면 + 주방/룩 + 레인지 ON

```text
CAST-A makes exactly one controlled action: she slowly turns only her head and shoulders from right to left back toward the stove. Her feet remain planted at the kitchen threshold. Across the kitchen, the small uniform steady blue flame under the pot on the left burner is clearly visible and remains unchanged. Over-the-shoulder composition, 50mm lens, blue flame in sharp focus and CAST-A softly out of focus in the foreground, locked camera. Ten seconds. No walking and no stove interaction.
```

## S09A — 대응 손잡이 OFF 조작

- 우선순위: 안전한 정상 사용 환경에서 직접 매크로 촬영 권장
- 생성 시: 10초 고정 생성 → 약 3초 사용
- 참조: 레인지 ON. 가능하면 올바른 손잡이 종료 프레임을 별도로 지정
- 이 장면에는 공통 블록 중 불꽃 관련 문구보다 아래 지시를 우선한다.

```text
One anatomically correct adult female right hand is already gripping only the single control knob that physically corresponds to the active left burner. She makes exactly one smooth mechanical action: rotate that knob in one continuous direction to its defined stop position and hold it there. The flame and burner remain outside the frame. The exact unbranded black-glass two-burner stove geometry, exactly two knobs and their positions remain unchanged. Extreme macro close-up from slightly above, 85mm lens, locked camera, neutral warm light, physically accurate instructional realism. Ten seconds. Exactly one hand, exactly two stove knobs total, only one knob moves. No generated OFF word, letters or invented symbols; no other knob movement.
```

폐기 조건: 대응 관계가 모호함, 손가락 오류, 손잡이 수·위치 변화, 다른 손잡이 움직임. 반복 실패하면 생성하지 말고 실사 또는 검증된 ON/OFF 정지 프레임 하드컷으로 전환한다.

## S09B — 불꽃 완전 소화

- 길이: 10초 고정 생성 → 약 3초 사용
- 시작 참조: 레인지 ON / 종료 참조: 레인지 OFF

```text
The small uniform blue gas flame beneath the centered stainless steel pot on the left burner stays steady from 0.0 to 3.0 seconds, smoothly reduces and becomes completely extinguished from 3.0 to 5.0 seconds, then remains fully dark and unchanged from 5.0 to 10.0 seconds. The right burner remains off throughout. Match the exact appliance, pot, burner and camera composition of the ON and OFF references. Extreme macro close-up at burner level, 85mm lens, locked camera, neutral warm light. Ten seconds. No hand, no knob, no residual flame, no reignition, no smoke and no flame color change.
```

## S10 — 전화 뒤집어 놓기

- 길이: 10초 고정 생성 → 약 6초 사용
- 참조: CAST 정면 + 주방/룩 + 레인지 OFF

```text
Beside the fully extinguished stove, CAST-A makes exactly one calm action: she places the matte black smartphone face-down on the counter between 2.0 and 5.0 seconds and releases it. She then keeps her hand still and briefly confirms the dark burner with her eyes. Her expression is quietly relieved but restrained. The left burner remains completely dark with no flame and the right burner remains off. Medium shot, 35mm lens, locked camera, warm practical evening light. Ten seconds. No cooking continuation, no touching a knob, no phone screen and no reignition.
```

## S11 — CapCut 엔드카드

Flow 생성 금지. 5초간 직접 제작한다.

```text
두 번째 알림은 오지 않게.
자리를 뜨기 전, 가스불부터 끄세요.
```

마지막 0.5초는 완전 정지한다. KGS 로고는 공식 제공 파일과 사용 허용을 확인한 경우에만 넣는다.

## CapCut 분업

- Flow 생성 오디오는 전부 음소거한다.
- V1: Flow 영상, V2: 알림 구슬, V3: S07 붉은 반사, A1: 효과음, A2: 음악, A3: 내레이션, T1: 엔드카드.
- 구슬: `#F04444`, 불투명도 약 88%, 약한 외곽광. S05 `1→2→4`, S06 `4→12→다수`, S07 거대 1개, S10 역순 소멸.
- 구슬은 물체 표면을 따라 흐르지 않고 짧은 팝/점프 키프레임으로 이동한다. 모션블러·연무 금지.
- S08→S09A→S09B는 하드컷한다. 안전행동 구간에는 디졸브를 쓰지 않는다.
- 내레이션은 55초부터 정확히 `자리를 뜨기 전, 가스불부터 끄세요.` 한 문장만 사용한다.

## 생성본 즉시 폐기 조건

- 주황·노랑 불꽃, 오른쪽 또는 복수 화구 점화
- 인물이 문턱을 넘어 주방 밖으로 나감
- 손잡이와 화구 대응이 틀리거나 모호함
- S09B 종료 시 잔불·재점화·연기
- 레인지 구조·화구·손잡이 수 변화
- 붉은 효과가 가스·연기·불꽃처럼 보임
- 브랜드·앱 UI·읽을 수 있는 생성 문자·유명인 유사성

## 20초 선행 출력

S01 3초 + S04 5초 + S09A/B 6초 + 임시 엔드카드와 여백으로 20초 CapCut 테스트를 만든다. 한글, 외부 라이선스 오디오, 기본 전환 하나를 넣고 1080p MP4로 출력한다. 결제 요구, Pro 표식, 워터마크, 한글 깨짐 또는 재생 이상이 있으면 해당 요소를 제거하고 다시 시험한다.
