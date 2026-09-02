# 정면 가스레인지 상호작용 배경 초안

승인 흐름: 주방 전체 → 레인지 영역 클릭 → 정면 확대. 수건 클릭 집기 → 들고 있음 → 바구니 클릭 보관 완료. 밸브는 손잡이만 투명 PNG 회전. 이번 산출물은 배경 시안만이며 손잡이/수건 별도 제작 전 단계.

스타일: `bg-kitchen-map-clean-v1.png` 동일 크림/네이비/오크, 정면에 가까운 약한 내려다봄, 선명한 2D 셀 셰이딩. 고정 배관·밸브 몸체는 벽에 결합, 손잡이 없음. 수건 없는 꺼진 레인지, 왼쪽 화기에서 분리된 수납 바구니. 배관 형상은 안전 검수 전 draft이며 실제 설치 지침 아님. GS-OUTING-01 및 GS-FIRE-01 검증 수칙 참조, 합성 후 상태 별도 검수.

도구: 내장 image_gen. 코드/런타임 변경 없음. 사용자 시안 검수 후 후속 에셋 진행.

## 프롬프트

출력: `webgame-prototype/assets/masters/bg-stove-front-interaction-v1.png`, 1672×941, 1620283 bytes. 요청 해상도보다 작으며 원본 유지. 꺼진 레인지, 왼쪽 수납 바구니, 오른쪽 고정 배관/몸체 확인. 손잡이·수건 없음. 배관의 실제 설비 적합성, 몸체/회전축, 레인지 상세 형상 및 전체 맵과의 일관성은 후속 검수 필요. Art: Revise / 사용자 시안 검수 및 안전 검수 대기. 런타임 미적용.

Use case: illustration-story. A FRONT-FACING interaction closeup of the stove wall in the SAME kitchen as reference. Reference is architecture/material/style continuity. 16:9 landscape clean background for a point-and-click game, no UI. Camera directly facing the stove wall, not looking at its side, modestly above countertop so burner tops visible. Same cream upper paneled cabinets, slim black hood, cream square tiles, honey oak countertop and navy lower cabinets. Composition: black four-burner gas cooktop fully OFF at right-center, occupying roughly x52-83% y57-70%, all grates unobstructed. On tiled wall to right of stove a modest silver vertical gas pipe firmly mounted flush to wall with small brackets, top disappearing BEHIND upper cabinetry/hood edge and lower section disappearing behind countertop, not dangling. Small in-line valve BODY with front-facing circular spindle at x86% y43%; NO LEVER HANDLE at all, handle will be composited later. Body and spindle seen straight-on so independent handle can rotate in image plane. No yellow handle, no open pipe ends. This installation is art draft, not instruction. Far LEFT a separate low open storage cubby under a clear section of counter contains one empty shallow wicker linen basket, visibly away from stove, basket opening visible and reachable, not a trash bin. Broad clear counter space separating basket from stove. No cloth or towel anywhere; no canister, cylinder, flames, glow, people, hands, text, logos, arrows, UI or sparkles. Include subtle contact shadows for pipe brackets and basket. Keep exact warm cream/navy/oak palette, clean brown rounded outlines and polished 2D cel shading of reference, crisp details, no blur or painterly noise. Reserve lower edge for game dialogue overlay without covering basket. 2048x1152 preferred.
