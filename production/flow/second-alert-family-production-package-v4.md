# 《두 번째 알림은 오지 않게》 가족 서사 Flow 제작 패키지 v4

작성일: 2026-08-24  
상태: 사용자 승인 서사 + 전문 Flow 감독·연속성 감독·가스안전 검수 반영  
목표: Google Flow 캐릭터 `@엄마`, `@아빠`, `@딸`과 승인 레퍼런스로 60초 영상 생성

## 1. 최종 결정

- **Go 조건부 승인:** 아래 미래 표현과 안전 쇼트 기준을 지킬 때 제작한다.
- 첫 장면은 완성된 식탁이 아니라 `마지막 국·찌개를 조리 중인 엄마 + 거실 협탁 알림`이다.
- 아빠와 딸의 화재감지 알림은 실제 현재 화재가 아니라 엄마가 순간적으로 보는 **가능한 미래**다.
- 엄마는 주방을 떠나기 전에 `손잡이 OFF → 파란 불꽃 완전 소화 확인 → 휴대전화 확인` 순서를 지킨다.
- 실제 화재·연기·폭발·대피·소방차는 보여주지 않는다.
- 후편집은 고정 PNG 2개, 기본 하드컷·디졸브와 최소 음향만 사용한다. 휴대전화 추적, 마스크 애니메이션, 복잡한 색보정은 하지 않는다.
- 생성 영상은 무대사이며 최종 오디오는 편집에서 교체한다.

## 2. 사실·추론·창작 가설

### 확인된 사실

- `GS-COOK-01`: 가스레인지로 조리하는 동안 자리를 뜨지 않는다. 자리를 떠나야 한다면 가스불을 먼저 끈다.
- 공식 근거: 소방청 안내 https://www.korea.kr/policy/civilView.do?newsId=156678241
- 허용 표현: 알림에 반응하기 전 불을 끄기, OFF 조작과 불꽃 완전 소화.
- 금지 표현: 약불이면 자리를 비워도 된다는 암시, 모든 조리 화재를 가스사고로 단정, 물을 이용한 기름화재 진압.

### 제작상 추론

- 귀가 중인 아빠와 딸을 경고 전에 보여주면 가족관계와 `함께할 저녁`의 목적이 대사 없이 읽힌다.
- 초기 식탁을 미완성 상태로 두고 결말에 완성하면 조리 중이라는 인과와 감정적 보상이 동시에 선명해진다.
- 전화 UI를 후편집하면 생성 문자 오류와 실제 앱·재난문자 오인을 줄일 수 있다.

### 창작 가설

- 엄마가 평범한 휴대전화 알림을 확인하려는 찰나, 화면에 나타난 중립적인 잠금화면형 알림 카드가 코랄색 미래 화재감지 경고로 인과적으로 이어진다.
- 미래는 고정 코랄 경고 카드와 완성되지 못한 빈 식탁으로 구분하며 실제 사고를 재현하지 않는다.
- 미래 장면이 코랄 화재경고 카드 안으로 접히며 선택 직전 현실로 복귀한다.

## 3. 승인 레퍼런스

아래 `Flow 자산명`은 이미지 파일에서 `.png`만 뺀 이름과 완전히 같다. Flow에 업로드할 때 임의의 영어 약칭으로 바꾸지 않는다. 각 쇼트의 `Ingredients`와 본문에서도 같은 한국어 자산명을 사용한다.

| Flow 자산명 | 파일 | 상태·용도 |
|---|---|---|
| `아파트-엘리베이터홀-저녁-v1` | `production/references/아파트-엘리베이터홀-저녁-v1.png` | 승인. 아파트 1층의 닫힌 승강기 문, 왼쪽 게시판, 오른쪽 세로 거울과 대기 공간. 게시물·층수·식별 문자 없음 |
| `고등학교-정문-푸른저녁-v1` | `production/references/고등학교-정문-푸른저녁-v1.png` | 승인. 열린 보행자 교문, 경비실·자전거 거치대·불 켜진 교사동이 보이는 푸른 저녁의 고등학교 정문. 학교명·교표·식별 문자 없음 |
| `가스레인지-불켜짐-근접-v1` | `production/references/가스레인지-불켜짐-근접-v1.png` | 승인. 왼쪽 화구만 작은 파란불 |
| `가스레인지-불꺼짐-근접-v1` | `production/references/가스레인지-불꺼짐-근접-v1.png` | 승인. 같은 레인지와 냄비, 양쪽 화구 완전 OFF |

### Flow 업로드 순서

1. 위 6장을 프로젝트 Assets에 업로드한다.
2. 파일명과 동일하게 자산명을 지정한다.
3. 캐릭터 `@엄마`, `@아빠`, `@딸`이 같은 프로젝트에 있는지 확인한다.
4. 캐릭터 의상은 생성한 캐릭터 설정을 그대로 사용한다.
5. 영상 생성 전 Flow 화면에서 실제 모델·길이·크레딧을 재확인한다.

### 장면별 시작 이미지

새 집 구조를 반영한 시작 이미지는 `production/start-frames/`에 있으며 전체 목록과 재사용 관계는 `production/start-frames/start-frame-manifest-v1.md`를 따른다. Flow에서는 환경 레퍼런스만으로 새 구도를 다시 만들지 말고 아래 시작 이미지를 우선 사용한다.

| 장면 | Flow 시작 이미지 |
|---|---|
| S01 | `candidates/S01-마지막조리-알림전-후보-v2.png` |
| S02 | `S02-엘리베이터홀-아빠대기-v1.png` |
| S03 | `S03-학교정문-딸귀가-v1.png` |
| S04A·S10 | `candidates/S04A-주방에서-거실로-이동시작-후보-v3.png` |
| S04B | `S04B-협탁앞-전화집기전-v1.png` |
| S07 | `S07-미완성빈식탁-가스불켜짐-v1.png` — 영상 생성 없이 정지 사용 |
| S08 | `S08-미완성식탁-불꽃인지-v1.png` |
| S12 | `S12-불끈뒤-전화확인전-v1.png` |
| S13 | `S13-가족의완성된저녁-v1.png` — 영상 생성 없이 정지 사용 |

## 4. 60초 편집 구조

아래 표는 완성본에 배치되는 **편집 순서**다. Flow에서는 이 번호 순서대로 생성하지 말고, 바로 다음의 `4-1. 실제 Flow 생성 순서`를 따른다.

| ID | 시간 | 길이 | 내용 | 제작 방식 |
|---|---:|---:|---|---|
| S01 | 0:00–0:06 | 6초 | 엄마가 마지막 국을 젓다가 화면 밖의 짧은 휴대전화 알림에 시선 이동 | Flow Omni/Fast + 잠금화면형 알림 카드 합성 |
| S02 | 0:06–0:09 | 3초 | 아빠가 아파트 1층 엘리베이터 홀에서 문을 바라보며 대기 | Flow Fast/Omni |
| S03 | 0:09–0:12 | 3초 | 딸이 방과 후 출입구를 나옴 | Flow Fast/Omni |
| S04A | 0:12–0:15 | 3초 | 엄마가 켜진 불을 두고 협탁 전화 쪽으로 이동 | Flow Omni |
| S04B | 0:15–0:18 | 3초 | 엄마가 전화를 든 뒤 코랄 미래 경고가 나타남 | Flow Omni + 고정 카드 합성 |
| S05 | 0:18–0:23 | 5초 | 미래: 아빠가 전화 화면을 보고 멈춤 | Flow Omni + UI 합성 |
| S06 | 0:23–0:28 | 5초 | 미래: 딸이 전화 화면을 보고 멈춤 | Flow Omni + UI 합성 |
| S07 | 0:28–0:33 | 5초 | 미래: 완성되지 못한 세 사람의 식탁 | S07 시작 이미지 정지 |
| S08 | 0:33–0:37 | 4초 | 엄마가 미완성 식탁에서 켜진 불을 돌아봄 | Flow Omni 또는 정지 2장 |
| S09 | 0:37–0:40 | 3초 | 가능한 미래에서 선택 직전 현실로 복귀 | 정지 프레임 + 기본 디졸브 |
| S10 | 0:40–0:44 | 4초 | 선택 직전 현실, 엄마가 문턱 앞에서 발을 멈춤 | S04A 시작 프레임 재사용 또는 Flow |
| S11A | 0:44–0:47 | 3초 | 대응 손잡이를 OFF 끝까지 돌림 | 직접 매크로 촬영 우선 / 엄격 Flow |
| S11B | 0:47–0:49 | 2초 | 파란 불꽃 완전 소화 | 직접 매크로 촬영 우선 / ON→OFF Flow |
| S12 | 0:49–0:52 | 3초 | 엄마가 불을 끈 뒤 같은 휴대전화 알림을 안전하게 확인 | Flow Omni |
| S13 | 0:52–0:55 | 3초 | 시간 생략 후 가족의 완성된 저녁 | Flow 정지 이미지 + 미세 확대 |
| S14 | 0:55–1:00 | 5초 | 엔드카드 | CapCut 전용 |

### 4-1. 실제 Flow 생성 순서

`⇒`는 같은 상태만 이어받는 연결이고, `→`는 앞 쇼트의 채택 프레임을 다음 쇼트의 시작 기준으로 직접 전달하는 연결이다.

| 생성 순번 | 체인 | 이 순서로 작업 | 전달 방법 |
|---:|---|---|---|
| 1 | 엄마·잘못된 선택 | `S01 ⇒ S04A ⇒ S04B` | 세 쇼트는 같은 엄마·집·조명·불꽃 ON 상태를 유지한다. S01에서는 거실과 전화를 숨기고 화면 오른쪽의 잠금화면형 알림 카드로만 암시하며, S04A에서 협탁의 실제 전화를 처음 공개한다. S01→S04A의 스토브-문턱 이동과 S04A→S04B의 문턱-협탁 이동 일부는 삽입 컷과 동작 중 컷으로 생략한다. 마지막 프레임을 그대로 시작 프레임으로 쓰지 말고 인물 방향·조명·소품 상태만 전달한다. |
| 2 | 아빠·알림 이전과 이후 | `S02 → S05` | S02 채택본 마지막 프레임을 S05 시작 기준으로 사용한다. 위치·몸 방향·가방·전화·카메라 축을 고정한다. |
| 3 | 딸·알림 이전과 이후 | `S03 → S06` | S03에서 얼굴이 가장 안정적인 보행 프레임을 S06 시작 기준으로 사용한다. 같은 보행 방향과 속도에서 알림 반응을 시작한다. |
| 4 | 가능한 미래의 결과 | `S07 ⇒ S08` | 같은 미완성 식탁과 가스불 ON 상태를 유지한다. S07은 정지 이미지, S08은 별도 생성이므로 인물이 갑자기 나타나는 부분은 하드컷으로 처리한다. |
| 5 | 안전한 선택 | `S10 → S11A → S11B → S12 ⇒ S13` | S10은 S04A 시작 프레임으로 생성해 스토브를 바라보는 반응을 만든다. 손잡이 ON→OFF와 파란 불꽃 소화를 같은 클릭 순간으로 연결하고, 이후 양쪽 화구 OFF 상태를 전달한다. S13은 시간 생략 후의 완성된 저녁이므로 상태만 이어받는다. |
| 6 | 편집 전용 | `S09`, `S14` | Flow로 생성하지 않는다. 모든 영상 채택 후 CapCut에서 S08→S10 기본 디졸브와 엔드카드만 만든다. |

실제 작업은 반드시 `1번 체인을 끝까지 채택 → 2번 체인 → 3번 체인` 순서로 진행한다. 한 체인 안에서 다음 쇼트를 먼저 생성하지 않는다.

## 5. 공통 생성 규칙

각 Flow 프롬프트 끝에 필요한 내용을 이미 포함했다. 별도의 장문 공통 블록을 중복해서 붙이지 않는다.

- 화면비: 16:9 Landscape
- 중요 행동: 한 클립에 하나
- 카메라: 고정 또는 하나의 매우 느린 이동
- 연기: 절제된 현실적 반응
- 전화 화면: 완전한 검정 화면으로 생성
- 잠금화면형 알림 카드·경고 카드·아이콘·빛: Flow에서 생성하지 않고 후편집
- 알림 언어 고정: 생성 과정에서 알림 UI가 우발적으로 나타나더라도 일반 알림에는 `새 알림`과 `알림이 도착했습니다.`, 미래 경고에는 `우리 집 화재 감지`만 허용한다. 일본어·중국어·영어·유사 한자·깨진 문자·추가 문구는 모두 금지한다. 이 규칙은 S01, S04B, S05, S06, S12에 공통 적용한다.
- 전화가 보이는 쇼트: 전화 위나 바깥쪽에 화면 너비 약 8~12%의 깨끗한 UI 합성 여백을 확보하고 얼굴·손·불꽃과 겹치지 않게 한다
- 생성 오디오: 최종 편집에서 음소거
- 생성 문자·브랜드·앱 UI: 위에서 지정한 정확한 한국어 알림 문구를 제외하면 즉시 폐기
- 가스 상태 오류: 편집으로 숨기지 않고 폐기

### 연속성 체인 운영

모든 장면을 연속 생성하지 않는다. 장소·시간·행동이 직접 이어지는 아래 쇼트만 상태 또는 채택 프레임을 다음 쇼트에 전달한다. 한 클립에 여러 행동을 합치지 않는다.

| 체인 | 연결 방식 | 반드시 유지할 상태 |
|---|---|---|
| `S01 ⇒ S04A ⇒ S04B` | 세 쇼트는 상태 연속성만 유지한다. S01은 주방 미디엄 숏으로 거실과 전화를 숨기고, S04A 와이드에서 협탁 전화를 처음 공개한다. S04A는 걷는 도중 컷한 뒤 S04B를 협탁 앞 클로즈업으로 시작한다 | 엄마 얼굴·의상, 같은 집, 화면 오른쪽을 향한 시선과 이동 방향, 협탁 전화 한 대, 왼쪽 화구 ON, 오른쪽 화구 OFF |
| `S02 → S05` | S02 채택본의 마지막 프레임을 S05 시작 기준으로 사용 | 아빠 위치, 문을 향한 몸 방향, 가방 왼손, 전화 오른손, 카메라 축, 엘리베이터 홀 구조 |
| `S03 → S06` | S03 채택본의 얼굴이 안정적인 보행 프레임을 S06 시작 기준으로 사용 | 딸 얼굴, 보행 방향과 속도, 교복, 백팩, 전화 위치, 학교 정문 구조 |
| `S09 → S10` | S04A 시작 프레임을 S10의 시작 이미지로 사용 | 선택 직전의 발 위치, 불꽃 ON, 전화 위치, 카메라 축 |
| `S10 → S11A → S11B → S12` | 행동은 각기 다른 쇼트로 생성하되 컷 지점의 상태를 다음 쇼트에 전달 | 손잡이 ON→OFF, 파란 불꽃 ON→완전 소화, 이후 양쪽 화구 OFF |

다음 연결은 의도적인 몽타주이므로 연속 생성하지 않는다: `S01→S02`, `S02→S03`, `S04B→S05`, `S05→S06`, `S06→S07`, `S12→S13`, `S13→S14`. 하드컷·매치컷·일반 알림 카드와 경고 카드 전환은 Flow가 아니라 CapCut에서 만든다.

## 6. 쇼트별 복사용 Flow 프롬프트

### S01 — 마지막 끓임과 짧은 알림

- 모델: Omni Flash 6초 우선, Fast 6초 테스트 가능
- Ingredients: `@엄마`, `가스레인지-불켜짐-근접-v1`
- 시작 이미지: `candidates/S01-마지막조리-알림전-후보-v2.png`
- 사용 구간: 0:00–0:06

```text
Starting from S01-마지막조리-알림전-후보-v2.png, @엄마 is already gently stirring the stainless pot during the final quiet simmer of a soup or stew. She performs exactly one natural attention shift toward a brief ordinary smartphone notification originating off screen-right: her stirring slows slightly, her eyes move first toward screen-right, and her head follows by no more than ten degrees while her torso and feet stay at the stove. Preserve the exact revised kitchen, mother identity, wardrobe, two-burner stove, pot, one small blue left-burner flame and clean upper-right graphic space from the starting image. Natural 50mm medium three-quarter shot, locked camera, warm evening kitchen light. Six-second editable clip with a brief normal stir before and a short listening hold after the shift. Prefer no generated notification card, bubble, screen graphic, icon or text because the card will be overlaid later. If any notification UI nevertheless appears, it must contain only the exact Korean text "새 알림" and "알림이 도착했습니다." No Japanese, Chinese, English, pseudo-text, broken characters or additional wording. No generated audio, visible smartphone, living-room furniture, notification light, exaggerated head snap, reaching, walking, dialogue, food overflow, smoke, orange flame, second lit burner, extra person or camera movement.
```

최소 후편집: 화면 오른쪽 바깥에서 브랜드 없는 부드러운 두 음의 짧은 알림을 한 번만 재생한다. 전체 길이는 0.5~0.8초이며 진동·반복음·벨소리는 넣지 않는다. 엄마의 눈이 오른쪽으로 움직이기 직전에 상단 오른쪽 합성 여백에 고정 PNG `일반-잠금화면형-알림카드.png`를 약 1초간 그대로 올렸다가 하드컷으로 제거한다. 카드는 반투명한 밝은 회색 둥근 직사각형, 왼쪽의 작은 무표식 녹색 원형 아이콘, 굵은 제목 `새 알림`, 짧은 본문 `알림이 도착했습니다.`만 사용한다. 실제 운영체제·앱·금융기관 UI는 모사하지 않는다. 크기 변화·맥동·추적 키프레임은 사용하지 않는다.

### S02 — 아빠의 평온한 귀가

- 모델: Fast 4초 테스트 또는 Omni Flash 4초
- Ingredients: `@아빠`, `아파트-엘리베이터홀-저녁-v1`
- 시작 이미지: `S02-엘리베이터홀-아빠대기-v1.png`
- 연속성: 아빠는 검은 가방을 왼손, 화면이 꺼진 전화를 오른손 아래에 들고 아직 보지 않는다. 얼굴·어깨·발끝이 모두 닫힌 승강기 문을 향한다.

```text
@아빠 stands in the clear waiting area of 아파트-엘리베이터홀-저녁-v1 after work, positioned on the right third of the frame. His face, shoulders, torso and both feet remain clearly oriented toward the closed elevator doors centered in the frame. He holds exactly one unbranded black work bag low in his left hand. One dark-gray-cased smartphone with a completely black blank screen rests low and relaxed in his right hand, but he never looks at it. He performs exactly one restrained action: shifts his weight slightly while continuing to wait and stare at the closed doors, then becomes still. Preserve his exact saved face, short hair, body proportions, charcoal jacket, plain white shirt, dark trousers and black shoes. Medium-wide rear three-quarter shot from slightly behind his left shoulder, eye-level camera, natural 35mm lens. Hold the opening composition for 0.7 seconds, perform one extremely slow smooth three-to-five-percent physical dolly-in toward him and the doors, then hold the final frame for one second. Keep the approved elevator doors, call panel, left bulletin board, right narrow wall mirror, wall seams and corridor unchanged. Warm neutral ceiling light, grounded Korean apartment realism, four-second editable clip. No digital zoom, no dolly-out, no pan, no tilt, no orbit, no handheld motion, no button press, no phone interaction, no looking toward camera, no profile facing away from the doors, no door opening, no readable floor number, no readable notice, no logo, no visible person reflection in the mirror, no mirror duplicate, no extra person, no red light, no panic, no malformed hands.
```

편집 전환: S01의 짧은 알림음이 완전히 끝난 뒤 S02로 하드컷한다. 알림음 꼬리를 S02까지 끌고 가지 않는다. S02 마지막 프레임의 승강기 문 수직선을 S03 학교 교문 기둥의 수직선과 맞춰 하드 매치컷한다. 생성 모델에 장면전환을 맡기지 않는다.

### S03 — 딸의 평온한 귀가

- 모델: Omni Flash 6초 권장. 얼굴 안정성 테스트에만 Fast 6초 사용
- Ingredients: `@딸`, `고등학교-정문-푸른저녁-v1`
- 시작 이미지: `S03-학교정문-딸귀가-v1.png`
- 연속성: 딸은 남색 백팩을 양쪽 어깨에 메고, 검은 화면 전화는 한 손에 낮게 들되 보지 않는다.

```text
@딸 is already walking slowly from inside the open pedestrian gate of 고등학교-정문-푸른저녁-v1 toward the sidewalk and route home at blue hour after evening supplementary study. Keep her entire body within the central sixty percent of the frame and away from every image edge. She wears her saved plain white school shirt, dark-navy V-neck knitted vest, dark-charcoal uniform trousers, gray sneakers and navy backpack on both shoulders. One navy-cased unbranded smartphone with a completely black blank screen stays lowered and relaxed in her right hand, but she never looks at it. She performs exactly one continuous action: takes only one to two small natural steps at a calm pace and remains in motion through the final frame. Preserve her exact saved sixteen-year-old face with high identity fidelity: the same eyes, nose, lips, jawline, skin tone, youthful proportions and low black ponytail. Her clearly visible face remains in one stable three-quarter view toward her walking direction throughout. Preserve her body proportions, uniform, backpack and restrained natural arm swing. Keep the approved gate pillars and softly lit classroom building recognizable but slightly out of focus behind her. Medium full shot from head to below the knees, natural 50mm lens, eye-level locked camera, cool blue evening exterior with warm campus windows, grounded realism. Six-second editable clip; begin after she is already moving, hold a stable walking state briefly, show one to two slow steps, and cut on an active stride before she stops. No wide-angle distortion, no fast walking, no running, no slowing down, no pause, no stop, no posing, no head turn, no head bobbing, no looking toward camera, no facial-expression change, no face morphing, no asymmetrical eyes, no changing facial features, no hair change, no phone interaction, no looking at the phone, no crowd, no text, no logo, no camera movement, no malformed hands.
```

편집 전환: S02 승강기 문의 수직선을 S03 교문 기둥과 맞춰 하드 매치컷한다. S03은 딸의 발이 움직이는 도중에 컷아웃하여 S04A의 엄마가 문턱을 향해 움직이려는 장면으로 연결한다.

### S04A — 주방 문턱을 넘는 잘못된 선택

- 모델: Omni Flash 6초
- Ingredients: `@엄마`, `가스레인지-불켜짐-근접-v1`
- 시작 이미지: `candidates/S04A-주방에서-거실로-이동시작-후보-v3.png`
- 핵심: 카메라는 주방 안에 고정하고, 켜진 불꽃과 문턱을 넘어 계속 이동하는 엄마가 동시에 보여야 한다.

```text
Starting from S04A-주방에서-거실로-이동시작-후보-v3.png, @엄마 continues moving slowly from the stove toward the round wooden side table beside the sofa, with both hands empty and her body oriented frame-left to frame-right. She performs exactly one continuous action: takes one to two natural steps toward the charging phone and remains in motion through the final frame. She does not stop, pose, turn back or reach for the phone in this shot. Cut while one foot is still in an active stride. Preserve the exact revised apartment, camera axis, mother identity, open stainless pot, wooden spoon resting beside the pot, two-burner stove, one small steady blue flame on the left burner, right burner fully off, dining table, TV, sofa, round side table, one silver-blue phone connected to its white charging cable and the realistic blue-hour balcony view from the starting image. Natural 40mm medium-wide composition, restrained everyday acting, six-second editable clip. Keep her fully inside frame. Keep the phone stationary on the side table and preserve its charging state. No slowing to a stop, no abrupt freeze, no second action, no picking up the phone, no phone movement, no cable disconnection, no leaving frame, no stove interaction, no flame change, no dialogue, no lip movement, no extra person, no text, no notification UI, no smoke, no orange flame, no architecture change, no camera movement.
```

폐기: 엄마가 마지막에 멈춰 포즈를 취함, 엄마가 프레임 밖으로 사라짐, 불꽃이 안 보임, 전화가 손에 생김, 전화가 협탁에서 움직임.

후편집 없음. S01에서 알림 위치를 암시했고 S04A에서 실제 협탁 전화가 보이므로 일반 알림 카드를 반복하지 않는다.

### S04B — 최초 전화 들기

- 모델: Omni Flash 4초 또는 6초
- Ingredients: `@엄마`
- 시작 이미지: `S04B-협탁앞-전화집기전-v1.png`

```text
Starting from S04B-협탁앞-전화집기전-v1.png, @엄마 is already stationary beside the round living-room table. One matte-black unbranded smartphone rests face-up in its original position with a completely black screen, and her right hand begins 8–12 cm above it without contact. She performs exactly one action: picks up that single phone naturally and holds it still below chest height, looking down at the blank screen. Preserve the exact revised apartment, mother identity, 50–55mm camera axis, sofa, table, phone and the small blue left-burner flame visible in the background. Four-to-six-second editable clip with a brief hold after pickup. Keep the phone screen blank for later overlay. If any warning UI nevertheless appears, it must contain only the exact Korean text "우리 집 화재 감지". No Japanese, Chinese, English, pseudo-text, broken characters or additional wording. No new walking, no generated screen light, no icon, no tapping, no second phone, no dialogue, no lip movement, no alarm reaction, no extra person, no malformed hands, no flame change, no smoke.
```

최소 후편집: 엄마가 전화를 들어 올린 뒤 완전히 멈춘 마지막 0.8초에 고정 PNG `미래-화재경고-카드.png`를 화면 오른쪽 위 안전영역에 올린다. 전화에 붙여 추적하거나 일반 알림 카드 자체를 코랄 카드로 변형하지 않는다. 카드가 보인 상태에서 S05로 하드컷한다.

### S05 — 미래의 아빠 경고

- 모델: Omni Flash 6초
- Ingredients: `@아빠`, `아파트-엘리베이터홀-저녁-v1`
- 가능하면 S02 채택본 마지막 프레임을 시작 프레임으로 사용한다.

```text
@아빠 stands in the exact same right-third position and body orientation established in S02 inside 아파트-엘리베이터홀-저녁-v1. His shoulders and feet remain toward the closed elevator doors. The black work bag remains fixed in his left hand and the dark-gray-cased unbranded smartphone remains low in his right hand with a completely black blank screen. He performs exactly one action: lowers only his gaze from the closed elevator doors to the phone and becomes completely still, changing from neutral to quietly concerned without panic. Match the S02 camera axis from slightly behind his left shoulder, but use a tighter 50mm medium close shot. Locked camera with no zoom or dolly so the gaze change carries the moment. Preserve the same doors, call panel, bulletin board, mirror, wall seams and warm ceiling light. Six-second editable clip with the first and last second held. Keep the phone screen blank for later overlay. If any warning UI nevertheless appears, it must contain only the exact Korean text "우리 집 화재 감지". No Japanese, Chinese, English, pseudo-text, broken characters or additional wording. No screen light, no icon, no tapping, no phone vibration, no red light, no crying, no open mouth, no dialogue, no lip movement, no extra person, no visible person reflection, no door movement, no malformed hands.
```

최소 후편집: 아빠가 완전히 멈춘 마지막 1초에 S04B와 같은 고정 PNG `미래-화재경고-카드.png`를 화면 오른쪽 위 안전영역에 복사해 올린다. 전화 추적·맥동·확대는 하지 않는다.

편집 전환: S04B의 고정 경고 카드가 보인 상태에서 S05로 하드컷한다. 별도의 줌이나 전환 효과를 넣지 않는다.

### S06 — 미래의 딸 경고

- 모델: Omni Flash 6초
- Ingredients: `@딸`, `고등학교-정문-푸른저녁-v1`
- 가능하면 S03 채택본에서 얼굴과 보행 자세가 가장 안정적인 프레임을 시작 프레임으로 사용한다. 마지막 프레임에 정지·표정 왜곡이 있으면 사용하지 않는다.

```text
@딸 begins already walking at the same ordinary pace and in the same direction established in S03 just outside 고등학교-정문-푸른저녁-v1. Her identity, low ponytail, school uniform and navy backpack remain unchanged. Preserve her exact saved sixteen-year-old face with high identity fidelity: the same eyes, nose, lips, jawline, skin tone and youthful proportions. Keep her face in one stable three-quarter view; her eyes move downward first and her chin follows only slightly. The navy-cased unbranded smartphone remains low in her right hand with a completely black blank screen. She performs exactly one continuous reaction: notices the lowered phone, shortens only the next step and comes to a quiet complete stop, showing restrained concern without panic. Preserve the same gate pillars and softly focused school building behind her. Medium close three-quarter shot, natural 55mm lens, eye-level locked camera, cool blue-hour exterior with warm classroom windows. Six-second editable clip with the opening walking state and final stopped state each held briefly for editing. Keep the phone screen blank for later overlay. If any warning UI nevertheless appears, it must contain only the exact Korean text "우리 집 화재 감지". No Japanese, Chinese, English, pseudo-text, broken characters or additional wording. No screen light, no icon, no tapping, no phone vibration, no red light, no crying, no open mouth, no dialogue, no lip movement, no face morphing, no asymmetrical eyes, no changing facial features, no head snap, no crowd, no extra person, no malformed hands.
```

최소 후편집: 딸이 완전히 멈춘 마지막 1초에 같은 고정 PNG `미래-화재경고-카드.png`를 화면 오른쪽 위 안전영역에 복사해 올린다. 얼굴과 교복을 가리지 않으며 전화 추적·맥동·확대는 하지 않는다.

### S07 — 완성되지 못한 저녁

Flow 영상 생성 금지. `S07-미완성빈식탁-가스불켜짐-v1.png`을 5초 정지 이미지로 사용한다.

CapCut:

- 정지 이미지를 5초 그대로 유지
- 확대·색보정·코랄 잔광·전화 UI를 추가하지 않음
- 빈 밥·국그릇과 밑반찬은 그대로
- 그을음·깨진 물건·불탄 음식·가족사진·휴대전화 추가 금지

### S08 — 엄마가 원인을 돌아보다

- 모델: Omni Flash 6초
- Ingredients: `@엄마`, `가스레인지-불켜짐-근접-v1`
- 시작 이미지: `S08-미완성식탁-불꽃인지-v1.png`

```text
Starting from S08-미완성식탁-불꽃인지-v1.png, @엄마 stands still beside the unfinished three-person dining table. The same matte-black smartphone remains lowered and motionless in her right hand with a completely black screen. She performs exactly one controlled action: slowly turns only her head and shoulders from the empty bowls toward the clearly visible kitchen flame while her feet, phone and arms remain still. Preserve the exact revised apartment, three chairs, three place settings, mother identity, phone, tableware, two-burner stove and one small uniform blue flame beneath the pot on the left burner. Natural 50mm rear three-quarter medium-wide composition, locked camera, restrained realization. Six-second editable clip with the final posture held briefly. No walking, no phone disappearance, no raising or tapping the phone, no screen light, no stove interaction, no panic, no dialogue, no lip movement, no extra person, no tableware movement, no smoke, no orange flame, no second lit burner, no architecture change.
```

실패 대안: 엄마 어깨가 보이는 정지 프레임과 가스레인지-불켜짐-근접-v1 정지 프레임을 포커스 풀처럼 하드컷한다.

후편집 없음. 엄마가 빈 식탁에서 켜진 불을 돌아보는 연기만으로 의미를 전달한다.

### S09 — 가능한 미래에서 현실로 복귀

Flow 생성 금지. CapCut 기본 편집만 사용한다.

1. S08 마지막 프레임을 약 1.5초 정지한다.
2. CapCut 무료 기본 디졸브를 약 0.2~0.3초 적용한다.
3. S10 첫 프레임을 약 1.2초 정지한 뒤 S10 동작을 이어 재생한다.
4. 원형 마스크·역재생·줌·플래시·색보정은 사용하지 않는다.

### S10 — 선택 직전 멈춤

시작 이미지: `S04A-주방에서-거실로-이동시작-v2.png`. 동일 이미지를 사용해 Flow 4초로 생성한다. 별도의 CapCut 확대 키프레임은 사용하지 않는다.

Flow가 필요할 때:

```text
Starting from S04A-주방에서-거실로-이동시작-v2.png, @엄마 performs one continuous realization reaction: cancels the intended step, settles both feet, and turns only her eyes and head slightly back toward the clearly visible blue gas flame. Her torso does not spin and she does not walk back within this shot. The phone remains untouched on the round living-room table. Preserve the exact revised apartment, camera axis, mother identity, wardrobe, pot, two-burner stove, left flame, sofa, table and phone from the starting image. Slow subtle push-in to a slightly tighter frame. End with her gaze fixed on the stove while flame and phone remain visible. Four-second editable clip. No continued walking, phone in hand, stove interaction, dialogue, lip movement, flame change, extra person, text, smoke, head snap or body teleportation.
```

편집: 스토브를 바라보는 마지막 안정 프레임에서 S11A의 이미 손잡이를 잡고 있는 손 매크로로 하드컷한다. 주방 안에서 손잡이까지 걸어가는 과정은 생략한다.

후편집 없음. S09의 기본 디졸브와 엄마가 스토브를 바라보는 동작만으로 현실 복귀를 표현하며 알림음도 반복하지 않는다.

### S11A — 대응 손잡이 OFF

- 최우선: 안전한 정상 사용 환경의 직접 매크로 촬영
- Flow 사용 시 Ingredients: `가스레인지-불켜짐-근접-v1`, 가능하면 정확한 OFF 종료 프레임

```text
One anatomically correct adult female right hand is already resting naturally on only the single control knob that physically corresponds to the active left burner of the approved unbranded black-glass two-burner stove. The hand performs exactly one continuous mechanical action: rotates that one knob smoothly to its defined OFF stop. End the usable action at the exact final mechanical click; do not add a long hold afterward. The burner and flame remain outside the frame. Preserve exactly two stove knobs total, their spacing, appliance edges and materials. Extreme macro close-up from slightly above, 85mm lens, locked camera, neutral warm light, physically accurate instructional realism, horizontal 16:9. No generated OFF text, no letters, no invented symbol, no second hand, no other knob movement, no extra finger, no knob duplication, no appliance deformation, no camera movement, no cut.
```

즉시 폐기: 대응 손잡이 불명확, 손가락 오류, 다른 손잡이 움직임, 손잡이 수·위치 변화.

### S11B — 파란 불꽃 완전 소화

- 최우선: 직접 매크로 촬영
- Flow 사용 시 시작 프레임 `가스레인지-불켜짐-근접-v1`, 종료 프레임 `가스레인지-불꺼짐-근접-v1`

```text
The one small uniform blue gas flame beneath the centered stainless pot on the approved left burner is visible for no more than the first 0.2 seconds, extinguishes completely in one clean response to the off-screen mechanical click, and remains fully dark and unchanged through the end of the clip. The right burner remains fully off throughout. Match the exact appliance, pot, burner, camera position and materials of 가스레인지-불켜짐-근접-v1 and 가스레인지-불꺼짐-근접-v1. Extreme macro close-up at burner level, 85mm lens, locked camera, neutral warm light, physically accurate instructional realism, horizontal 16:9. No delayed extinction, no hand, no knob, no residual flame, no reignition, no smoke, no steam burst, no orange or yellow flame, no second lit burner, no geometry change, no camera movement, no cut.
```

즉시 폐기: 잔불, 재점화, 주황·노랑 불꽃, 연기, 다른 화구 점화, 화구 구조 변화.

편집: S11A의 손잡이가 OFF 끝점에 닿는 클릭과 S11B의 불꽃 소화 순간을 같은 프레임 또는 1~2프레임 이내로 맞춘다. S11A 끝에서 정지 시간을 두지 않는다.

음향: 알림음은 이미 끝난 상태로 유지한다. S11A의 기계적 OFF 클릭과 S11B의 불꽃이 꺼지는 작은 소리만 또렷하게 들려 `알림 확인보다 불 끄기가 먼저`임을 청각적으로 구분한다.

### S12 — 불을 끈 뒤 알림 확인

- 모델: Omni Flash 4초 또는 6초
- Ingredients: `@엄마`, `가스레인지-불꺼짐-근접-v1`
- 시작 이미지: `S12-불끈뒤-전화확인전-v1.png`

```text
Starting from S12-불끈뒤-전화확인전-v1.png, both burners remain completely dark and the stainless pot remains on the left burner. @엄마 performs exactly one calm action: picks up the single matte-black phone from the round table with her right hand and holds it below chest height, glancing at the blank screen. Preserve the exact revised apartment, camera, mother identity, wardrobe, sofa, table, phone, pot and fully extinguished two-burner stove from the starting image. Four-to-six-second editable clip. Keep the phone screen blank for later overlay. If any ordinary notification UI nevertheless appears, it must contain only the exact Korean text "새 알림" and "알림이 도착했습니다." No Japanese, Chinese, English, pseudo-text, broken characters or additional wording. No screen light, no icon, no second phone, no cooking continuation, no touching the stove, no flame, no smoke, no dialogue, no lip movement, no extra person, no malformed hands.
```

최소 후편집: 불이 완전히 꺼진 배경이 확인된 뒤 엄마가 전화를 들어 올리는 순간, S01과 동일한 짧은 두 음의 일반 알림을 한 번만 재생한다. 엄마가 화면을 보는 마지막 0.8초에 같은 고정 PNG `일반-잠금화면형-알림카드.png`를 오른쪽 위 안전영역에 표시한다. 문구는 `새 알림`과 `알림이 도착했습니다.`만 사용하며 일본어·중국어·영어·유사 문자·추가 문구는 금지한다. 카드 이동·추적·맥동·확대는 사용하지 않는다.

### S13 — 가족의 완성된 저녁

- 사용 이미지: `S13-가족의완성된저녁-v1.png`
- Flow 영상 생성 금지. 승인 정지 이미지를 3초 그대로 사용한다.

재생성이 필요할 때만 `production/start-frames/start-frame-manifest-v1.md`의 S13 상태와 현재 승인 이미지를 기준으로 한다. 구버전 완성 식탁 레퍼런스로 새로 생성하지 않는다.

CapCut: 정지 이미지를 그대로 유지하고 의자 소리와 수저가 가볍게 닿는 소리만 추가한다. 확대 키프레임은 생략한다.

실패 대안: 세 캐릭터 얼굴을 포기하고 승인된 의상 소매로 구분되는 세 손 탑숏을 생성한다.

### S14 — 엔드카드

Flow 생성 금지. CapCut에서 5초 정지 카드로 만든다.

```text
두 번째 알림은 오지 않게.
자리를 뜨기 전, 가스불부터 끄세요.
```

- 둘째 줄은 반드시 유지한다.
- 마지막 0.5초는 완전 정지한다.
- KGS 로고는 공식 제공 파일과 사용 허용을 확인한 경우에만 사용한다.

## 7. 초보자용 최소 후편집 시스템

후편집 그래픽은 투명 배경 PNG 두 장만 사용한다.

1. `일반-잠금화면형-알림카드.png`: 반투명한 밝은 회색 둥근 카드, 작은 무표식 녹색 원형 아이콘, 제목 `새 알림`, 본문 `알림이 도착했습니다.`. 실제 운영체제·앱 UI와 브랜드는 모사하지 않는다.
2. `미래-화재경고-카드.png`: 흰 둥근 카드, 코랄 외곽선, 작은 집 픽토그램과 `우리 집 화재 감지`.

### 장면별 배치

- `S01`: 일반 잠금화면형 알림 카드를 오른쪽 위에 약 1초 고정.
- `S04B`: 엄마가 전화를 든 뒤 마지막 0.8초에 미래 화재경고 카드를 오른쪽 위에 고정.
- `S05`: 마지막 1초에 같은 미래 화재경고 카드를 같은 위치에 복사.
- `S06`: 마지막 1초에 같은 미래 화재경고 카드를 같은 위치에 복사.
- `S12`: 불이 완전히 꺼진 뒤 마지막 0.8초에 S01과 같은 일반 잠금화면형 알림 카드를 오른쪽 위에 고정.
- 나머지 장면: 전화 그래픽 없음.

### 금지 작업

- 모션 트래킹
- 마스크 애니메이션
- 그래픽 형태 변형
- 확대·축소 키프레임
- 화면 가장자리 맥동
- 장면별 색보정
- 유료 효과와 Pro 전환

전환은 대부분 하드컷을 사용하고 `S08→S10`에만 무료 기본 디졸브 0.2~0.3초를 사용한다. 음향은 S01의 짧은 두 음, S11A의 OFF 클릭, S11B의 불꽃 소화, S13의 생활음만 우선 배치한다.

## 8. 생성 게이트

### Gate A — 레퍼런스

- S04B와 S12가 같은 집·카메라·가구·엄마 위치로 보이고 차이는 `왼쪽 화구 ON` 대 `양쪽 화구 OFF`뿐임.
- S07·S08·S13이 같은 새 집의 식탁 방향과 정확히 세 자리 구조를 공유함.
- 아파트-엘리베이터홀-저녁-v1과 고등학교-정문-푸른저녁-v1에 문자·로고가 없음.
- S01 채택본에는 소파·협탁·식탁·발코니·휴대전화가 보이지 않고, 엄마·냄비·파란 불꽃과 상단 오른쪽 합성 여백만 명확함.

### Gate B — 위험 쇼트

1. S04A: 엄마가 문턱을 넘어 계속 이동하는 동안 켜진 불이 같은 화면에 보이고, 마지막에 급정지하지 않음.
2. S11A: 정확한 대응 손잡이 하나만 OFF.
3. S11B: 잔불 없이 완전 소화.
4. S13: 정확히 세 사람·세 자리.

네 항목이 통과하기 전 전체 본 생성을 진행하지 않는다.

## 9. 사전 테스트와 예상 크레딧

아래 네 항목은 전체 생성 전에 제작 가능성만 확인하는 **사전 테스트**다. 채택본 제작 순서가 아니며, 통과 후에는 `4-1. 실제 Flow 생성 순서`를 그대로 따른다.

1. S04A: 불꽃을 남겨둔 채 문턱을 넘어 계속 걷는 동작 테스트
2. S11B: 파란 불꽃 완전 소화 테스트
3. S11A: 정확한 대응 손잡이 OFF 테스트 또는 직접 촬영 확정
4. S13: 가족 세 명과 세 자리 정지 이미지 테스트

사전 테스트 통과 후 채택본 생성: `S01⇒S04A⇒S04B` → `S02→S05` → `S03→S06` → `S07⇒S08` → `S10→S11A→S11B→S12⇒S13` → `S09·S14 편집`.

| 범위 | 예상 크레딧 |
|---|---:|
| Fast/Lite 공간·단순 행동 테스트 | 80~140 |
| Omni 캐릭터·손 보정 | 30~80 |
| 재시도 예비 | 100 |
| 목표 합계 | **210~320** |

- 실제 감당 가능성은 Flow 잔여 크레딧 확인 전 `TBD`다.
- Quality는 사용하지 않는다.
- 레퍼런스 이미지는 이미 생성되어 Flow 크레딧을 쓰지 않는다.

## 10. 실패 시 단순화

1. S04A 실패: `문턱을 넘는 발`과 `켜진 화구`를 두 개의 짧은 인서트로 분리.
2. S05·S06: 전화 화면은 항상 검정으로 생성하고 UI는 후편집.
3. S07·S09·S10: 정지 프레임과 CapCut만 사용.
4. S08 실패: S04B의 전화 든 엄마 정지 프레임 → 켜진 불꽃 정지 프레임으로 하드컷하고, S09 전환 중심은 S04B의 `미래 화재경고 카드`를 사용.
5. S11A/B 실패: 안전한 직접 촬영 또는 승인 ON/OFF 프레임 매치컷.
6. S13 실패: 얼굴 없는 세 손·세 소매 탑숏 정지 이미지.

## 11. 생성 로그

각 생성 직후 `production/templates/flow-generation-log.md`에 기록한다.

- 장면 ID와 후보 번호
- 실제 프롬프트 전문
- 모델·길이·해상도
- 참조 자산과 캐릭터
- 생성일·차감 크레딧
- 결과 파일명
- 채택·보류·폐기와 이유
- 인물·손·가스레인지·불꽃·문자·카메라·안전 의미 검수
- CapCut 수정 내역
