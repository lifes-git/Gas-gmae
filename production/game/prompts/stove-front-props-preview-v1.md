# 정면 주방 손잡이·수건 합성 외형 시안

기준 원본: bg-stove-front-interaction-v1.png. 이번 산출물은 합성 외형 검수용이며 투명 레이어가 완성된 것은 아니다. 승인 후 손잡이/수건을 분리하고 같은 에셋을 상세 모달에서 사용한다. 런타임과 코드 변경 없음.

스타일 고정: 기존 크림/네이비/오크 2D, 배관 몸체 고정. 노란 단일 레버 중심은 기존 스핀들 중심. 세이지 수건은 꺼진 레인지 왼쪽 화구에 널브러짐. 바구니는 빈 상태 유지. 수건 상태 완료는 바구니 보관 시점. 밸브 열린/잠긴 상태 및 실제 설비 적합성은 별도 안전 검수 전 draft.

도구: 내장 image_gen. 사용자 외형 검수 대기.

## 프롬프트

출력: `webgame-prototype/assets/masters/stove-front-props-preview-v1.png`, 1672×941, 1562146 bytes. 육안상 손잡이 연결 및 꺼진 레인지에 널브러진 수건 확인. 원본 배경은 보존. 아직 배경/소품 분리, 픽셀 정렬, 회전 모달, 수건 집기 미구현. Art: Revise / 사용자 외형 승인 및 밸브 상태 안전 검수 대기.

Use case: precise-object-edit. Edit this approved kitchen image by adding ONLY TWO props. Preserve camera framing, architecture, all cabinet lines, tile grid, stove, pipe, valve body, basket, colors and crisp 2D linework unchanged. (1) Attach a small simple golden-yellow flat single lever handle to the EXISTING circular valve spindle on the right-side vertical pipe. The handle pivot is precisely at the circular spindle center. Lever extends vertically downward parallel to pipe, front-facing flat broad face, subtle rounded rectangle grip, visible central screw. Keep physically plausible modest size, roughly 65-75 image pixels long in this 1672-wide scene, no extra valve or pipe, no floating. This is a visual draft of the unresolved state, not an instructional labeled graphic. (2) Add one sage green cotton dish towel with two narrow ivory stripes near one edge lying loosely sprawled and rumpled ACROSS THE LEFT HALF OF THE OFF GAS STOVE, draped over the left burner grates with folds following grate height, small edge trailing onto front counter. Not folded into a neat rectangle, not suspended, no flames, no smoke. Preserve the visible right burners. Match background brown outlines, subdued warm daylight and soft cel shadows. Basket remains EMPTY. No text, UI, labels, arrows, people, hands, glow or rings. Do not soften or repaint the entire background. Output same wide 16:9 composition. This is a composite appearance reference before the towel and lever will be separated into game layers.
