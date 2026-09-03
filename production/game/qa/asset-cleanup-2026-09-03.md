# 미사용 에셋 정리

- 2026-09-03: 56개 파일 약 59.8 MiB를 프로젝트 밖 임시 백업으로 이동.
- 범위: 코드에서 파일명으로도 참조되지 않는 구버전 에셋과 거절된 신규 주방 시안 2개. `.DS_Store` 2개 포함.
- 보존: HTML/CSS/JS/CJS 참조 파일, 같은 이름의 원본, 아트 바이블 직접 참조, 현행 제목·수건·캔의 재편집용 원본, 최신 화풍 일치 주방 검토 시안.
- 방법: production/game/tools/audit-unused-assets.mjs. 동적 경로의 basename도 포함해 보수적으로 검사.
- 백업: /var/folders/n3/zp4pxg7n7bv_c8bvmkm3jrfm0000gn/T/gas-game-unused-assets-smRUQA (OS 정리 전 복원 가능). inventory.json에 정확한 목록 기록.
- 추적된 파일은 삭제 커밋 이전 Git 이력에서도 복원 가능. 과거 이력은 재작성하지 않음.
- 과거 asset-manifest / 프롬프트에 있는 경로는 제작 이력이며 파일 보존을 의미하지 않음. 이번 정리 이후에는 본 기록을 함께 참조.
- 실제 기기 플레이테스트는 하지 않음. 코드 참조와 삭제 대상 비중복 확인.
