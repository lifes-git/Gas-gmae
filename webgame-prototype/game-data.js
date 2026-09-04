var SOMYEONGI = window.SOMYEONGI_DIALOGUE;

window.GAME_CONTENT = {
  valve: {
    title: "가스밸브를 확인해요",
    hud: "가스밸브 · 장기간 외출 전 점검",
    step: "스토리 2–3 · 위험요소 1 · GS-OUTING-01",
    copy: SOMYEONGI.valve.question,
    visual: "valve",
    actions: [
      { id: "close-valve", label: "가스밸브 잠그기", correct: true },
      { id: "leave-valve", label: "그대로 두고 외출하기", correct: false }
    ],
    success: SOMYEONGI.valve.success,
    error: SOMYEONGI.valve.error,
    explanation: SOMYEONGI.valve.explanation
  },
  towel: {
    title: "화기 주변을 정리해요",
    hud: "화기 주변 · 수건을 안전한 곳으로",
    step: "스토리 4–6 · 위험요소 2 · GS-FIRE-01",
    copy: SOMYEONGI.towel.question,
    visual: "towel",
    actions: [
      { id: "basket", label: "화기와 떨어진 보관 바구니", correct: true },
      { id: "trash", label: "쓰레기통", correct: false },
      { id: "counter", label: "가스레인지 바로 옆", correct: false }
    ],
    success: SOMYEONGI.towel.success,
    error: SOMYEONGI.towel.error,
    explanation: SOMYEONGI.towel.explanation
  },
  butane: {
    title: "다 쓴 부탄캔을 처리해요",
    hud: "부탄캔 · 안전한 처리 장소",
    step: "스토리 7–9 · 위험요소 3 · GS-BUTANE-DISPOSAL-01",
    copy: SOMYEONGI.butane.question,
    visual: "butane",
    actions: [
      { id: "outdoor", label: "통풍이 잘되는 실외 장소", correct: true, next: "butane-step-2" },
      { id: "kitchen", label: "주방 안", correct: false },
      { id: "bag", label: "쓰레기봉투 안", correct: false }
    ],
    error: SOMYEONGI.butane.error
  },
  "butane-step-2": {
    title: "잔여가스를 안전하게 제거해요",
    hud: "부탄캔 · 잔여가스 안전 처리",
    step: "스토리 8–9 · 부탄캔 처리 2단계",
    copy: SOMYEONGI.butane.step2Question,
    visual: "butane-outdoor",
    actions: [
      { id: "nozzle", label: "거꾸로 들고 노즐 눌러 제거하기", correct: true },
      { id: "puncture", label: "먼저 송곳으로 구멍 뚫기", correct: false }
    ],
    success: SOMYEONGI.butane.success,
    error: SOMYEONGI.butane.step2Error,
    explanation: SOMYEONGI.butane.explanation
  }
};
