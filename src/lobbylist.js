const lobbylist = (socket, db)=>{

  // console.log('a new user connected', socket.id);

  socket.on('listplayers', (game_code) => {
    let query = 
          `SELECT * FROM games
            WHERE game_code = $1`;
    let gameCode = game_code;
    db.query(query, [gameCode])
    .then((data)=>{
      let gamesData = data.rows[0].id;
      let query2 =
            `SELECT * FROM players
            WHERE game_id = $1`;
      db.query(query2, [gamesData])
      .then((data) => {
        let players = data.rows;
        socket.emit('playerslist', players);
      })
    })
  });

}

module.exports = {lobbylist}
