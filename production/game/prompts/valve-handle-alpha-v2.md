# 밸브 손잡이 분리 v2

승인한 `stove-front-props-preview-v1.png`에서 손잡이만 수동 윤곽 알파 마스킹. AI 재생성 없음. 원본 RGB와 크기를 유지하고 회색 고정 몸체·배관을 제외했다. 제작 스크립트: `production/game/tools/extract_valve_handle_v2.py`.

출력: `webgame-prototype/assets/masters/prop-valve-handle-alpha-v2.png`, 224×224 RGBA. 회전축 (112,112), 장면 기준 (1435,326), 배경 1672×941. 투명 여백은 회전축을 중앙에 놓기 위한 것이며 이미지 전체 크기를 손잡이 실물 크기로 해석하지 않는다. 원본 손잡이의 실제 픽셀 수는 작으므로 모달에서 큰 폭 확대 시 선명도 한계가 있다.

세로/가로 배치 미리보기: `production/game/qa/stove-valve-vertical-preview-v2.png`, `production/game/qa/stove-valve-horizontal-preview-v2.png`. 90도 회전 시 고정 몸체가 움직이지 않는 구조를 확인하기 위한 시안이다. 안전 상태 및 회전 방향은 안전 검수 전 확정하지 않음. 게임 코드 변경 없음.

SHA256: `5f9985075309fb1834d1115e2866a91b106c433df77880d2a1c726d21976019a`

Art: 배치 시안 Go / 사용자 외관 검수 대기 / 확대 모달 해상도와 안전 표현 검수 미완료.
