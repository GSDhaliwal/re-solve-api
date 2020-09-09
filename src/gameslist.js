const list = (socket, db)=>{
  socket.on('hostGames', (user) => {
    let query = `SELECT created_quizzes.*, categories.category_name
    FROM categories, created_quizzes WHERE categories.id = created_quizzes.category_id`;
    db.query(query)
    .then((data)=>{
      let quizzes = data.rows;
      socket.emit('gameslist', quizzes);
    })
  });

}



module.exports = {list}