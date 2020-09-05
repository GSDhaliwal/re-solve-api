const create = (socket, db)=>{
  console.log('crqu: a user connected', socket.id);
  socket.on('createdQuiz', (testDetails) => {
    console.log('3333', testDetails)
    let query = 'SELECT * FROM categories WHERE category_name = $1 ;';
    db.query(query, [testDetails.category])
      .then((res)=> {
      db.query('INSERT INTO created_quizzes (category_id, quiz_name, num_of_questions, difficulty) VALUES ((SELECT id from categories WHERE category_name = $1), $2, $3, $4);', [testDetails.category, testDetails.gameTitle, testDetails.numOfQuestions, testDetails.difficulty])
      .then((res) => {
        for (let question of testDetails.questions) {
          if (question.question) {
            db.query('INSERT INTO questions (created_quiz_id, question, image, points_per_question, time_per_question) VALUES ((SELECT id from created_quizzes WHERE quiz_name = $1 AND num_of_questions = $2 AND difficulty = $3), $4, $5, $6, $7);', [testDetails.gameTitle, testDetails.numOfQuestions, testDetails.difficulty, question.question, question.image, question.points_per_question, question.time_per_question])
            .then((res) => {
              for (let answer of question.answers) {
                console.log("ANSWER", answer)
                if (answer.answer) {
                  db.query('INSERT INTO answers (question_id, correct_answer, answer) VALUES ((SELECT id from questions WHERE question = $1 AND points_per_question = $2 AND time_per_question = $3), $4, $5);', [question.question, question.points_per_question, question.time_per_question, answer.correct_answer, answer.answer])
                }
              }
            })
          }
        }
       

        
        
      })

    
  })
})}


  module.exports = {create}