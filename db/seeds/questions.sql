INSERT INTO questions 
(id, created_quiz_id, question, points_per_question, time_per_question)
VALUES (1, 1, 'what is 1+1?', 100, 2);


INSERT INTO questions 
(id, created_quiz_id, question, points_per_question, time_per_question)
VALUES (2, 1, 'what is 2+2?', 250, 3);

INSERT INTO questions 
(id, created_quiz_id, question, points_per_question, time_per_question)
VALUES (3, 1, 'what is 3+3?', 500, 4);

ALTER SEQUENCE questions_id_seq RESTART WITH 4;
