# 📅 대학 시간표 조합생성기 (Sugang Timetable Generator)

원하는 과목과 분반을 데이터베이스에 등록하면, 백트래킹(Backtracking) 알고리즘을 활용하여 시간 충돌이 없는 가능한 모든 시간표 조합을 자동으로 생성하고 시각화해주는 Express + MySQL + EJS 웹 애플리케이션입니다.

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

### 1. MySQL 데이터베이스 및 테이블 구축

로컬 MySQL 서버를 실행한 뒤, 동봉된 `schema.sql` 스크립트를 실행하여 데이터베이스와 테이블을 생성합니다.

```bash
# MySQL 접속 후 스크립트 실행 또는 GUI 툴(HeidiSQL, Workbench 등)에서 실행
mysql -u root -p < schema.sql
```

*기본 설정: 호스트 `localhost`, 계정 `root`, 비밀번호 `1234`, 데이터베이스 `myboard`, 테이블 `post`*
*만약 MySQL 비밀번호가 다를 경우 `Server.js` 상단의 데이터베이스 커넥션 설정 코드에서 비밀번호를 수정해 주세요.*

### 2. 의존성 패키지 설치

프로젝트 루트 디렉토리(`timetable`)에서 아래 명령어를 실행하여 의존 라이브러리를 설치합니다.

```bash
npm install
```

### 3. 서버 실행

서버를 기동합니다.

```bash
node Server.js
```

서버가 정상 구동되면 터미널에 `포트 8080으로 서버 대기중 ...` 메시지가 출력됩니다.

### 4. 웹 브라우저 접속

크롬(Chrome) 등의 브라우저를 열고 아래 주소로 접속합니다.

- **메인 홈**: [http://localhost:8080/](http://localhost:8080/)
- **과목 등록**: [http://localhost:8080/enter](http://localhost:8080/enter)
- **시간표 조합 확인**: [http://localhost:8080/list](http://localhost:8080/list)

## 다른 환경(압축 해제 후)에서 실행 방법

전달받은 압축 파일(`timetable_project.zip`)을 다른 PC나 새로운 개발 환경에서 해제하고 테스트할 때는 아래 순서대로 진행합니다.

### 1. 압축 해제 및 경로 이동

압축 파일의 압축을 푼 뒤, 터미널을 열고 해당 프로젝트 폴더로 이동합니다.

```bash
cd timetable
```

### 2. 의존성 패키지 재설치

압축 파일에는 대용량의 `node_modules` 폴더가 들어있지 않으므로, 아래 명령어를 실행하여 필요한 패키지를 새로 설치해 주어야 합니다.

```bash
npm install
```

### 3. MySQL 데이터베이스 및 테이블 구축

테스트 대상 PC에 MySQL Server가 켜져 있는지 확인한 후, 아래 명령어를 통해 데이터베이스 스키마를 적용합니다.

* **Windows PowerShell 환경인 경우 (추천)**:

  ```powershell
  Get-Content schema.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
  ```
* **일반 CMD 환경인 경우**:

  ```bash
  mysql -u root -p < schema.sql
  ```

  *(비밀번호를 입력하라는 메시지가 뜨면 해당 PC의 MySQL root 비밀번호를 입력합니다.)*

> **[IMPORTANT] MySQL 비밀번호 관련 필수 확인사항**
>
> * 이 프로젝트의 기본 데이터베이스 연결 비밀번호는 **`1234`**로 하드코딩 되어 있습니다.
> * 만약 테스트 환경 PC의 MySQL root 비밀번호가 `1234`가 아니라면, [Server.js](file:///d:/coding/backend_assgiment/timetable/Server.js)의 5번 줄 `password: "1234"` 부분을 해당 PC의 실제 root 비밀번호로 반드시 수정해 주어야 웹 서버와 DB가 정상 연동됩니다.

### 4. 서버 실행 및 결과 확인

서버 구동 명령을 내립니다.

```bash
node Server.js
```

서버가 켜지면 웹 브라우저를 열고 **[http://localhost:8080/](http://localhost:8080/)**로 접속하여 기능을 테스트합니다.
