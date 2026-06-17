var mysql = require("mysql2");
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
});

conn.connect(function (err) {
    if (err) {
        console.error("MySQL 연결 실패:", err);
        process.exit(1);
    } else {
        console.log("MySQL 연결 성공!");
        initializeDatabase();
    }
});

function initializeDatabase() {
    conn.query("CREATE DATABASE IF NOT EXISTS myboard DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", function (err) {
        if (err) {
            console.error("데이터베이스 생성 실패:", err);
            process.exit(1);
        }
        conn.changeUser({ database: "myboard" }, function (err) {
            if (err) {
                console.error("데이터베이스 전환 실패:", err);
                process.exit(1);
            }
            const createTableSql = `
                CREATE TABLE IF NOT EXISTS post (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            `;
            conn.query(createTableSql, function (err) {
                if (err) {
                    console.error("테이블 생성 실패:", err);
                    process.exit(1);
                }
                console.log("데이터베이스 및 테이블 초기화 완료!");
                startServer();
            });
        });
    });
}

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

function startServer() {
    app.listen(8080, function () {
        console.log("포트 8080으로 서버 대기중 ...");
    });
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/list', function (req, res) {
    conn.query("select * from post", function (err, rows, fields) {
        if (err) {
            console.error(err);
            return res.status(500).send("데이터베이스 조회 실패");
        }
        res.render('list.ejs', { data: rows });
    });
});

app.get('/enter', function (req, res) {
    res.render('enter.ejs');
});

app.post('/save', function (req, res) {
    console.log("과목명:", req.body.title);
    console.log("과목 데이터 JSON:", req.body.content);

    let sql = "insert into post (title, content) values(?, ?)";
    let params = [req.body.title, req.body.content];
    conn.query(sql, params, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send("데이터 추가 실패");
        }
        console.log('데이터 추가 성공');
        res.send(`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>등록 완료 - 시간표 조합생성기</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Outfit', 'Noto Sans KR', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 50px 40px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(12px);
        }
        .icon {
            font-size: 4rem;
            margin-bottom: 20px;
            display: inline-block;
            animation: bounce 2s infinite;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 15px;
            background: linear-gradient(to right, #a5b4fc, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            color: #94a3b8;
            margin-bottom: 40px;
            line-height: 1.6;
        }
        .btn-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .btn {
            display: block;
            padding: 14px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            text-align: center;
        }
        .btn-primary {
            background: #6366f1;
            color: white;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        }
        .btn-primary:hover {
            background: #4f46e5;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">✨</div>
        <h1>과목 등록 완료!</h1>
        <p>과목 데이터가 데이터베이스에 성공적으로 추가되었습니다.</p>
        <div class="btn-group">
            <a href="/enter" class="btn btn-primary">과목 추가 등록하기</a>
            <a href="/list" class="btn btn-secondary">시간표 & 목록 보러가기</a>
        </div>
    </div>
</body>
</html>
        `);
    });
});

app.post('/delete', function (req, res) {
    let deleteId = parseInt(req.body._id, 10);
    console.log("삭제할 ID:", deleteId);

    let sql = "delete from post where id = ?";
    let params = [deleteId];
    conn.query(sql, params, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }
        console.log('삭제 완료');
        res.status(200).send();
    });
});
