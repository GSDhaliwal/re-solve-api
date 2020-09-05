const edit = (socket, db)=>{
  console.log('edit: a user connected', socket.id);
  socket.on('quizToEdit', (quiz_id) => {
    let quizId = JSON.parse(quiz_id);
    db.query(`SELECT created_quizzes.quiz_name, created_quizzes.difficulty,categories.category_name FROM created_quizzes FULL JOIN categories on categories.id = created_quizzes.category_id WHERE created_quizzes.id = $1`, [quizId])
    .then((res) => {
      console.log(res.rows)
      socket.emit('editThisQuizTitle', res.rows)
    })
    console.log(quizId)
    db.query(`SELECT * FROM questions WHERE created_quiz_id =$1`, [quizId])
    .then((res)=>{
      let questions = res.rows;
      questions.forEach((question, index)=>{
        db.query(`SELECT * FROM answers WHERE question_id = $1`,[question.id])
        .then((ans)=>{
          question.answers = ans.rows;   
          if(index === questions.length-1){
            console.log(questions);
            socket.emit('editThisQuiz', questions)
  
          } 
        })
      })
    })
  })
}

  module.exports = {edit}
    