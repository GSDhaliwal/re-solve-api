const login = (socket, db)=>{
  socket.on("userL", (user)=>{
    console.log(user);
    db.query(`SELECT * FROM users 
    WHERE username = $1 
    AND password = $2`, [user.username, user.password])
    .then((data)=>{
      console.log(data.rows[0]);
      socket.emit("loggedUser", data.rows[0]);
    })
    
  })
}


module.exports = login