INSERT INTO games 
(id, created_quiz_id, game_code, competition_mode_enabled, is_active, host_id)
VALUES (1, 1, 'bd', false,true ,17);

INSERT INTO games 
(id, created_quiz_id, game_code, competition_mode_enabled, is_active, host_id)
VALUES (2, 2, 'ab', false, false, 20);

INSERT INTO games (id, created_quiz_id, game_code, competition_mode_enabled, is_active, host_id)
VALUES (3, 1, 'abc', false, false, 2);

ALTER SEQUENCE games_id_seq RESTART WITH 4;