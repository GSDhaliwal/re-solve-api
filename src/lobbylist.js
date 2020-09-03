const lobbylist = (socket, db)=>{

  console.log('a new user connected', socket.id);

  socket.on('listplayers', (game_code) => {
    console.log("line 6 callback");
    let query = 
          `SELECT * FROM games
            WHERE game_code = $1`;
    let gameCode = JSON.parse(game_code);
    db.query(query, [gameCode])
    .then((data)=>{
      let gamesData = data.rows[0].id;
      console.log("games data: ", gamesData);
      let query2 =
            `SELECT * FROM players
            WHERE game_id = $1`;
      db.query(query2, [gamesData])
      .then((data) => {
        let players = data.rows;
        console.log("players data: ", players);
        socket.emit('playerslist', players);
      })
    })
  });

}

module.exports = {lobbylist}

// const playerData = [
//   {user_id: 1, player_gamertag: "Hero", score: 12, is_host: false},
//   {user_id: 2, player_gamertag: "Paws", score: 23, is_host: false},
//   {user_id: 3, player_gamertag: "Kylo", score: 69, is_host: true},
//   {user_id: 4, player_gamertag: "Loko", score: 33, is_host: false},
//   {user_id: 5, player_gamertag: "Shadow", score: 42, is_host: false}
// ];

// const users = {
//   1:{id: 1, name: "Henry", email: "henry@xp.com", password: "###", user_expertise_level: "S Rank"},
//   2:{id: 2, name: "Felipe", email: "felipe@xp.com", password: "###", user_expertise_level: "B Rank"},
//   3:{id: 3, name: "Gurcharan", email: "chanchan@xp.com", password: "###", user_expertise_level: "A Rank"},
//   4:{id: 4, name: "Link", email: "elite@xp.com", password: "###", user_expertise_level: "C Rank"},
//   5:{id: 5, name: "Soma", email: "soma@xp.com", password: "###", user_expertise_level: "S Rank"},
//   6:{id: 6, name: "Valen", email: "soma@xp.com", password: "###", user_expertise_level: "F Rank"}
// };