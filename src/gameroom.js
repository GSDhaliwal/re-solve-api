const ranking = (socket, db, io)=>{

  console.log('rank: a user connected', socket.id);
  socket.on('gameID', (game_id) => {
    let query = `SELECT players.id, players.gamertag, 
    players.user_id, players.is_host, players.score, 
    players.game_id, users.expertise_level 
    FROM users FULL JOIN players on users.id = players.user_id
    WHERE game_id = $1`;
    let gameid = game_id;
    db.query(query, [gameid])
    .then((data)=>{
      console.log(data.rows);
      io.emit("playersCurrentRanking", data.rows);
    })
    db.query(`SELECT created_quiz_id FROM games where id = $1`, [gameid])
    .then((data)=>{
      if(data.rowCount !== 0){
        let quiz_id = data.rows[0].created_quiz_id;
        console.log(quiz_id);
        db.query(`select questions.*, answers.* from questions 
        full join answers on answers.question_id = questions.id 
        where questions.created_quiz_id = $1`, [quiz_id])
        .then((res)=>{
          console.log("wat does it look like?", res.rows);
          let answers = res.rows;
          let questions = [];
          let question={};
          for(let answer of answers){
            if(question.id){
              question.answers.push(answer.answer);
            } else{
              question.answers = [answer.answer];
              question.id = answer.question_id;
              question.points_per_question = answer.points_per_question;
              question.time_per_question = answer.time_per_question;
              question.correct_answer = answer.correct_answer;
              question.image = answer.image;
              question.question = answer.question;
              question.created_quiz_id = answer.created_quiz_id;
              questions.push(question);
              question = {};
            }
          }
          console.log(questions);
          socket.emit('GameroomQ', questions);
          // let questions = res.rows;
          // console.log("before questions for loop", questions);
          // console.log("length:", questions.length);
          // let count = questions.length-1;
          // for(let question of questions){
          //   console.log("question:", question);
          //   db.query(`SELECT * FROM answers WHERE question_id = $1`, [question.id])
          //   .then((ans)=>{
          //     console.log("anything back?", ans.rows);
          //     question.answers = ans.rows;
          //     console.log("each question:", question);
          //     // console.log("index:",question);
          //     count--;
          //     if(count === 0){
          //       console.log("all qs and as:", questions);
          //       socket.emit('GameroomQ', questions);
          //     }
          //   })
          // }
          
          
        })
      } else{
        console.log("didnt find any games with game_id:", gameid);
      }
    })
    // db.query(`SELECT players.id, players.gamertag, 
    // players.user_id, players.is_host, players.score, 
    // players.game_id, users.expertise_level 
    // FROM users FULL JOIN players on users.id = players.user_id
    // WHERE game_id = $1`,[1])
    // .then((xl)=>{
    //   console.log(xl.rows);
    // })
  });
  socket.on('updateScore', (data)=>{
    console.log("data:", data);
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
      socket.emit("playersCurrentRanking", data.rows);
    })
  })

  socket.on('startgame', (data)=>{
    console.log('waitstart:', data);
    io.emit('waitStart', data);
  })
}


module.exports = {ranking}

