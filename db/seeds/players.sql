INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (1, 1, 'photographer', 0, false, 2);

INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (2, 1, 'bigdaddy', 0, true, 1);

INSERT INTO players (id, game_id, gamertag, score, is_host)
VALUES (3, 1, 'hello', 0, false);

INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (4, 1, 'Hero Kai', 0, false, 1);

INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (5, 1, 'Slayer', 0, false, 2);

INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (6, 1, 'Swagger', 0, false, 3);

INSERT INTO players (id, game_id, gamertag, score, is_host, user_id)
VALUES (7, 2, 'Snails', 0, false, 4);

ALTER SEQUENCE players_id_seq RESTART WITH 8;