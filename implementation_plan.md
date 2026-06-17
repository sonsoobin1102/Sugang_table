# Node.js 서버 실행 시 MySQL 자동 초기화 및 배포 가이드 개선 계획

이 계획은 배포 대상 기기에서 수동으로 MySQL CLI 명령(`mysql -u root -p < schema.sql`)을 실행해야 하는 번거로움과 환경 변수 미설정 문제를 해결하기 위해, 애플리케이션 시작 시 데이터베이스와 테이블을 안전하고 자동화된 방식으로 생성하도록 개선하는 계획입니다. 또한 이 과정에 맞게 실행 가이드를 배포 대상자 기준으로 쉽고 친절하게 개편합니다.

## User Review Required

> [!IMPORTANT]
> **데이터 보존을 위한 스키마 파일 변경**
> 기존 `schema.sql`에 포함되어 있던 `DROP TABLE IF EXISTS post;` 구문을 그대로 매 기동 시 실행하면 기존 사용자가 입력했던 시간표 데이터가 유실됩니다. 따라서 `schema.sql`에서 `DROP TABLE` 명령을 제거하고, `CREATE TABLE IF NOT EXISTS` 구문만 사용하도록 수정합니다.

## Proposed Changes

### Database & Application Configuration

---

#### [MODIFY] [schema.sql](file:///c:/sugang/Sugang_table/timetable/schema.sql)

- `DROP TABLE IF EXISTS post;` 구문을 주석 처리 또는 삭제하여 매 서버 실행 시 기존 데이터가 날아가지 않도록 안전성을 확보합니다.

#### [MODIFY] [Server.js](file:///c:/sugang/Sugang_table/timetable/Server.js)

- 처음 MySQL 연결 시 `database` 명시를 제거하여 `myboard` 데이터베이스가 아직 없는 신규 기기에서도 접속 에러가 안 나게 합니다.
- 연결 성공 후 `CREATE DATABASE IF NOT EXISTS myboard`를 실행합니다.
- `USE myboard` (또는 `changeUser` API) 실행을 수행하여 데이터베이스를 연동합니다.
- `CREATE TABLE IF NOT EXISTS post ...`를 실행하여 테이블이 존재하지 않을 때만 생성합니다.
- 이 비동기 DB 초기화 작업이 성공적으로 끝난 콜백 시점에 `app.listen(8080)`이 호출되도록 변경합니다.

---

### Documentation

#### [MODIFY] [README.md](file:///c:/sugang/Sugang_table/README.md)

#### [MODIFY] [README.md](file:///c:/sugang/Sugang_table/timetable/README.md)

- 수동 MySQL 터미널 가이드를 제거합니다.
- 사용자가 데이터베이스를 수동으로 설정할 필요 없이 `node Server.js` 명령만 실행하면 자동으로 설정됨을 명시합니다.
- 배포받은 사람 관점에서 직관적이고 친절하게 단계를 나열하여 가이드라인을 개편합니다.

## Verification Plan

### Automated Tests

- DB 초기화 관련 코드가 추가된 후 `npm test`가 정상 작동하는지(또는 에러가 발생하지 않는지) 사전 확인합니다. (현재 package.json에 명시된 더미 테스트 커맨드가 있어 테스트 자체가 실패하게 되어 있으므로 이 테스트 동작도 확인합니다.)

### Manual Verification

1. 로컬 환경에서 `myboard` 데이터베이스를 임의로 삭제(`DROP DATABASE myboard`)해 봅니다.
2. `node Server.js`를 실행하여 콘솔 로그에 DB 연결 성공 및 데이터베이스/테이블 자동 생성 메시지가 나오는지 검증합니다.
3. 데이터베이스 툴(HeidiSQL, DBeaver 등)을 통해 테이블(`post`)이 정상적으로 복구되었는지 확인합니다.
4. 웹사이트(`http://localhost:8080/`)에 접속하여 과목 등록 및 조회 기능이 이전과 동일하게 완벽하게 작동하는지 검증합니다.
