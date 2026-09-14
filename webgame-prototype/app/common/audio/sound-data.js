(function () {
  "use strict";
  window.GAME_SOUND_DATA = Object.freeze({
    outingDoorShut:{ type:"sample", src:"assets/common/audio/sfx-outing-door-shut-v1.mp3", volume:.72, cooldown:5000 },
    outingFootsteps:{ type:"sample", src:"assets/common/audio/sfx-ending-footsteps-v1.mp3", volume:.62, cooldown:5000 },
    windowLatch:{ type:"click", volume:.2, cooldown:120 },
    windowOpen:{ type:"sample", src:"assets/common/audio/sfx-window-open-v1.mp3", volume:.6, cooldown:450 },
    toolSelect:{ type:"drop", volume:.18, cooldown:120 },
    toolWrong:{ type:"wrong", volume:.2, cooldown:420 },
    brushScrub:{ type:"scrub", volume:.16, cooldown:520 },
    bubbleNormal:{ type:"bubble", volume:.16, cooldown:420 },
    bubbleWarning:{ type:"warningBubble", volume:.2, cooldown:850 },
    collect:{ type:"collect", volume:.18, cooldown:520 },
    storyStep:{ type:"sample", src:"assets/common/audio/sfx-ending-footsteps-v1.mp3", volume:.72, cooldown:900 },
    phoneDial:{ type:"sample", src:"assets/common/audio/sfx-ending-phone-dial-v1.wav", volume:.78, cooldown:1400 },
    phoneRing:{ type:"sample", src:"assets/common/audio/sfx-ending-phone-ring-v1.mp3", volume:.78, cooldown:1800 },
    stageComplete:{ type:"complete", volume:.2, cooldown:1200 }
  });
}());
