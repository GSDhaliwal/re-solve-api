const joinablegames = (socket, db, io)=>{
  socket.on("joinGame", (gamecode)=>{
    db.query(`SELECT * from games WHERE game_code = $1 AND is_active = true;`,[gamecode])
    .then((game)=>{
      socket.emit("joinedGame", game.rows[0].id);
    })
  })
}

module.exports = joinablegames;