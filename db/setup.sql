DROP DATABASE IF EXISTS charades_words;
CREATE DATABASE charades_words;

\c charades_words;

CREATE TABLE words (
    word_id SERIAL PRIMARY KEY,
    word VARCHAR NOT NULL
);