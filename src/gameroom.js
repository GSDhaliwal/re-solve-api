const ranking = (socket, db, io)=>{
  socket.on('gameID', (game_id) => {
    let query = `SELECT players.id, players.gamertag, 
    players.user_id, players.is_host, players.score, 
    players.game_id, users.expertise_level 
    FROM users FULL JOIN players on users.id = players.user_id
    WHERE game_id = $1`;
    let gameid = game_id;
    db.query(query, [gameid])
    .then((data)=>{
      io.emit("playersCurrentRanking", data.rows);
    })
    db.query(`SELECT created_quiz_id FROM games where id = $1`, [gameid])
    .then((data)=>{
      if(data.rowCount !== 0){
        let quiz_id = data.rows[0].created_quiz_id;
        db.query(`select questions.*, answers.* from questions 
        full join answers on answers.question_id = questions.id 
        where questions.created_quiz_id = $1`, [quiz_id])
        .then((res)=>{
          console.log("wat does it look like?", res.rows);
          let answers = res.rows;
          let questions ={};
          let QA=[];
          for(let answer of answers){
            if(questions[answer.question_id]){
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
          socket.emit('GameroomQ', QA);
        })
      } else{
      }
    })
  });
  socket.on('updateScore', (data)=>{
    db.query(`SELECT * FROM players WHERE
    game_id = $1 AND gamertag = $2
    `, [data.currentgame, data.gamer])
    .then((cs)=>{
      console.log("score here:",cs.rows[0]);
      let total = data.score + cs.rows[0].score;
      return db.query(`UPDATE players
      SET score = $1 WHERE game_id = $2 AND gamertag = $3
      `, [total, data.currentgame, data.gamer])
    })
    .then(()=>{
      let query = `SELECT players.id, players.gamertag, 
      players.user_id, players.is_host, players.score, 
      players.game_id, users.expertise_level 
      FROM users FULL JOIN players on users.id = players.user_id
      WHERE game_id = $1`;
      return db.query(query, [data.currentgame])
    })
    .then((data)=>{
      io.emit("playersCurrentRanking", data.rows);
    })
  })

  socket.on('startgame', (data)=>{
    db.query(`SELECT num_of_times_hosted FROM created_quizzes 
    WHERE id = (SELECT created_quiz_id FROM games WHERE id = $1);`,[data])
    .then((num)=>{
      let times = num.rows[0].num_of_times_hosted + 1;
      db.query(`UPDATE created_quizzes SET num_of_times_hosted = $1 WHERE id = (SELECT created_quiz_id FROM games WHERE id = $2)`,[times, data])
    })
    db.query(`SELECT total_players_played FROM created_quizzes 
    WHERE id = (SELECT created_quiz_id FROM games WHERE id = $1);`,[data])
    .then((num)=>{
      db.query(`SELECT count(*) FROM players WHERE game_id = $1`, [data])
      .then((numPlayers)=>{
        let total = Number(numPlayers.rows[0].count)+num.rows[0].total_players_played;
        db.query(`UPDATE created_quizzes SET total_players_played = $1 WHERE id = (SELECT created_quiz_id FROM games WHERE id = $2)`,[total, data])
      })
    })
   
    
    io.emit('waitStart', data);
    db.query(`UPDATE games set is_active = false where id = $1`, [data]);
  })
}


module.exports = {ranking}



