const cancel = (socket, db)=>{

  socket.on('cancelGame', (gameid) => {
    let query =
      `DELETE FROM games WHERE id = $1;`;
    let game_id = gameid;
    db.query(query, [game_id])
    .then((res) => {
      let message = 'game deleted';
      socket.emit('confirmMessage' , message);
    })
  })

}

module.exports = { cancel }