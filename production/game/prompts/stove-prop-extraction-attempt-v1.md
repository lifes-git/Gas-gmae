# 소품 분리 시도 — 사용 보류

## 후속: 사용자 승인한 수건 배경 마스킹

사용자가 수건 자체 품질을 승인하고 재생성 없는 배경 제거에 동의함. `production/game/tools/mask_towel_background_v1.py`로 외부에 연결된 밝은 무채색 체크무늬만 마스킹. 흰 가장자리 방지를 위해 알파 1px 수축 후 0.35px 부드럽게 처리. RGB 픽셀 동일성 검사 통과, 알파 0~255 확인. 출력 `webgame-prototype/assets/masters/prop-towel-draped-alpha-v1.png`, 1536×1024. 어두운 배경 미리보기 별도 생성. Art: 수건 투명화 완료 / 주방 재합성 검수 대기. 손잡이 보류 유지, 게임 코드 변경 없음.

내장 image_gen으로 승인 합성 원본의 손잡이와 수건을 각각 배경 제거 요청. 첫 결과 모두 hasAlpha=no. 후속 체크무늬 제거 요청 후 손잡이는 hasAlpha=yes이나 불필요한 광륜과 외형 변화, 수건은 hasAlpha=no. Art: No-Go. 실제 게임 미적용, 원본 보존, 재합성 정렬 미수행. 승인 원본 픽셀을 유지하는 마스크 방식 전환을 사용자에게 제안한다.

보류 파일: `webgame-prototype/assets/masters/valve-handle-extraction-rejected-v1.png`, `webgame-prototype/assets/masters/towel-extraction-rejected-v1.png`. 최종 에셋 아님.

## 손잡이 프롬프트

Use case: background-extraction. Extract ONLY the specified existing object from this approved game illustration as an isolated PNG with a GENUINELY TRANSPARENT ALPHA BACKGROUND, not a checkerboard image or white background. Preserve exact silhouette, perspective, proportions, colors, outlines and internal details from source; do not redesign or change pose. Center the extracted object with a small transparent margin. No scenery, no added shadows, no text, no other objects. Object: the golden yellow downward-pointing valve LEVER on the right wall, including its circular yellow pivot head and central fastener. Exclude the gray valve BODY, all pipes and mounting brackets. Keep front-facing lever shape with a round pivot at the TOP and narrow rounded grip extending down. This is the movable handle ONLY.

## 수건 프롬프트

Use case: background-extraction. Extract ONLY the specified existing object from this approved game illustration as an isolated PNG with a GENUINELY TRANSPARENT ALPHA BACKGROUND, not a checkerboard image or white background. Preserve exact silhouette, perspective, proportions, colors, outlines and internal details from source; do not redesign or change pose. Center the extracted object with a small transparent margin. No scenery, no added shadows, no text, no other objects. Object: the sage green rumpled towel with two narrow ivory stripes draped across the left stove grates and down over the counter edge. Keep the EXACT spread-out draped shape and folds, not folded flat or hanging vertically. Exclude every part of the stove/grates/counter and exclude cast shadows on those surfaces. Only fabric silhouette.

## 공통 후속 프롬프트

Remove the entire checkerboard background from this single object. Output a genuinely TRANSPARENT PNG with alpha channel, not white or checkerboard pixels. Preserve the object exactly unchanged, including silhouette, color, internal details and pose. Only object pixels remain. No added shadows, no scene, no border. Clean game sprite cutout.
