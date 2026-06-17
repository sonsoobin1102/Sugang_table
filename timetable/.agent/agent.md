# Timetable 프로젝트 에이전트 개발 지침 (Timetable Project Agent Guidelines)

이 문서는 `timetable` 프로젝트를 기말고사 대비 `Server` 예제 코드의 아키텍처 및 디렉토리 구조와 완벽히 동일하게 구성하여 개발하도록 안내하는 에이전트 지침서입니다. 에이전트는 이 프로젝트 내에서 코드를 추가, 수정 또는 리팩토링할 때 본 지침을 최우선으로 준수해야 합니다.

---

## 1. 프로젝트 파일 구조 (Directory Structure)

현재 `timetable` 디렉토리를 학습용 `Server` 프로젝트의 루트 디렉토리로 취급하며, 하위 디렉토리 및 파일 구조를 다음과 같이 구성합니다.

```text
d:\coding\backend_assgiment\timetable\
├── package.json          # Express, ejs, mysql2 등의 의존성 및 프로젝트 메타데이터 정의
├── package-lock.json     # 의존성 잠금 파일
├── Server.js             # Express 기반 메인 웹 서버 및 MySQL DB 연동 비즈니스 로직 구현 파일
├── httpServer.js         # 기본 Node.js 내장 http 모듈을 사용한 테스트용 서버 파일 (기본 템플릿)
├── index.html            # 메인 정적 HTML 페이지 (서버의 루트 '/' 경로에서 로드됨)
├── view/                 # ejs 템플릿 파일이 위치하는 디렉토리
│   ├── enter.ejs         # 데이터 입력 폼 (Bootstrap 기반)
│   └── list.ejs          # 데이터 목록 조회 및 jQuery AJAX 기반 삭제 기능 구현 (Bootstrap 기반)
└── node_modules/         # 설치된 npm 패키지 디렉토리
```

---

## 2. 기술 스택 및 환경 설정 규격

- **Runtime**: Node.js
- **Backend Framework**: Express.js (v4.22.x 이상)
- **Database**: MySQL (연동 모듈: `mysql2`)
  - **DB 연결 규격**:
    ```javascript
    var mysql = require("mysql2");
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "myboard", // 학습 예제 데이터베이스 명칭 유지
    });
    conn.connect();
    ```
- **Template Engine**: EJS (`ejs` 패키지 사용)
  - 뷰 폴더 설정: `app.set('views', __dirname + '/view');`
  - 뷰 엔진 설정: `app.set('view engine', 'ejs');`
- **Body Parser**: POST 요청 바디 파싱을 위해 `body-parser` 모듈 사용 (`app.use(bodyParser.urlencoded({extended:true}));`)
- **Frontend CSS**: Bootstrap 5 (CDN 연동)
- **Frontend JS**: jQuery 1.12.4 (AJAX 처리용 CDN 연동)

---

## 3. 핵심 기능별 구현 및 코딩 스타일 지침

에이전트는 모든 로직을 구현할 때 예제 소스코드(`Server.js`, `list.ejs`, `enter.ejs`)에서 제공된 문법과 구조 패턴을 동일하게 적용해야 합니다.

### A. 서버 설정 및 라우팅 (`Server.js`)
- 포트 번호는 `8080`을 대기 포트로 사용합니다.
- 기본 라우팅 구성:
  - `GET /` : 정적 `index.html` 파일을 클라이언트에 전송합니다. (`res.sendFile(__dirname + '/index.html');`)
  - `GET /list` : MySQL 데이터베이스에서 목록 데이터를 조회하고 `list.ejs`를 렌더링합니다. (`conn.query("select * from ...", function(err, rows) { res.render('list.ejs', { data: rows }); })`)
  - `GET /enter` : 데이터 입력을 위한 `enter.ejs` 페이지를 렌더링합니다.
  - `POST /save` : 클라이언트가 전송한 POST 바디 데이터를 파싱하여 MySQL 데이터베이스에 INSERT 쿼리를 실행한 뒤 결과를 반환합니다.
  - `POST /delete` : 클라이언트가 AJAX를 통해 요청한 `_id`를 기반으로 MySQL 데이터베이스에서 DELETE 쿼리를 실행하고 성공 여부(200 OK 등)를 반환합니다.

### B. 데이터 입력 UI (`view/enter.ejs`)
- Bootstrap 5를 활용하여 디자인하며, `<form>` 태그의 `action`을 `/save`로, `method`를 `post`로 지정합니다.
- 입력 필드(예: 시간표 데이터, 과목 정보 등)에 적절한 `name` 속성을 부여하여 `req.body`로 안전하게 바인딩될 수 있도록 합니다.

### C. 데이터 조회 및 비동기 삭제 UI (`view/list.ejs`)
- 조회 화면은 HTML `<table>` 엘리먼트와 Bootstrap 테이블 스타일 클래스(`table table-hover table-striped text-center`)를 사용합니다.
- EJS 제어 흐름 태그(`<% for(let i=0; i < data.length; i++){ %> ... <% } %>`)를 활용하여 행(`<tr>`) 단위로 데이터를 출력합니다.
- 행 내부의 삭제 버튼에는 `class="delete"` 및 데이터 식별을 위한 `data-id="<%= data[i].id %>"` 속성을 정의합니다.
- jQuery AJAX를 사용하여 다음과 같이 삭제 기능을 바인딩합니다:
  ```javascript
  $('.delete').click(function (e) {
      let sid = $(this).attr('data-id');
      let item = $(this);
      $.ajax({
          type: 'post',
          url: '/delete',
          data: { _id: sid }
      }).done(function (result) {
          // 성공 시 해당 테이블 행을 DOM에서 제거
          item.parent('td').parent('tr').remove();
      }).fail(function (xhr, textStatus, errorThrown) {
          console.log('삭제 실패');
      });
  });
  ```

---

## 4. 에이전트 행동 지침 및 품질 요구사항 (Rules & Principles)

1. **SOLID 설계 원칙 준수**: 각 모듈과 함수는 단일 책임 원칙(SRP)을 포함한 SOLID 원칙을 최대한 존중하며 코드를 유연하고 확장 가능하게 작성합니다.
2. **테스트 및 검증**: 코드를 커밋하거나 작업을 완료하기 전에 항상 터미널에서 `npm test`를 실행하여 모든 기존 테스트가 통과하는지 확인해야 합니다.
3. **리소스 정리**: 개발 과정에서 임시로 생성했거나 더 이상 사용하지 않는 파일, 스크립트 등은 리포지토리의 깔끔함을 유지하기 위해 반드시 즉시 제거합니다.
4. **한글 커뮤니케이션**: 모든 설명, 로그, 대화 피드백은 한국어로 진행합니다.
