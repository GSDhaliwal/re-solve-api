const login = (socket, db)=>{
  socket.on("userL", (user)=>{
    db.query(`SELECT * FROM users 
    WHERE username = $1 
    AND password = $2`, [user.username, user.password])
    .then((data)=>{
      socket.emit("loggedUser", data.rows[0]);
    })
    
  })

  socket.on("register", (newUser)=>{
    db.query(`INSERT INTO users (username, password)
    VALUES ($1, $2) RETURNING *;`,[newUser.username, newUser.password])
    .then((user)=>{
      socket.emit("reggedUser", user.rows[0]);
    }).catch((error)=>{
      socket.emit("reggedUser", false)
    })
  })
}


module.exports = login