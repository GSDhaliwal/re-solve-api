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


io.on('connection', (socket)=>{
  gameroom.ranking(socket, db);
});


app.get('/', (req, res) => {
  res.send('<h1>Hello 11world</h1>');
});

