const create = (socket, db, io)=>{
  socket.on('createdQuiz', (testDetails) => {
    let query = 'SELECT * FROM categories WHERE category_name = $1 ;';
    db.query(query, [testDetails.category])
      .then((res)=> {
      db.query('INSERT INTO created_quizzes (category_id, quiz_name, num_of_questions, difficulty, user_id, num_of_times_hosted, total_players_played) VALUES ((SELECT id FROM categories WHERE category_name = $1), $2, $3, $4, (SELECT id from users WHERE username = $5), $6, $7) RETURNING *;', [testDetails.category, testDetails.gameTitle, testDetails.numOfQuestions, testDetails.difficulty, testDetails.username, 0, 0])
      .then((res) => {
        console.log("new quiz id", res.rows[0].id)
        io.emit("refreshHost", res.rows[0].id);
        for (let question of testDetails.questions) {
          if (question.question) {
            db.query('INSERT INTO questions (created_quiz_id, question, image, points_per_question, time_per_question) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [res.rows[0].id, question.question, question.image, question.points_per_question, question.time_per_question])
            .then((newq) => {
              for (let answer of question.answers) {
                if (answer.answer) {
                  db.query('INSERT INTO answers (question_id, correct_answer, answer) VALUES ($1, $2, $3);', [newq.rows[0].id, answer.correct_answer, answer.answer])
                }
              }
            })
          }
        }
       

        
        
      })

    
  })
})}


  module.exports = {create}