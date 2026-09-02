# UI components

기준 시안: `../production/game/concepts/ui-component-system-concept-v1.png`

## 파일 역할

- `ui-components.css`: 색상·테두리·모서리·눌림 깊이 토큰과 공통 컴포넌트 외형
- `ui-components.js`: 정적 버튼 강화와 동적 버튼 생성 도우미
- `toon-ui.css`: 장면별 위치·크기·특수 연출

공통 외형은 `ui-components.css`, 특정 화면의 배치만 `toon-ui.css`에서 관리한다.

## 색상 역할

- `primary`: 노랑 — 다음 단계나 핵심 행동
- `info`: 하늘색 — 설정, 수칙, 복귀
- `success`: 라임 — 완료 후 재시작 및 성공 행동
- `danger`: 코랄 — 닫기, 취소, 주의
- `neutral`: 크림 — 중립 조작

색상과 함께 아이콘·접근성 이름·텍스트 중 하나 이상을 제공한다.

## 정적 버튼

```html
<button
  data-ui-component="button"
  data-ui-variant="primary"
  type="button">시작</button>
```

아이콘 전용 버튼에는 `data-ui-icon="true"`와 `aria-label`을 반드시 추가한다.

## 동적 버튼

```js
var button = GameUI.createButton({
  label: "돌아가기",
  className: "detail-back",
  variant: "info",
  iconOnly: true,
  ariaLabel: "주방으로 돌아가기",
  onClick: closeDetail
});
```

## 공통 표면

- `.ui-progress`: 진행 HUD
- `.ui-speech`: 소멍이 말풍선과 미션 안내
- `.ui-panel`: 시작·완료 카드
- `.ui-modal`: 미션·설정·수칙 대화상자

## 입력 상태

- hover: 1.5도 이내 기울기와 밝기 변화
- active: 아래로 3px 이동하고 그림자를 1px로 축소
- focus-visible: 흰색 4px 외곽선
- reduced-motion: hover 변형과 전환 제거
- 최소 터치 영역: 44×44 CSS px
