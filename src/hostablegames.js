const hostlobby = (socket, db)=>{
  socket.on('hostableGame', (gameinfo) => {
    db.query(`INSERT INTO games (game_code, created_quiz_id, is_active)
    VALUES ($1, $2, $3) RETURNING *;
    `, [gameinfo.gamecode, gameinfo.quiz_id, gameinfo.is_active])
    .then((data)=>{
      console.log(data.rows[0]);
      socket.emit('hostedGame', data.rows[0].id);
    })
    // console.log('a new user connected', socket.id);
  })
}

module.exports = {hostlobby}