require('dotenv').config();
const app = require('express')();
const port = 8080;


const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


const server = app.listen(port, () => {
  console.log('listening on port 8080');

});
const io = require('socket.io')(server);


const gameroom = require("./gameroom");
const login = require("./login");

//routes for games list
const gameslist = require("./gameslist");
//routes for player list in lobby
const lobbylist = require("./lobbylist");
//routes for hostable game <----
const hostlobby = require("./hostablegames");
io.on('connection', (socket)=>{
  gameslist.list(socket, db);
  lobbylist.lobbylist(socket, db);
  hostlobby.hostlobby(socket, db);
  gameroom.ranking(socket, db);
  login(socket, db);
});





app.get('/', (req, res) => {
  res.send('<h1>Hello 11world</h1>');
});



// io.on('connection', (socket) => {
//   console.log('a user connected', socket.id);
//   socket.on('message', (msg) => {
    
//     console.log('message: ' + msg);
//     io.emit('message', "server + " + msg);
//   });
// });
