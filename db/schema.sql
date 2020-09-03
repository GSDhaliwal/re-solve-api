DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS created_quizzes CASCADE;
DROP TABLE IF EXISTS user_played_games CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS players CASCADE;


CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  expertise_level VARCHAR(255)
);

CREATE TABLE created_quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_name VARCHAR(255) NOT NULL,
  num_of_questions INT NOT NULL,
  difficulty INT,
  rating INT,
  num_of_times_hosted INT,
  total_players_played INT
);
CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  created_quiz_id INTEGER REFERENCES created_quizzes(id) ON DELETE CASCADE,
  game_code VARCHAR(255),
  competition_mode_enabled BOOLEAN,
  host_id INT
);



CREATE TABLE players (
  id SERIAL PRIMARY KEY NOT NULL,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  gamertag VARCHAR(255),
  score INT,
  is_host BOOLEAN,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);




CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  created_quiz_id INTEGER REFERENCES created_quizzes(id) ON DELETE CASCADE,
  question VARCHAR(255),
  image VARCHAR(255),
  points_per_question INT,
  time_per_question INT
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  correct_answer BOOLEAN,
  answer VARCHAR(255)
);

CREATE TABLE user_played_games (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE
);