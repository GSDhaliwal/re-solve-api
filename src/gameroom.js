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
      socket.emit("playersCurrentRanking", data.rows);
    })
    db.query(`SELECT created_quiz_id FROM games where id = $1`, [gameid])
    .then((data)=>{
      if(data.rowCount !== 0){
        let quiz_id = data.rows[0].created_quiz_id;
        console.log(quiz_id);
        db.query(`SELECT * FROM questions WHERE created_quiz_id = $1`, [quiz_id])
        .then((res)=>{
          let questions = res.rows;
          questions.forEach((question, index)=>{
            db.query(`SELECT * FROM answers WHERE question_id = $1`, [question.id])
            .then((ans)=>{
              console.log(ans.rows);
              question.answers = ans.rows;
              console.log(question);
              if(index === questions.length-1){
                console.log("all questions including answers:",questions);
                socket.emit('GameroomQ', questions);
              }
            })
          })
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

