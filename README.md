# 📅 대학 시간표 조합생성기 (Sugang Timetable Generator)

원하는 과목과 분반을 데이터베이스에 등록하면, 백트래킹(Backtracking) 알고리즘을 활용하여 시간 충돌이 없는 가능한 모든 시간표 조합을 자동으로 생성하고 시각화해주는 Express + MySQL + EJS 웹 애플리케이션입니다.

* **GitHub Repository**: [sonsoobin1102/Sugang_table](https://github.com/sonsoobin1102/Sugang_table)

---

## ✨ 주요 기능

- **과목 등록 및 DB 연동**: 과목명과 분반 정보(최대 3분반), 분반별 여러 시간대를 등록하여 MySQL 데이터베이스(`myboard` DB의 `post` 테이블)에 JSON 직렬화 방식으로 저장합니다.
- **자동 조합 생성**: 백트래킹 알고리즘을 사용하여 수천 가지 경우의 수 중 충돌이 없는 시간표 조합만 신속하게 추출합니다.
- **점심시간 확보 기능**: 11:00 ~ 14:00 사이에 최소 1시간의 비어있는 공강 시간이 보장되는 조합만 필터링하여 보여줍니다.
- **충돌 원인 분석**: 가능한 조합이 존재하지 않는 경우, 점심시간 침범 여부 및 과목 간 시간 겹침 원인을 분석하여 화면에 상세 리포트를 제공합니다.
- **이미지 저장**: 완성된 조합 시간표 그리드를 PNG 이미지 파일로 로컬에 바로 저장(다운로드)할 수 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Backend**: Node.js, Express.js
- **Database**: MySQL (연동 라이브러리: `mysql2`)
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap 5

---

## 🚀 설치 및 실행 방법 (How to Run)

배포받은 다른 PC 또는 새로운 환경에서 이 프로젝트를 바로 기동하려면 다음 단계를 순서대로 따라 해 주세요.
사용자가 수동으로 데이터베이스를 만들거나 SQL 스크립트를 터미널에 주입할 필요가 없도록 개선되었습니다.

---

### 1단계: 터미널에서 프로젝트 폴더로 이동
터미널(CMD 또는 PowerShell)을 실행하고, 압축을 푼 프로젝트의 핵심 루트 디렉토리(`timetable`)로 경로를 이동합니다.
```bash
cd timetable
```

---

### 2단계: MySQL 서버 실행 상태 및 비밀번호 확인
1. 로컬 환경에 MySQL Server가 켜져 있는지 확인합니다.
2. **[중요] MySQL root 비밀번호 설정**:
   - 이 프로젝트는 기본적으로 MySQL root 계정의 비밀번호가 **`1234`**인 상태를 기준으로 연결합니다.
   - 만약 본인의 MySQL root 비밀번호가 `1234`가 아니라면, [Server.js](file:///d:/coding/backend_assgiment/timetable/Server.js) 5번 줄의 `password: "1234"` 부분을 본인 환경에 맞춰 수정한 뒤 저장해 주세요.

---

### 3단계: 의존성 패키지 설치
이동한 경로(`timetable`)에서 아래 명령어를 실행하여 구동에 필요한 라이브러리를 다운로드합니다.
```bash
npm install
```

---

### 4단계: 웹 서버 구동 (자동 데이터베이스 & 테이블 셋업)
서버를 켭니다.
```bash
node Server.js
```

> 💡 **알아두기**:
> 서버가 켜지는 첫 시점에 MySQL에 자동으로 접속하여 `myboard` 데이터베이스와 `post` 테이블이 존재하지 않으면 자동으로 생성(초기화)합니다. 
> 이전 버전처럼 터미널에서 복잡한 `mysql -u root -p < schema.sql` 같은 명령어를 환경변수까지 맞춰가며 실행할 필요가 전혀 없습니다!
> 또한, 서버를 재시작해도 기존에 입력하셨던 시간표 데이터는 안전하게 보존됩니다.

서버가 정상적으로 켜지면 콘솔창에 아래와 같은 로그가 표시됩니다:
```text
MySQL 연결 성공!
데이터베이스 및 테이블 초기화 완료!
포트 8080으로 서버 대기중 ...
```

---

### 5단계: 웹 브라우저 접속
크롬(Chrome) 등의 브라우저를 열고 아래 주소로 접속해 다양한 시간표 조합 생성 기능을 활용해 보세요!

* **메인 홈 (조합 생성기)**: [http://localhost:8080/](http://localhost:8080/)
* **과목 정보 등록**: [http://localhost:8080/enter](http://localhost:8080/enter)
* **등록 과목 목록 및 저장된 시간표**: [http://localhost:8080/list](http://localhost:8080/list)
