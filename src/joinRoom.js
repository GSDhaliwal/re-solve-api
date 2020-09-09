const joinRoom = (socket, db, io)=>{
  socket.on("playerJoin", (data)=>{
    db.query(`SELECT * FROM games WHERE id = $1 AND is_active = true`, [data.game_id])
    .then((res)=>{
      if(res.rows.length > 0){
        db.query(`INSERT into players(gamertag, game_id, is_host, score)
        VALUES ($1, $2, $3, $4) RETURNING *;`,[data.gamertag, data.game_id, data.is_host, 0])
        .then((res)=>{
          db.query(`SELECT * FROM players WHERE game_id = $1;`, [data.game_id])
          .then((Cplayers)=>{
            io.emit("playersInLobby", {players: Cplayers.rows, game: data.game_id});
          })
          
        })
      }
      
    })
    
  })

}

module.exports = joinRoom;