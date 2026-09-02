# 《두 번째 알림은 오지 않게》 Google Flow 제작 패키지 v1

> 최신 생성 프롬프트와 생성 게이트는 `production/flow/second-alert-flow-prompts-v2.md`를 우선한다.

작성일: 2026-08-22

## 제작 원칙

- 생성 영상은 `인물·주방·가스불·카메라 움직임`을 담당한다.
- 알림 배지, 숫자, 모든 한글, 엔드카드는 CapCut에서 직접 만든다.
- 프롬프트마다 한 가지 핵심 행동만 지시한다.
- S09A 손잡이 조작과 S09B 불꽃 소화는 안전 의미가 틀리면 반드시 재생성한다.
- 유명 캐릭터·브랜드·작가 스타일을 참조하지 않는다.

## 고정 핸들

| 핸들 | 내용 |
|---|---|
| `CAST-A` | 30대 후반~40대 초반 한국인 여성 어머니, 낮게 묶은 검은 머리, 크림색 셔츠, 남색 앞치마 |
| `ENV-K1` | 아이보리·오크의 소형 한국 아파트 주방, 저녁 조명 |
| `PROP-G1` | 검은 2구 가스레인지, 앞 왼쪽 화구만 사용 |
| `PROP-P1` | 스테인리스 냄비, 잔잔히 끓는 맑은 국 |
| `PROP-M1` | 로고·글자 없는 검은 스마트폰 |
| `FX-N1` | CapCut에서 추가하는 코랄 레드 원형 알림 구슬 |

## 먼저 만들 참조 이미지 4장

1. `production/references/엄마-정면-참조-v2.png`: 생성·승인 완료. 최신 신원 기준.
2. `production/references/엄마-측면-참조-v2.png`: 생성·승인 완료. 최신 측면 기준.
3. `production/references/REF-ENV-K1-wide-v1.png`: 생성·조건부 승인 완료.
4. `production/references/가스레인지-불켜짐-근접-v1.png`: 생성·승인 완료.
5. `production/references/가스레인지-불꺼짐-근접-v1.png`: 생성·승인 완료.

세부 QA와 프롬프트 기록은 `production/references/reference-manifest-v1.md`를 따른다.

참조 이미지는 프로젝트 자체 생성물만 사용하고 생성일·프롬프트·도구를 로그에 기록한다.

## 공통 프롬프트 블록

아래 내용을 각 쇼트 프롬프트 끝에 동일하게 유지한다.

```text
cinematic grounded realism, contemporary Korean apartment, warm natural practical lighting, restrained acting, physically accurate kitchen geometry, stable identity and wardrobe, 16:9, 24fps feeling, no dialogue, no music, clean production design, no logos, no readable text, no watermark, no cartoon style, no explosion, no fire accident, no smoke, no child, no extra person, no duplicated objects, no malformed hands, no warped stove, no extra burners
```

## 쇼트별 Flow 프롬프트 초안

프롬프트 순서: 주체 → 단일 행동 → 장소 → 카메라 → 조명 → 스타일 → 오디오 → 시간 → 제외.

### S01 — 진동과 불꽃

- 권장 모델: Veo Lite 4초 테스트 → Fast 4초 후보.
- 참조: `REF-ENV-K1-wide`, `REF-PROP-G1`.

```text
A matte black unbranded smartphone resting on the right side of a kitchen counter makes one subtle vibration while a small steady blue gas flame is visible beneath a stainless steel pot in the lower-left background, inside ENV-K1, extreme macro close-up with shallow depth of field and a very slow three-centimeter push-in, warm 3200K kitchen light with cool blue evening bokeh, cinematic grounded realism, original location sound only with one soft phone vibration and quiet gas flame, four seconds, no screen content, no notification icon, no readable text, no overflowing pot, no smoke, no orange flame, no hand, no logo, no watermark
```

### S02 — 시선 이동

- 권장 모델: Omni 6초 또는 Fast 6초.
- 참조: `REF-CAST-A-front`, `REF-CAST-A-side`, `REF-ENV-K1-wide`.

```text
CAST-A gently stirs a stainless steel pot on the front-left burner and then only shifts their eyes toward a phone resting on the counter, inside ENV-K1, medium waist-up shot from forty-five degrees with a locked camera, warm practical kitchen light and cool evening window fill, cinematic grounded realism and restrained everyday acting, quiet room tone and a single distant vibration, six seconds, keep the pot centered on one steady small blue flame, no reaching for the phone, no dialogue, no readable text, no smoke, no extra person, no warped hands or stove
```

### S03 — 전화 집기

- 권장 모델: Omni 6초.
- 참조: `REF-CAST-A-side`, `REF-ENV-K1-wide`, `REF-PROP-G1`.

```text
CAST-A sets a wooden ladle safely on a spoon rest and lifts one matte black unbranded smartphone with the right hand, inside ENV-K1, close shot of hands and counter from the right side, warm practical light, cinematic grounded realism, subtle cloth and object sounds only, six seconds, one continuous simple action, phone screen blank and dark, pot remains on the steady blue front-left gas flame in the background, no text, no icon, no spill, no smoke, no deformed fingers, no extra hand
```

### S04 — 한 걸음

- 권장 모델: Fast 6초.
- 참조: `REF-CAST-A-side`, `REF-ENV-K1-wide`.

```text
CAST-A holding the black phone turns their shoulders away from the stove and takes exactly one slow step toward the kitchen threshold, inside ENV-K1, wide side profile with the stove and steady blue flame remaining clearly visible deep in frame, warm evening light, cinematic grounded realism, one footstep and quiet kitchen ambience only, six seconds, stop at the threshold, do not leave the kitchen, do not touch the stove, no text, no smoke, no accident, no extra person, no malformed body
```

### S05 — 증식용 배경판

- 권장 모델: Fast 8초. `FX-N1`은 후편집.
- 참조: `REF-ENV-K1-wide`, `REF-PROP-G1`.

```text
An empty visual path travels from the stainless pot handle to the round wall clock as the camera performs one slow smooth lateral track across ENV-K1, no person in frame, the pot continues gently simmering on one small steady blue front-left gas flame, warm kitchen light gradually becoming slightly cooler but remaining realistic, cinematic grounded realism, quiet ticking clock and kitchen room tone only, eight seconds, leave clean negative space for later motion graphics, no glowing object, no text, no smoke, no orange flame, no changing appliance geometry
```

### S06 — 확산용 와이드 배경판

- 권장 모델: Fast 8초.
- 참조: `REF-CAST-A-side`, `REF-ENV-K1-wide`.

```text
CAST-A stands still at the kitchen threshold holding a black phone while the pot continues gently simmering on one steady blue flame behind them, inside ENV-K1, symmetrical locked wide shot with generous clean wall and counter surfaces for later graphics, practical warm light with a subtle slow decrease in brightness, cinematic grounded realism, ticking clock and low room tone only, eight seconds, no movement except natural breathing and subtle steam, no text, no smoke, no accident, no extra person, no warped stove or hands
```

### S07 — 거대 알림 앞 정지

- 권장 모델: Omni 6초. 거대 원은 후편집.
- 참조: `REF-CAST-A-front`, `REF-ENV-K1-wide`.

```text
CAST-A stops at the kitchen threshold and looks forward with a subtle uneasy expression as soft coral-red light from an unseen circular source grows across their face, inside ENV-K1, centered medium frontal shot with a locked camera and clean foreground space, warm practical light mixed with restrained coral reflection, cinematic grounded realism, a rising abstract tone that cuts to silence, six seconds, no visible graphic object, no dialogue, no text, no smoke, no flame near the person, no panic, no extra person, stable face and hands
```

### S08 — 뒤돌아보기

- 권장 모델: Omni 4초.
- 참조: `REF-CAST-A-side`, `REF-ENV-K1-wide`, `REF-PROP-G1`.

```text
CAST-A slowly turns their head and shoulders back toward the clearly visible steady blue gas flame under the stainless pot, inside ENV-K1, over-the-shoulder shot with the flame in sharp focus and the person softly out of focus, warm kitchen light returning, cinematic grounded realism, one soft breath and a single heartbeat only, four seconds, no walking, no stove interaction, no text, no smoke, no orange flame, no extra person
```

### S09A — OFF 조작

- 권장 방식: 가능하면 직접 실사 촬영. Flow 사용 시 Omni 4초로 테스트하고 프레임 단위 검수.
- 참조: `REF-PROP-G1`.

```text
One anatomically correct adult right hand rotates only the front-left control knob of PROP-G1 smoothly to the clearly defined OFF stop, extreme macro close-up from slightly above, neutral warm kitchen light, physically accurate instructional realism, clean mechanical click only, four seconds, exactly one hand and one knob movement, no other knob moves, no readable text except a simple OFF marker shape, no flame visible in this shot, no warped appliance, no extra fingers, no sudden cut
```

### S09B — 불꽃 완전 소화

- 권장 방식: 가능하면 직접 실사 촬영. Flow 사용 시 Fast 4초.
- 참조: `REF-PROP-G1`.

```text
A small stable blue gas flame beneath the centered stainless pot smoothly reduces and becomes completely extinguished, extreme macro view of only the front-left burner, neutral warm kitchen light, physically accurate instructional realism, one soft extinguishing sound, four seconds, finish with a fully dark burner and absolutely no residual flame, no hand, no smoke, no orange flame, no reignition, no warped burner, no extra burner
```

### S10 — 평온 복귀

- 권장 모델: Omni 6초.
- 참조: `REF-CAST-A-front`, `REF-ENV-K1-wide`, `REF-PROP-G1` OFF 상태 참조.

```text
CAST-A places the black smartphone face down on the counter and remains beside the now fully extinguished stove, inside ENV-K1, calm medium shot with a locked camera, warm practical evening light restored, cinematic grounded realism and a subtle relieved expression, gentle room tone only, six seconds, burner fully off with no flame, no cooking continuation, no text, no notification icon, no smoke, no extra person, stable identity and hands
```

## CapCut 합성 지시

- 알림 구슬: 기본 원형 도형을 코랄 레드로 만들고 외곽광 10~15%, 불투명도 88%.
- 증식: S05에서 1→2→4, S06에서 4→12→다수. 크기보다 개수를 먼저 늘린다.
- S07: 화면 앞 거대 원을 120% 크기로 놓되 인물 얼굴 전체를 가리지 않는다.
- 소멸: S10에서 큰 원부터 작은 원 순서로 6프레임 간격 축소·페이드.
- 글자: 마지막 엔드카드에만 사용. 본문 쇼트에는 숫자·문자 없음.
- 사운드: 실제 앱 알림음을 복제하지 않고 직접 만든 짧은 두 음을 변주한다.

## 크레딧 계획

| 단계 | 범위 | 예상 크레딧 |
|---|---|---:|
| 참조 이미지·룩 테스트 | 캐릭터·주방·가스레인지 | 60~100 |
| Lite 동작 테스트 | S01, S04, S09 | 30~60 |
| 본 생성 1차 | 10개 영상 쇼트 | 170~240 |
| 재생성 | 안전·인물·연속성 오류 4~6회 | 80~160 |
| 핵심 쇼트 보강 | 필요 시 S07 또는 S09 1개 | 40~100 |
| 합계 |  | **380~660** |

- 현재 실제 Flow 잔여 크레딧이 없으므로 감당 가능성은 `TBD`다.
- 400 미만이면 S05·S06을 정지 이미지와 CapCut 패럴랙스로 대체한다.
- Quality는 기본 계획에서 사용하지 않는다. 반드시 필요한 대표 쇼트 한 개만 승인 후 사용한다.

## 생성 로그 필수 필드

`production/templates/flow-generation-log.md`에 다음을 매번 기록한다.

- 장면 ID와 후보 번호
- 실제 프롬프트
- 사용 모델과 길이
- 참조 이미지 파일명
- 생성일과 실제 차감 크레딧
- 채택·보류·폐기
- 폐기 사유: 인물, 손, 가스레인지, 불꽃, 안전의미, 카메라, 문자오류 중 선택
- CapCut에서 수행한 합성·속도·색·사운드 변경

## 제작 시작 전 체크

- Flow 화면에서 실제 잔여 크레딧 확인.
- 현재 모델별 차감액 재확인.
- `REF-PROP-G1`의 손잡이 OFF/ON 상태를 각각 별도 저장.
- S09 실사 촬영 가능 여부 결정. 실제 가스기기 촬영 시 안전하게 정상 사용하며 조작을 반복하지 않는다.
- 엔드카드 로고 사용 허용 범위 확인.
