window.SAFETY_RULE_CARDS = {
  valve: {
    label: "가스밸브 안전수칙",
    lead: "장기간 외출 전에는",
    highlight: "가스밸브를 잠가요.",
    icon: "assets/masters/stage-1/props/prop-valve-handle-alpha-v2.png",
    progressIcon: "assets/common/props/result-valve-integrated-v1.png"
  },
  towel: {
    label: "화기 주변 안전수칙",
    lead: "종이와 행주는",
    highlight: "화기 주변에 두지 않아요.",
    icon: "assets/masters/stage-1/props/prop-towel-draped-alpha-v1.png"
  },
  butane: {
    label: "부탄캔 안전수칙",
    lead: "통풍이 잘되는 곳에서 잔여가스를 제거한 뒤",
    highlight: "지역 분리배출 기준을 확인해요.",
    icon: "assets/stage-1/props/prop-butane-red-v4.png"
  },
  window: {
    label: "귀가 후 환기 안전수칙",
    lead: "가스 누출이 의심되면 전기 스위치를 조작하지 말고",
    highlight: "창문을 열어 자연환기해요.",
    icon: "assets/common/props/progress-window-open-v1.png",
    progressIcon: "assets/common/props/progress-window-open-v1.png"
  },
  pipe: {
    label: "가스배관 누출 점검 안전수칙",
    lead: "연결부에 큰 거품이 생기면 가스 누출이 의심돼요.",
    highlight: "가스 사용을 중단하고 밸브를 잠근 뒤 자연환기하고, 가스공급자나 도시가스사에 점검을 요청해요.",
    icon: "assets/stage-2/props/prop-stage2-gas-pipe-integrated-v2.png",
    progressIcon: "assets/stage-2/props/prop-stage2-gas-pipe-integrated-v2.png"
  }
};

(function () {
  "use strict";
  var lockTargets = "#app, #mission-dialog, .kitchen-detail-dialog, #settings-dialog, #rules-dialog, #stage-two, .stage-two-window-dialog, .stage-two-pipe-dialog";

  window.setSafetyRuleInteractionLock = function (locked) {
    document.querySelectorAll(lockTargets).forEach(function (element) {
      if (locked) {
        if (!element.inert) {
          element.inert = true;
          element.dataset.safetyRuleLocked = "true";
        }
      } else if (element.dataset.safetyRuleLocked === "true") {
        element.inert = false;
        delete element.dataset.safetyRuleLocked;
      }
    });
  };

  var dialog = document.getElementById("safety-rule-dialog");
  if (dialog) {
    dialog.addEventListener("close", function () {
      window.setSafetyRuleInteractionLock(false);
    });
  }
}());
