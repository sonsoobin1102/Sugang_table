const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static asset middleware
app.use('/js', express.static(path.join(__dirname, 'js')));

// View engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// Main page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Subject entry page
app.get('/enter', function (req, res) {
    res.render('enter.ejs');
});

// Timetable and subject list page
app.get('/list', function (req, res) {
    res.render('list.ejs', { data: [] });
});

// Start server
if (require.main === module) {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, function () {
        console.log(`포트 ${PORT}에서 서버 대기 중... (DB 다운로드 없이 브라우저 저장소 모드로 작동)`);
    });
}

module.exports = app;
