CREATE DATABASE ballparkapp;

CREATE TABLE team (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    league VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE user (
    id BIGSERIAL PRIMARY KEY,
    favorite_team_id INT REFERENCES teams (id) ON DELETE SET NULL,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    age SMALLINT NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE player (
    id BIGSERIAL PRIMARY KEY,
    team_id INT REFERENCES teams (id) ON DELETE SET NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    position VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ballpark (
    id BIGSERIAL PRIMARY KEY,
    home_team_id INT REFERENCES teams (id) ON DELETE CASCADE NOT NULL,
    name VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE visit (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    ballpark_id INT REFERENCES ballparks (id) NOT NULL,
    away_team_id INT REFERENCES teams (id) NOT NULL,
    start_date DATE,
    end_date DATE,
    game_time TIME
);

CREATE TABLE picture (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    visit_id INT REFERENCES visits (id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE autograph (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
    player_id INT REFERENCES players (id) ON DELETE SET NULL
);