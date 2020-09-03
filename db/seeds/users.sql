INSERT INTO users (id, username, password, expertise_level)

VALUES (1, 'HenryM', 123, 'god');

INSERT INTO users (id, username, password, expertise_level)
VALUES (2, 'Rob', 123, 'noob');

INSERT INTO users (id, username, password, expertise_level)
VALUES(3, 'Hanna', 123, 'noobish');

INSERT INTO users (id, username, password, expertise_level)
VALUES(4, 'Felipe', 123, 'LORD');

ALTER SEQUENCE users_id_seq RESTART WITH 5;