const joinablegames = (socket, db, io)=>{
  socket.on("joinGame", (gamecode)=>{
    console.log(gamecode);
    db.query(`SELECT * from games WHERE game_code = $1;`,[gamecode])
    .then((game)=>{
      socket.emit("joinedGame", game.rows[0].id); 
      console.log(game.rows);
    })
  })
}

module.exports = joinablegames;