const list = (socket, db)=>{

  // console.log('a new user connected', socket.id);

  socket.on('hostGames', (user) => {
    console.log("line 4 callback");
    let query = `SELECT created_quizzes.*, categories.category_name
    FROM categories, created_quizzes WHERE categories.id = created_quizzes.category_id`;
    db.query(query)
    .then((data)=>{
      let quizzes = data.rows;
      console.log("testing gameslist:", quizzes);
      socket.emit('gameslist', quizzes);
 
    })

    //new query
    // db.query(`SELECT * FROM categories;`)
    // .then((data)=>{
    //   let categories = data.rows;
    //   categories.forEach((category, index)=>{
    //     db.query(`SELECT * FROM created_quizzes 
    //     WHERE category_id = $1`, [category.id])
    //     .then((res)=>{
    //       category.quizList = res.rows;
    //       if(index === categories.length -1){
    //         socket.emit('gameslist', categories);
    //       }
    //     })
    //   })
    // })

    //other query
    // db.query(`SELECT * FROM created_quizzes;`)
    // .then((data)=>{
    //   let quizzes = data.rows;
    //   quizzes.forEach((quiz, index)=>{
    //     db.query(`SELECT * FROM categories 
    //     WHERE id = $1`, [quiz.category_id])
    //     .then((res)=>{
    //       quiz.categoryList = res.rows;
    //       if(index === quizzes.length -1){
    //         socket.emit('gameslist', quizzes);
    //       }
    //     })
    //   })
    // })

    // db.query(`SELECT * FROM created_quizzes;`)
    //   .then((data)=>{
    //     console.log(data.rows);
    //     socket.emit('gameslistQuizzes', data.rows);
    //   })
    // db.query(`SELECT * FROM created_quizzes;`)
    //   .then((data)=>{
    //     console.log(data.rows);
    //     socket.emit('gameslistQuizzes', data.rows);
    //   })
    // db.query(`SELECT * FROM categories;`)
    //   .then((res)=>{
    //     console.log(res);
    //     socket.emit('gameslistCategories', res.rows);
    //   })
    
    //   db.query(`SELECT * FROM questions WHERE created_quiz_id = $1`, [quiz_id])
    //   .then((res)=>{
    //     let questions = res.rows;
    //     questions.forEach((question, index)=>{
    //       db.query(`SELECT * FROM answers WHERE question_id = $1`, [question.id])
    //       .then((ans)=>{
    //         console.log(ans.rows);
    //         question.answers = ans.rows;
    //         console.log(question);
    //         if(index === questions.length-1){
    //           console.log(questions);
    //           socket.emit('GameroomQ', questions);
    //         }
    //       })
    //     })
    //   })
    // })


    // db.query(`SELECT players.id, players.gamertag, 
    // players.user_id, players.is_host, players.score, 
    // players.game_id, users.expertise_level 
    // FROM users FULL JOIN players on users.id = players.user_id
    // WHERE game_id = $1`,[1])
    // .then((xl)=>{
    //   console.log(xl.rows);
    // })
  });
  // socket.on('gameroomQuestions', (data)=>{
  //   console.log(data);
  // })
}



module.exports = {list}