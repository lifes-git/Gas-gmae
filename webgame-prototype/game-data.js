window.GAME_CONTENT = {
  valve: {
    title: "가스밸브를 확인해요",
    hud: "가스밸브 · 장기간 외출 전 점검",
    step: "스토리 2–3 · 위험요소 1 · GS-OUTING-01",
    copy: "장기간 외출하기 전, 열려 있는 가스밸브를 어떻게 해야 할까요?",
    visual: "valve",
    actions: [
      { id: "close-valve", label: "가스밸브 잠그기", correct: true },
      { id: "leave-valve", label: "그대로 두고 외출하기", correct: false }
    ],
    success: "좋아요! 장기간 외출 전 가스밸브를 잠갔어요.",
    error: "다시 생각해 봐요. 장기간 집을 비우기 전에는 가스밸브를 잠가요.",
    explanation: "장기간 집을 비우기 전에는 가스밸브를 잠가 안전한 상태로 만들어요."
  },
  towel: {
    title: "화기 주변을 정리해요",
    hud: "화기 주변 · 수건을 안전한 곳으로",
    step: "스토리 4–6 · 위험요소 2 · GS-FIRE-01",
    copy: "꺼진 가스레인지 가까이에 수건이 놓여 있어요. 어디로 옮길까요?",
    visual: "towel",
    actions: [
      { id: "basket", label: "화기와 떨어진 보관 바구니", correct: true },
      { id: "trash", label: "쓰레기통", correct: false },
      { id: "counter", label: "가스레인지 바로 옆", correct: false }
    ],
    success: "잘했어요! 종이와 수건은 화기 주변에 두지 않아요.",
    error: "수건을 버릴 필요는 없어요. 화기와 떨어진 안전한 곳에 보관해요.",
    explanation: "종이와 수건 같은 가연물은 불이 꺼진 상태에서도 화기 주변에 두지 않고 떨어진 곳에 보관해요."
  },
  butane: {
    title: "다 쓴 부탄캔을 처리해요",
    hud: "부탄캔 · 안전한 처리 장소",
    step: "스토리 7–9 · 위험요소 3 · GS-BUTANE-DISPOSAL-01",
    copy: "다 쓴 부탄캔의 잔여가스는 어디에서 제거해야 할까요?",
    visual: "butane",
    actions: [
      { id: "outdoor", label: "통풍이 잘되는 실외 장소", correct: true, next: "butane-step-2" },
      { id: "kitchen", label: "주방 안", correct: false },
      { id: "bag", label: "쓰레기봉투 안", correct: false }
    ],
    error: "실내나 봉투 안에서는 제거하지 않아요. 통풍이 잘되는 장소를 선택해요."
  },
  "butane-step-2": {
    title: "잔여가스를 안전하게 제거해요",
    hud: "부탄캔 · 잔여가스 안전 처리",
    step: "스토리 8–9 · 부탄캔 처리 2단계",
    copy: "통풍이 잘되는 장소로 이동했어요. 다음 행동을 선택하세요.",
    visual: "butane-outdoor",
    actions: [
      { id: "nozzle", label: "거꾸로 들고 노즐 눌러 제거하기", correct: true },
      { id: "puncture", label: "먼저 송곳으로 구멍 뚫기", correct: false }
    ],
    success: "부탄캔 잔여가스 제거 완료!",
    error: "멈춰요! 잔여가스를 제거하기 전에 구멍을 뚫지 않아요.",
    explanation: "통풍이 잘되는 곳에서 잔여가스를 완전히 제거하고, 구멍을 뚫지 않은 채 지역 분리배출 기준을 확인해요."
  }
};
