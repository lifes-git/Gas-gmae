# Flow 캐릭터 생성·설정 프롬프트 — 아빠와 16세 딸

작성일: 2026-08-24  
작품: 《두 번째 알림은 오지 않게》

## 공통 설정 원칙

- 캐릭터 이름은 각각 `아빠`, `딸`로 저장한다.
- 얼굴 생성은 `세로 모드`, 전신·의상 고정은 `신체 만들기`에서 진행한다.
- 캐릭터 이미지에는 배경 장소, 휴대전화, 경고 화면, 가스기기, 장면 감정을 넣지 않는다.
- 얼굴 1장과 전신 1장만 최종 기준으로 남긴다.
- 본편은 무대사이므로 음성은 선택하지 않는다. 저장에 필수라면 임시 프리셋을 고르되 영상에서 호출하지 않는다.
- 아래 영어 프롬프트는 이미지 생성 칸, 한국어 문구는 `캐릭터 정보`와 `신체 만들기` 칸에 사용한다.

---

# 1. 아빠

## A. 세로 모드 — 얼굴 생성 프롬프트

```text
Create a highly consistent cinematic character portrait of an ordinary Korean father in his early forties. He has a natural oval face, short neatly trimmed black hair with a subtle side part, realistic warm medium skin tone, calm dark-brown eyes, straight natural eyebrows, a medium nose, and a gentle but restrained neutral expression. He looks like a believable office worker and family man, not a fashion model, celebrity, executive, or actor. Show his head, shoulders, and upper chest in a three-quarter front view, looking slightly past the camera. Soft even studio lighting, plain neutral warm-gray background, realistic skin texture, grounded Korean commercial-film casting photography, 50mm portrait-lens feeling, horizontal 16:9 composition with generous clean space. Completely plain white crew-neck shirt visible at the shoulders. No smile with teeth, no dramatic emotion, no facial hair, no glasses, no tie, no jewelry, no badge, no logo, no readable text, no phone, no prop, no extra person, no famous-person resemblance, no beauty-filter skin, no cartoon style, no watermark.
```

### 얼굴 채택 기준

- 40대 초반으로 보이고 지나치게 젊거나 노년으로 보이지 않는다.
- 유명 배우·광고모델처럼 보이지 않는 평범하고 신뢰감 있는 인상이다.
- 머리 모양과 가르마가 단순해 측면에서도 유지하기 쉽다.
- 수염·안경·액세서리·강한 주름처럼 쇼트마다 흔들릴 요소가 없다.
- 정면과 3/4 방향에서 눈·코·턱 구조가 자연스럽다.

## B. 신체 만들기 — 입력 프롬프트

```text
승인된 얼굴과 짧고 단정한 검은 머리를 정확히 유지한다. 40대 초반 한국인 남성, 평균 키, 현실적인 보통 체형, 지나치게 마르거나 근육질이 아닌 자연스러운 직장인 체형. 어깨는 평균 너비이며 자세는 곧지만 약간의 퇴근 피로가 느껴지는 편안한 중립 자세다. 로고와 무늬가 전혀 없는 차콜색 가벼운 비즈니스 재킷, 완전히 무지인 흰색 크루넥 셔츠, 짙은 회색 일자 바지, 단순한 검은 구두를 착용한다. 장식과 브랜드가 없는 검은 출근가방 하나를 왼손에 자연스럽게 든다. 오른팔은 몸 옆에 편안히 두고 양손과 손가락이 모두 분명하고 자연스럽게 보인다. 정면에서 약간 돌아선 3/4 전신, 발끝까지 화면 안에 포함한다. 단순한 중성 회색 스튜디오 배경, 고르고 부드러운 조명, 현실적인 상업영화 캐릭터 기준 이미지. 넥타이, 사원증, 벨트 로고, 시계, 반지, 안경, 휴대전화, 회사 배경, 엘리베이터, 글자, 추가 인물, 과장된 모델 포즈 없음.
```

## C. 캐릭터 정보 — 입력 문구

```text
가족과 함께 저녁을 먹기 위해 퇴근하는 평범한 40대 초반 한국인 아버지. 행동과 표정은 절제되고 현실적이며 카메라를 의식하지 않는다. 평상시에는 조금 피곤하지만 차분하고 따뜻한 인상이다. 예상하지 못한 알림을 보면 휴대전화를 내려다보고 동작이 조용히 멈추며, 소리치거나 입을 벌리거나 과장된 공포 표정을 짓지 않는다. 모든 장면에서 짧고 단정한 검은 머리, 차콜색 재킷, 무지 흰색 크루넥 셔츠, 짙은 회색 바지, 검은 구두와 왼손의 검은 출근가방을 유지한다. 오른손은 엘리베이터 버튼을 누르거나 휴대전화를 드는 데 사용한다. 대사, 립싱크, 카메라를 향한 미소나 직접 시선은 사용하지 않는다.
```

## D. 음성 설정

- 권장: `선택하지 않음`.
- 저장에 음성이 필수라면 목록에서 `Male, friendly, mid pitch` 계열의 자연스러운 음성을 임시로 선택한다.
- 샘플 대화와 성능 조절 문구는 입력하지 않는다.
- 영상 프롬프트에 음성 이름을 호출하지 않고 `No dialogue, no lip movement`를 항상 넣는다.

## E. 캐릭터 완성 후 테스트 프롬프트

### 테스트 1 — 엘리베이터 홀 대기 자세

```text
@아빠 stands naturally in an ordinary Korean apartment elevator waiting hall, holding exactly one unbranded black work bag in his left hand. His face, shoulders, torso and feet all point toward the closed elevator doors while he waits quietly. Preserve his exact face, short side-parted black hair, body proportions, charcoal jacket, plain white crew-neck shirt, dark-gray trousers and black shoes. Medium-wide rear three-quarter shot from behind his left shoulder, eye-level 35mm lens, soft warm ceiling light, cinematic grounded realism. No phone, no button press, no dialogue, no lip movement, no smile to camera, no extra person, no visible mirror reflection, no readable floor number, no logo, no readable notice.
```

### 테스트 2 — 휴대전화 시선 이동

```text
@아빠 stands in the same apartment elevator hall with the black work bag fixed in his left hand and his body still oriented toward the closed doors. One dark-gray-cased unbranded smartphone is already held below chest height in his anatomically correct right hand with a completely blank black screen. He performs exactly one action: lowers only his gaze from the elevator doors to the phone and then becomes completely still. Preserve his exact identity, face, hair, body proportions and wardrobe. Match the previous rear three-quarter camera axis, use a 50mm medium close shot and keep the camera locked. No screen light, no text, no icon, no tapping, no phone vibration, no red light, no panic, no dialogue, no lip movement, no extra person, no visible mirror reflection, no malformed hands.
```

### 아빠 통과 조건

- 두 테스트에서 같은 얼굴·머리·재킷으로 보인다.
- 출근가방은 두 테스트 모두 왼손에 있다.
- 휴대전화는 테스트 2에서만 오른손에 있다.
- 알림을 본 표정이 공포 연기가 아니라 조용한 걱정으로 보인다.

---

# 2. 16세 딸

## A. 세로 모드 — 얼굴 생성 프롬프트

```text
Create a highly consistent cinematic character portrait of an ordinary sixteen-year-old Korean daughter returning home after school. She has a natural youthful oval face, straight dark eyebrows, calm dark-brown eyes, a small natural nose, realistic warm medium skin tone, and a quiet neutral expression appropriate for a teenager. Her straight black hair is cut just below the shoulders and tied in one low simple ponytail, with no bangs covering the eyes. She looks unmistakably like a normal sixteen-year-old student, not an adult model, child actor, celebrity, idol, or fashion influencer. Show her head, shoulders, and upper chest in a three-quarter front view, looking slightly past the camera. Soft even studio lighting, plain neutral warm-gray background, realistic skin texture, grounded Korean commercial-film casting photography, 50mm portrait-lens feeling. A completely plain white school shirt and dark-navy V-neck knitted vest are visible at the shoulders. No makeup glamour, no smile with teeth, no school emblem, no uniform insignia, no tie, no ribbon, no earrings, no necklace, no logo, no readable text, no phone, no prop, no extra person, no famous-person resemblance, no beauty-filter skin, no cartoon style, no watermark.
```

### 얼굴 채택 기준

- 성인이 아니라 16세 청소년으로 자연스럽게 보인다.
- 아이돌·연예인·패션모델과 닮지 않은 평범한 얼굴이다.
- 낮은 포니테일과 눈을 가리지 않는 단순한 머리가 유지된다.
- 화장·귀걸이·교복 문장 같은 불필요한 변수가 없다.
- 두 눈과 턱선이 비대칭으로 무너지지 않는다.

## B. 신체 만들기 — 입력 프롬프트

```text
승인된 16세 한국인 딸의 얼굴과 어깨 아래 길이의 검은 머리를 하나의 낮은 포니테일로 묶은 모습을 정확히 유지한다. 또래 평균 키, 자연스러운 마른 보통 체형, 성인 모델처럼 과장되지 않은 현실적인 청소년 체형. 특정 학교를 나타내지 않는 완전히 무지인 흰색 긴팔 셔츠, 짙은 남색 V넥 니트 조끼, 짙은 차콜색 일자형 교복 바지, 단순한 회색 운동화를 착용한다. 장식·문장·로고가 전혀 없는 남색 백팩 하나를 양쪽 어깨에 바르게 멘다. 양팔은 몸 옆에 편안히 두고 양손과 손가락이 모두 자연스럽게 보인다. 정면에서 약간 돌아선 3/4 전신, 발끝까지 화면 안에 포함한다. 단순한 중성 회색 스튜디오 배경과 고르고 부드러운 조명, 현실적인 상업영화 캐릭터 기준 이미지. 교표, 이름표, 넥타이, 리본, 치마, 문양, 휴대전화, 화려한 액세서리, 성인처럼 보이는 화장, 학교 배경, 추가 인물, 과장된 포즈 없음.
```

## C. 캐릭터 정보 — 입력 문구

```text
저녁 보충수업을 마치고 가족과 저녁을 먹기 위해 집으로 돌아가는 평범한 16세 한국인 딸. 행동은 자연스럽고 절제되어 있으며 평소 스마트폰에 몰입해 걷지 않는다. 귀가할 때는 남색 백팩을 양쪽 어깨에 메고 가볍고 평범한 걸음으로 이동한다. 예상하지 못한 알림을 보면 휴대전화를 내려다본 채 발걸음만 조용히 멈추며, 울거나 소리치거나 입을 벌리거나 과장된 공포 표정을 짓지 않는다. 모든 장면에서 낮은 검은 포니테일, 무지 흰색 긴팔 셔츠, 짙은 남색 V넥 니트 조끼, 짙은 차콜색 교복 바지, 회색 운동화와 양쪽 어깨의 남색 백팩을 유지한다. 가스기기, 화재 대응기기, 엘리베이터 설비를 조작하지 않는다. 대사, 립싱크, 카메라를 향한 직접 시선은 사용하지 않는다.
```

## D. 음성 설정

- 권장: `선택하지 않음`.
- 저장에 음성이 필수라면 `Female, soft, mid pitch` 또는 `Female, friendly, mid pitch` 중 성인처럼 무겁지 않고 과도하게 밝지 않은 음성을 임시 선택한다.
- 샘플 대화와 성능 조절 문구는 입력하지 않는다.
- 영상 프롬프트에는 `No dialogue, no lip movement`를 유지한다.

## E. 캐릭터 완성 후 테스트 프롬프트

### 테스트 1 — 방과 후 출입구

```text
@딸 stands naturally just outside an open, unbranded Korean high-school pedestrian gate at blue hour after evening supplementary study, with the navy backpack worn correctly on both shoulders. A guard booth and softly lit classroom building remain in the background. She looks toward the route home and remains still. Preserve her exact sixteen-year-old face, low black ponytail, body proportions, plain white school shirt, dark-navy V-neck knitted vest, dark-charcoal uniform trousers, gray sneakers and backpack. Medium three-quarter shot, locked camera, cool evening exterior with warm classroom windows, cinematic grounded realism. No phone, no dialogue, no lip movement, no smile to camera, no crowd, no school name, no emblem, no tie, no ribbon, no logo, no readable text.
```

### 테스트 2 — 휴대전화 시선 이동

```text
@딸 stands in the same position outside the same Korean high-school pedestrian gate with the navy backpack fixed on both shoulders. One navy-cased unbranded smartphone is already held below chest height in both anatomically correct hands with a completely blank black screen. She performs exactly one action: lowers only her gaze to the phone and quietly stops her intended walk home. Preserve her exact sixteen-year-old identity, face, low ponytail, body proportions, wardrobe, gate pillars and softly focused classroom building. Medium close shot, 65mm lens feeling, locked camera, restrained natural acting. No screen light, no text, no icon, no tapping, no phone vibration, no red light, no crying, no panic, no dialogue, no lip movement, no extra person, no malformed hands.
```

### 딸 통과 조건

- 두 테스트에서 같은 16세 청소년으로 보인다.
- 머리는 두 쇼트 모두 낮은 포니테일이다.
- 흰 셔츠·남색 니트 조끼·차콜 교복 바지·백팩의 색과 형태가 동일하다.
- 백팩은 항상 양쪽 어깨에 있고 휴대전화는 테스트 2에만 등장한다.
- 알림 반응은 울음이나 공포가 아니라 조용히 멈추는 정도다.

---

# 3. 실제 본편에서 호출하는 형식

## 아빠 F03

```text
@아빠 stands on the right third of @ENV-E1 with the unbranded black work bag hanging naturally from his left hand and one blank-screen phone lowered in his right hand. His face, shoulders, torso and feet remain oriented toward the closed elevator doors. He performs exactly one action: shifts his weight slightly while continuing to wait and look at the doors. Preserve his exact face, hair, body proportions and wardrobe. Medium-wide rear three-quarter shot from behind his left shoulder, eye-level 35mm lens, one extremely slow three-to-five-percent physical dolly-in. No digital zoom, no button press, no phone interaction, no dialogue, no lip movement, no readable floor number, no visible mirror reflection, no extra person.
```

## 아빠 F07

```text
@아빠 stands in the exact same elevator-hall position, door-facing orientation and wardrobe established in F03. A dark-gray-cased unbranded smartphone is held below chest height in his right hand with a completely blank black screen, while the black work bag remains fixed in his left hand. He performs exactly one action: lowers only his gaze from the closed doors to the phone and becomes completely still with quiet concern. Preserve his exact identity. Match the F03 rear three-quarter camera axis, use a 50mm medium close shot and keep the camera locked. No screen light, no text, no icon, no red light, no tapping, no panic, no dialogue, no lip movement, no door movement, no visible mirror reflection.
```

## 딸 F04

```text
@딸 is already walking slowly from inside the open pedestrian gate of @ENV-S1 toward the sidewalk while remaining within the central sixty percent of the frame. The navy backpack stays on both shoulders and one blank-screen phone remains lowered in her right hand without being viewed. She performs exactly one continuous action: takes only one to two small natural steps and remains in motion through the final frame. Preserve her exact saved sixteen-year-old face, eyes, nose, lips, jawline, skin tone, youthful proportions, low ponytail, school uniform and backpack. Her clearly visible face stays in one stable three-quarter view toward her walking direction. Medium full shot from head to below the knees, eye-level 50mm lens, locked camera. Keep the school gate recognizable but slightly out of focus. Begin after she is already moving and cut on an active stride. No wide-angle distortion, no fast walking, no slowing down, no pause, no stop, no posing, no head turn, no head bobbing, no face morphing, no running, no crowd, no dialogue, no lip movement, no looking at the phone, no looking at camera, no readable text.
```

## 딸 F08

```text
@딸 begins already walking at the same ordinary pace and direction established in F04 outside the same school gate. A navy-cased unbranded smartphone remains low in her right hand with a completely blank black screen. She performs exactly one continuous reaction: lowers her gaze to the phone, shortens her next step and comes to a quiet complete stop. Preserve her exact identity, low ponytail, backpack position and school uniform. Medium close three-quarter shot, locked camera. No screen light, no generated text, no icon, no red light, no tapping, no crying, no panic, no dialogue, no lip movement, no extra person.
```

휴대전화의 `우리 집 화재 감지` 문구, 붉은 배지와 경고광은 위 영상 생성 프롬프트에 넣지 않고 CapCut에서 합성한다.
