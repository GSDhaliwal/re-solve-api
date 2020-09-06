require('dotenv').config();
const app = require('express')();
const port = 5000;


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
const createQuiz = require("./createQuiz");
const editQuiz = require("./editQuiz");
const editedQuiz = require("./editedQuiz");
const joinRoom = require("./joinRoom");
//routes for games list
const gameslist = require("./gameslist");
//routes for player list in lobby
const lobbylist = require("./lobbylist");
//routes for hostable game <----
const hostlobby = require("./hostablegames");
const joinablegames = require("./joinablegames");

const userCreatedQuizzes = require("./userCreatedQuizzes");

const cancelgame = require("./cancelGame");



io.on('connection', (socket)=>{
  gameslist.list(socket, db);
  lobbylist.lobbylist(socket, db);
  hostlobby.hostlobby(socket, db);
  gameroom.ranking(socket, db, io);
  createQuiz.create(socket, db);
  editedQuiz.edited(socket, db);
  editQuiz.edit(socket, db);
  cancelgame.cancel(socket, db);
  joinRoom(socket,db, io);
  joinablegames(socket,db, io);
  login(socket, db);
  userCreatedQuizzes(socket, db);
  console.log(' %s sockets connected', io.engine.clientsCount);

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
