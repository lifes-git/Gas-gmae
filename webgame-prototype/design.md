# Gas Safety Webgame Prototype: UI 지침

## 현재 적용 기준 — 2026-09-02

사용자 승인에 따라 크림색 점검 메모 기반 UI로 단계적으로 전환한다. 단일 기준은 `../production/game/design.md`의 “메모 UI 전환” 절이다. 아래 Retro Arcade 규칙은 이전 구현 기록이며 신규 작업에 적용하지 않는다.

현재 단계: 시작 화면의 메모 레이아웃 수정. 다른 화면은 아직 전환하지 않았다. 캐릭터는 자신의 그리드 열 너비를 넘지 않으며, 제목과 버튼은 종이 내부에 유지한다. 사용자 시각 검수 후 공통 버튼부터 순차 반영한다.

## 이전 기준: Retro Arcade (보관용)

이 문서는 게임 전반의 디자인 통일성을 유지하기 위한 핵심 디자인 토큰(Design Tokens)과 스타일 가이드라인을 정의합니다.

## 1. Typography (서체)
* **Main Titles (`.retro-title`):**
  * **Font:** `'Jua'`, `'Dongle'`, `'Comic Sans MS'`, sans-serif
  * **Weight:** 900 (Black)
  * **Stroke/Shadow:** 두꺼운 흰색 8방향 겹침 그림자(`text-shadow`) 사용. 계단현상 방지를 위해 최소 24-point shadow 권장.
  * **Drop Shadow:** 하단으로 향하는 짙은 그림자 적용.

## 2. Color Palette (색상)
오락실 아케이드 게임이나 동화책에서 볼 법한 팝(Pop)하고 따뜻한 원색을 사용합니다.
* **Red (Main/Alert):** `#ff4757`
* **Orange (Primary Actions):** `#ffb142`
* **Yellow (Warning/Accent):** `#fca311`
* **Green (Success/Solved):** `#1dd1a1`
* **Blue (Info/Secondary):** `#0984e3`
* **Text (Ink):** `#2f3640`
* **Modal Background (Retro):** `#ffecb3` (따뜻한 노란색 베이스)

## 3. UI Components (요소 형태)
### Buttons (`.retro-button`)
* **Shape:** 타원형 알약(Pill) 모양 (`border-radius: 999px`)
* **Border:** 매우 두꺼운 흰색 테두리 (`border: 6px solid white`)
* **Shadow:** 바깥 그림자와 안쪽 그림자(inset)를 동시 적용하여 입체적인 글로시(Glossy) 효과 연출.
* **Interaction:** Hover 시 밝기 증가(`filter: brightness(1.1)`), Active 시 아래로 눌리는 애니메이션(`transform: translateY(6px)`).

### Modals (`.retro-modal`)
* **Shape:** 둥근 모서리를 가진 박스 (`border-radius: 24px`)
* **Border:** 두꺼운 흰색 테두리 (`border: 8px solid white`)
* **Shadow:** 짙은 검은색 바깥 그림자 및 노란색 안쪽 그림자 겹침.
* **Close Button (`.retro-close`):** 모달 창 우측 상단 바깥쪽으로 튀어나오는 빨간색 원형 버튼.

### Hotspots (인게임 위험요소 타겟)
* **Pulse Target:** 빨간색 둥근 원에 굵은 흰색 테두리를 적용하여 눈에 확 띄는 오락실 과녁 느낌 연출.
* **Name Tag:** 노란색(`fca311`) 알약 모양 네임택을 타겟 하단에 상시 노출하여 직관성 강화.

## 4. In-game Background (인게임 시점)
* **View Type:** 전체 거실+주방 뷰(Panoramic View) 유지.
* **Interaction:** 방 안의 3가지 요소(가스밸브, 수건, 부탄캔)를 한 화면에서 모두 찾을 수 있도록 텐션 유지. 숨겨진 요소를 눌렀을 때만 Retro Modal 팝업 호출.
