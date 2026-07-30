-- 데이터베이스 생성 (존재하지 않을 경우)
CREATE DATABASE IF NOT EXISTS myboard DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE myboard;

-- 과목 데이터를 저장할 post 테이블 생성
CREATE TABLE IF NOT EXISTS post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,      -- 과목명
    content TEXT NOT NULL             -- 과목 상세 정보 (학점, 분반, 시간대 정보가 직렬화된 JSON 문자열)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
