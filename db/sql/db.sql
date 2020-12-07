CREATE DATABASE ballparkapp;

CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    league VARCHAR(50) NOT NULL,
    img BYTEA
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    favorite_team_id INT REFERENCES teams (id) ON DELETE SET NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    age SMALLINT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    img BYTEA
);

CREATE TABLE players (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    team_id INT REFERENCES teams (id) ON DELETE SET NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(2) NOT NULL,
    img BYTEA
);

CREATE TABLE ballparks (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    home_team_id INT REFERENCES teams (id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    img BYTEA
);

CREATE TABLE visits (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    ballpark_id INT REFERENCES ballparks (id) NOT NULL,
    away_team_id INT REFERENCES teams (id) NOT NULL,
    start_date DATE,
    end_date DATE,
    game_time TIME
);

CREATE TABLE pictures (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    visit_id INT REFERENCES visits (id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(50),
    description TEXT,
    img BYTEA,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE autographs (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    player_id INT REFERENCES players (id) ON DELETE SET NULL,
    img BYTEA
);