const hostlobby = (socket, db)=>{
  socket.on('hostableGame', (gameinfo) => {
    db.query(`INSERT INTO games (game_code, created_quiz_id, is_active)
    VALUES ($1, $2, true) RETURNING *;
    `, [gameinfo.gamecode, gameinfo.quiz_id])
    .then((data)=>{
      socket.emit('hostedGame', data.rows[0].id);
    })
  })
}

module.exports = {hostlobby}