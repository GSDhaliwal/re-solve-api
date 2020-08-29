-- DROP TABLE IF EXISTS days CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE created_quizes (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  user_id INTEGER REFERENCES users(id),
  quiz_name VARCHAR(255) NOT NULL,
  num_of_questions INT NOT NULL,
  difficulty VARCHAR(255),
  rating INT,
  num_of_times_hosted INT,
  total_players_played INT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  user_expertise_level VARCHAR(255)
);

CREATE TABLE user_played_games (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  games_id INTEGER REFERENCES games(id)
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  created_quiz_id INTEGER REFERENCES created_quizes(id),
  game_code VARCHAR(255),
  competition_mode_enabled BOOLEAN
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  created_quiz_id INTEGER REFERENCES created_quizes(id),
  quiz_key VARCHAR(255),
  question VARCHAR(255),
  image VARCHAR(255),
  points_per_question INT,
  time_per_question INT
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id),
  correct_answer BOOLEAN,
  answer VARCHAR(255)
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY NOT NULL,
  game_id INTEGER REFERENCES games(id),
  player_gamertag VARCHAR(255),
  score INT,
  is_host BOOLEAN,
  user_id INTEGER REFERENCES users(id)
);