# 📅 대학 시간표 조합생성기 (Sugang Timetable Generator)

별도의 프로그램 설치나 다운로드 없이 웹 브라우저에서 바로 사용할 수 있는 대학 시간표 자동 조합 생성 웹 애플리케이션입니다.
원하는 과목과 분반을 등록하면, 백트래킹(Backtracking) 알고리즘을 활용하여 시간 충돌이 없는 가능한 모든 시간표 조합을 자동으로 생성하고 시각화해 줍니다.

* **웹 서비스 링크**: [https://sonsoobin1102.github.io/Sugang_table/](https://sonsoobin1102.github.io/Sugang_table/)
* **GitHub Repository**: [sonsoobin1102/Sugang_table](https://github.com/sonsoobin1102/Sugang_table)

---

## ✨ 주요 기능

- **과목 정보 등록**: 과목명과 분반 정보(최대 5분반), 분반별 강의 시간대를 등록하여 브라우저 저장소에 안전하게 저장 및 관리합니다.
- **자동 조합 생성**: 백트래킹 알고리즘을 사용하여 수천 가지 경우의 수 중 충돌이 없는 시간표 조합만 신속하게 추출합니다.
- **점심시간 확보 기능**: 11:00 ~ 14:00 사이에 최소 1시간의 비어있는 공강 시간이 보장되는 조합을 필터링합니다.
- **충돌 원인 분석**: 가능한 조합이 없는 경우 시간 겹침 원인 및 점심시간 침범 여부를 리포트로 제공합니다.
- **이미지 저장**: 완성된 조합 시간표 그리드를 PNG 이미지 파일로 바로 저장(다운로드)할 수 있습니다.

---

## 🌐 사용 방법 (Web Access)

별도의 프로그램 설치나 개발 환경 설정이 전혀 필요 없습니다.

1. 웹 브라우저(Chrome, Edge 등)를 실행합니다.
2. 아래 웹 서비스 주소로 바로 접속합니다:
   - 👉 **[시간표 조합생성기 바로가기](https://sonsoobin1102.github.io/Sugang_table/)**
3. 과목 및 분반 정보를 등록한 후 자동 생성된 시간표 조합을 확인합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Algorithm**: Backtracking Combinatorial Algorithm
- **Storage**: Web Storage API (LocalStorage)
