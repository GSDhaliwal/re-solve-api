const userCreatedQuizzes = (socket, db)=>{
  
  socket.on('requestUserCreatedQuizzes', (username) => {
    console.log('What is this', username)
    if(username){
      db.query(`SELECT id FROM users WHERE username = $1;`, [username.username])
      .then((data)=>{
        console.log('What is', data.rows)
        db.query(`SELECT created_quizzes.id, 
        created_quizzes.quiz_name, created_quizzes.num_of_questions, 
        created_quizzes.difficulty, created_quizzes.rating, 
        created_quizzes.num_of_times_hosted, 
        created_quizzes.total_players_played, 
        categories.category_name FROM created_quizzes 
        INNER JOIN categories on 
        created_quizzes.category_id = categories.id 
        WHERE user_id = $1;`, [data.rows[0].id])
        .then((res) => {
          socket.emit('receivedUserCreatedQuizzes', res.rows)
        })
   
      })
    }
    

    
  });
}

module.exports = userCreatedQuizzes;