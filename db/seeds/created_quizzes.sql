INSERT INTO created_quizzes 
(id, category_id, user_id, quiz_name,
num_of_questions, difficulty,
rating, num_of_times_hosted,
total_players_played)
VALUES (1, 1, 1, 'Test quiz', 3, 5, 0, 0, 0);

ALTER SEQUENCE created_quizzes_id_seq RESTART WITH 2;
