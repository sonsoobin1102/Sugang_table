# 📅 대학 시간표 조합생성기 (Sugang Timetable Generator)

원하는 과목과 분반을 데이터베이스에 등록하면, 백트래킹(Backtracking) 알고리즘을 활용하여 시간 충돌이 없는 가능한 모든 시간표 조합을 자동으로 생성하고 시각화해주는 Express + MySQL + EJS 웹 애플리케이션입니다.

* **GitHub Repository**: [sonsoobin1102/Sugang_table](https://github.com/sonsoobin1102/Sugang_table)

---

## ✨ 주요 기능

- **과목 등록 및 DB 연동**: 과목명과 분반 정보(최대 3분반), 분반별 여러 시간대를 등록하여 MySQL 데이터베이스(`myboard` DB의 `post` 테이블)에 JSON 직렬화 방식으로 저장합니다.
- **자동 조합 생성**: 백트래킹 알고리즘을 사용하여 수천 가지 경우의 수 중 충돌이 없는 시간표 조합만 신속하게 추출합니다.
- **점심시간 확보 기능**: 11:00 ~ 14:00 사이에 최소 1시간의 비어있는 공강 시간이 보장되는 조합만 필터링하여 보여줍니다.
- **충돌 원인 분석**: 가능한 조합이 존재하지 않는 경우, 점심시간 침범 여부 및 과목 간 시간 겹침 원인을 분석하여 화면에 상세 리포트를 제공합니다.
- **다양한 스타일 테마**: 기본(Blue), 모던(Dark), 베이지(Warm), 사이버펑크(Neon)의 4가지 UI 테마 전환을 지원합니다.
- **이미지 저장**: 완성된 조합 시간표 그리드를 PNG 이미지 파일로 로컬에 바로 저장(다운로드)할 수 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Backend**: Node.js, Express.js
- **Database**: MySQL (연동 라이브러리: `mysql2`)
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap 5

---

## 🚀 설치 및 실행 방법 (How to Run)

이 프로젝트는 별도의 수동 데이터베이스 설정 단계 없이, 웹 서버 실행 시 **데이터베이스와 테이블이 자동으로 구축**되도록 설계되어 있습니다.

### 1. 의존성 패키지 설치
프로젝트 루트 디렉토리(`timetable`)에서 아래 명령어를 실행하여 의존 라이브러리를 설치합니다.
```bash
npm install
```

### 2. MySQL 접속 정보 확인 (필수)
이 프로젝트의 기본 데이터베이스 연결 비밀번호는 **`1234`**로 하드코딩 되어 있습니다.
* 만약 테스트 환경 PC의 MySQL root 비밀번호가 `1234`가 아니라면, [Server.js](file:///d:/coding/backend_assgiment/timetable/Server.js) 5행의 `password: "1234"` 부분을 실제 root 비밀번호로 반드시 변경해 주셔야 정상 구동됩니다.
* 해당 PC에서 MySQL 서버가 켜져(Running) 있는 상태여야 합니다.

### 3. 서버 실행 (자동 DB 구축)
아래 명령을 통해 서버를 실행합니다.
```bash
node Server.js
```
* 서버가 실행되면 콘솔 창에 `데이터베이스 및 테이블 초기화 완료!` 로그가 뜨며, `myboard` 데이터베이스와 `post` 테이블이 존재하지 않는 경우 자동으로 안전하게 생성합니다. (이미 존재한다면 기존 데이터가 유실되지 않고 안전하게 유지됩니다.)

### 4. 웹 브라우저 접속
크롬(Chrome) 등의 브라우저를 열고 아래 주소로 접속합니다.
- **메인 홈**: [http://localhost:8080/](http://localhost:8080/)
- **과목 등록**: [http://localhost:8080/enter](http://localhost:8080/enter)
- **시간표 조합 확인**: [http://localhost:8080/list](http://localhost:8080/list)


