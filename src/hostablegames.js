const hostlobby = (socket, db)=>{
  socket.on('hostableGame', (game_id) => {
    console.log('a new user connected', socket.id);
    console.log("this is your game id: ", game_id);
  })
}

module.exports = {hostlobby}