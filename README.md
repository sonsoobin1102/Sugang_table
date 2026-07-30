# 📅 대학 시간표 조합생성기 (Sugang Timetable Generator)

원하는 과목과 분반을 등록하면, 백트래킹(Backtracking) 알고리즘을 활용하여 시간 충돌이 없는 가능한 모든 시간표 조합을 자동으로 생성하고 시각화해주는 웹 애플리케이션입니다.

* **GitHub Repository**: [sonsoobin1102/Sugang_table](https://github.com/sonsoobin1102/Sugang_table)

---

## ✨ 주요 기능

- **과목 정보 등록**: 과목명과 분반 정보(최대 3분반), 분반별 강의 시간대를 등록하여 저장 및 관리합니다.
- **자동 조합 생성**: 백트래킹 알고리즘을 사용하여 충돌이 없는 시간표 조합을 추출합니다.
- **점심시간 확보 기능**: 11:00 ~ 14:00 사이에 최소 1시간의 공강 시간이 보장되는 조합을 필터링합니다.
- **충돌 원인 분석**: 가능한 조합이 없는 경우 시간 겹침 원인 및 점심시간 침범 여부를 분석합니다.
- **이미지 저장**: 완성된 조합 시간표를 PNG 이미지 파일로 로컬에 저장(다운로드)할 수 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), EJS, jQuery, Bootstrap 5

---

## 🚀 설치 및 실행 방법 (How to Run)

---

### 1단계: 터미널에서 프로젝트 폴더로 이동
```bash
cd timetable
```

---

### 2단계: 의존성 패키지 설치
```bash
npm install
```

---

### 3단계: 테스트 실행
```bash
npm test
```

---

### 4단계: 웹 서버 구동
```bash
node Server.js
```

---

### 5단계: 웹 브라우저 접속
* **메인 홈 (조합 생성기)**: [http://localhost:8080/](http://localhost:8080/)
* **과목 정보 등록**: [http://localhost:8080/enter](http://localhost:8080/enter)
* **등록 과목 목록 및 저장된 시간표**: [http://localhost:8080/list](http://localhost:8080/list)
