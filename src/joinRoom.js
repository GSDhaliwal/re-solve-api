const joinRoom = (socket, db)=>{
  socket.on("playerJoin", (data)=>{
    console.log(data);
  })
}

module.exports = joinRoom;