const edit = (socket, db)=>{
  socket.on('quizToEdit', (quiz_id) => {   
    let quizId = quiz_id;
    db.query(`SELECT created_quizzes.quiz_name, created_quizzes.difficulty,categories.category_name FROM created_quizzes FULL JOIN categories on categories.id = created_quizzes.category_id WHERE created_quizzes.id = $1`, [quizId])
    .then((res) => {
      socket.emit('editThisQuizTitle', res.rows)
    })
    db.query(`select questions.*, answers.* from questions 
        full join answers on answers.question_id = questions.id 
        where questions.created_quiz_id = $1`, [quiz_id])
        .then((res)=>{
          let answers = res.rows;
          let questions ={};
          let QA=[];
          for(let answer of answers){
            if(questions[answer.question_id]){
              console.log("same question more answers:", answer.answer);
              questions[answer.question_id].answers.push({answer:answer.answer, correct_answer: answer.correct_answer});
            } else{
              questions[answer.question_id] = {}
              questions[answer.question_id].answers = [{answer:answer.answer, correct_answer: answer.correct_answer}];
              questions[answer.question_id].id = answer.question_id;
              questions[answer.question_id].points_per_question = answer.points_per_question;
              questions[answer.question_id].time_per_question = answer.time_per_question;
              questions[answer.question_id].image = answer.image;
              questions[answer.question_id].question = answer.question;
              questions[answer.question_id].created_quiz_id = answer.created_quiz_id;
            }
          }
          for(let question in questions){
            QA.push(questions[question]);
          }
          socket.emit('editThisQuiz', {id:quiz_id, QA:QA});
  })
})
} 

  module.exports = {edit}
    


  /*db.query(`SELECT questions.question, questions.image, questions.points_per_question, questions.time_per_question, answers.question_id, answers.answer, answers.correct_answer FROM questions 
      INNER JOIN answers on answers.question_id = questions.id WHERE questions.created_quiz_id = $1`, [quiz_id])
      .then((res)=>{ 
        let QAndAs = res.rows;
        let correctArray = [];
        let verify = [];
        for (let i = 0; i < QAndAs.length; i++) {
        if (!(verify.includes(QAndAs[i].question_id) )) {
          verify.push(QAndAs[i].question_id)
          correctArray.push({
            id: i,
            question: QAndAs[i].question,
            image: QAndAs[i].image,
            points_per_question: QAndAs[i].points_per_question,
            time_per_question: QAndAs[i].time_per_question,
            answers: [{answer: QAndAs[i].answer, correct_answer: QAndAs[i].correct_answer}]
          }) 
        } else {
          let index = verify.indexOf(QAndAs[i].question_id)
          correctArray[index].answers.push({answer: QAndAs[i].answer, correct_answer: QAndAs[i].correct_answer})
        }
      }
        socket.emit('editThisQuiz', correctArray)
      })*/