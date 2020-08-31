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
let players = [
  {id:3, gamertag: "Henry", active_game_id: 3, score: 500, user_id: 1, is_host: true},
  {id:1, gamertag: "lisa", active_game_id: 3, score: 300, user_id: 2,is_host: false},
  {id:2, gamertag: "rob", active_game_id: 3, score: 550, user_id: 3, is_host: false}
];
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('message', (msg) => {
    
    console.log('message: ' + msg);
    io.emit('message', "server + " + msg);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello 11world</h1>');
});

